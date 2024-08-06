import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import NewsFeed from "./NewsFeed";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    id: null,
    title: "",
    completed: false,
  });
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchTopStories();
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

  const fetchTopStories = async () => {
    try {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      const storyIds = await response.json();
      const storiesPromises = storyIds.slice(0, 10).map(async (id) => {
        const storyResponse = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return await storyResponse.json();
      });
      const storiesData = await Promise.all(storiesPromises);
      setStories(storiesData.slice(0, 6)); // Limit to the first 5 stories
    } catch (error) {
      console.error("Erro ao buscar histórias:", error);
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

  const toggleCompleted = async (task) => {
    try {
      task.completed = !task.completed;
      const response = await fetch(
        `http://localhost:8090/api/tasks/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        }
      );
      const data = await response.json();
      setTasks(tasks.map((task) => (task.id === data.id ? data : task)));
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="app">
        <h1>Tasks</h1>
        <TaskForm
          addTask={addTask}
          isEditing={isEditing}
          currentTask={currentTask}
          updateTask={updateTask}
        />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleCompleted={toggleCompleted}
        />
      </div>
      <footer className="app">
        <h2>Hacker News Stories</h2>
        <NewsFeed stories={stories} />
      </footer>
    </div>
  );
};

export default App;
