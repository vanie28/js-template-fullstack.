import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ description: "" });

  const getTodos = async () => {
    // http://localhost:5000/todos
    const response = await fetch("http://localhost:5000/todos", {
      method: "GET", // *GET, POST, PUT, DELETE
    });
    const data = await response.json();
    setTodos(data.data);
    console.warn("data;", data);
  };

  const postTodos = () => {
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      getTodos();
      setTodo({ description: "" });
    });
  };
  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    }).then((res) => {
      getTodos();
      // console.warn("res: in delete", res);
    });
  };

  const updateTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      getTodos();
    });
  };

  const handleTask = (e) => {
    setTodo({ description: e.target.value });
  };
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={todo.description}
          onChange={(e) => handleTask(e)}
        />
        <button type="button" onClick={postTodos}>
          Add todo
        </button>
        {todos.map((task) => (
          <div key={task.id}>
            {task.description}
            <button type="button" onClick={() => deleteTodo(task.id)}>
              X
            </button>
            <button type="button" onClick={() => updateTodo(task.id)}>
              update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
