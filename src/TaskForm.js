import React, { useState, useEffect } from "react";

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
        placeholder="Digite uma nova tarefa"
        required
      />
      <button type="submit">{isEditing ? "Atualizar" : "Adicionar"}</button>
    </form>
  );
};

export default TaskForm;
