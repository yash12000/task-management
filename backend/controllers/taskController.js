const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  try {
    const task = new Task({
      title,
      description,
      priority,
      userId: req.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
