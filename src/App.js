import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    id: null,
    title: "",
    completed: false,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8090/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:8090/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:8090/api/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(
        `http://localhost:8090/api/tasks/${updatedTask.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        }
      );
      const data = await response.json();
      setTasks(tasks.map((task) => (task.id === data.id ? data : task)));
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask({
      id: task.id,
      title: task.title,
      completed: task.completed,
    });
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TaskForm
        addTask={addTask}
        isEditing={isEditing}
        currentTask={currentTask}
        updateTask={updateTask}
      />
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
};

export default App;
