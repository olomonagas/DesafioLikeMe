import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import { Todos } from "./components/Todos";

const App = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    
    const todos = data.map(post => ({
      id: post.id,
      title: post.titulo,
    done: false
    }));
    setTodos(todos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async (title) => {
    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        titulo: title,
        img: "",
        descripcion: ""
       }),
    });

    getTodos();
  };

  const removeTodo = async (id) => {
    const response = await fetch(`http://localhost:5000/posts/${id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      return alert("Something went wrong");
    }
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (id) => {
    const response = await fetch(`http://localhost:5000/posts/${id}`, {
      method: "PUT",
    });
    if (response.status !== 200) {
      return alert("Something went wrong");
    }
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
        return todo;
      })
    );
  };

  return (
    <div className="container">
      <h1 className="">Todos APP</h1>
      <TodoForm addTodo={addTodo} />
      <Todos todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} />
    </div>
  );
};
export default App;
