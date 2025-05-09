import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task');
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'complete' ? 'incomplete' : 'complete';
      await axios.put(`/tasks/${id}`, { status: newStatus });
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('incomplete')}>Active</button>
        <button onClick={() => setFilter('complete')}>Completed</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status} - {task.priority}
            <button onClick={() => handleStatusToggle(task._id, task.status)}>
              Toggle Status
            </button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
