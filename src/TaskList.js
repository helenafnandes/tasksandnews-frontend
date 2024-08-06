import React, { useState } from "react";
import "./TaskList.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const TaskList = ({ tasks, deleteTask, editTask, toggleCompleted }) => {
  const [sortOption, setSortOption] = useState("newest");

  const sortedTasks = () => {
    switch (sortOption) {
      case "alphabetical":
        return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
      case "oldest":
        return [...tasks].sort((a, b) => a.id - b.id);
      case "newest":
      default:
        return [...tasks].sort((a, b) => b.id - a.id);
    }
  };

  return (
    <div>
      <div className="sort-menu">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="alphabetical">Title</option>
          <option value="oldest">Oldest</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <ul className="task-list">
        {sortedTasks().map((task) => (
          <li key={task.id}>
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>
            <div>
              <button
                className={task.completed ? "completeBtnDone" : "completeBtn"}
                onClick={() => toggleCompleted(task)}
              >
                <FaCheck />
              </button>
              <button className="editBtn" onClick={() => editTask(task)}>
                <FaEdit />
              </button>
              <button className="deleteBtn" onClick={() => deleteTask(task.id)}>
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
