import React from "react";

const TaskList = ({ tasks, deleteTask, editTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <span className={task.completed ? "completed" : ""}>
            {task.title}
          </span>
          <div>
            <button onClick={() => editTask(task)}>Editar</button>
            <button onClick={() => deleteTask(task.id)}>Deletar</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
