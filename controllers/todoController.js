const Todo = require("../models/Todo");

// Get all todos for the logged-in user
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }); // Fetch todos for the logged-in user
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  const { title } = req.body;

  // Ensure the user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const newTodo = new Todo({
      title,
      user: req.user.id, // Associate the todo with the authenticated user
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Ensure the todo belongs to the user
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    //await todo.remove();
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateTodo = async (req, res) => {
  const { title } = req.body; // Get the new title from the request body

  // Ensure the user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const todo = await Todo.findById(req.params.id); // Fetch the todo by ID

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" }); // Handle case where todo does not exist
    }

    // Ensure the todo belongs to the user
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" }); // Handle unauthorized access
    }

    // Update the todo's title
    todo.title = title; // Update title with new value
    const updatedTodo = await todo.save(); // Save the updated todo

    res.json(updatedTodo); // Send the updated todo back in the response
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ error: "Server error" }); // Handle server error
  }
};

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
