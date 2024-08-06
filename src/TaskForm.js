import React, { useState, useEffect } from "react";
import "./TaskList.css";

const TaskForm = ({ addTask, isEditing, currentTask, updateTask }) => {
  const [task, setTask] = useState({ title: "", completed: false });

  useEffect(() => {
    if (isEditing) {
      setTask(currentTask);
    } else {
      setTask({ title: "", completed: false });
    }
  }, [isEditing, currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateTask(task);
    } else {
      addTask(task);
    }
    setTask({ title: "", completed: false });
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Enter a new task"
        required
      />
      <button className={isEditing ? "textUpdate" : "textAdd"} type="submit">
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TaskForm;
