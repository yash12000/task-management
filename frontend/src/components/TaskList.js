import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  const handleDelete = (taskId) => {
    axios.delete(`/tasks/${taskId}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== taskId));
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("incomplete")}>Active</button>
        <button onClick={() => setFilter("complete")}>Completed</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status} - {task.priority}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
