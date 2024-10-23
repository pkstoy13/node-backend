const express = require("express");
const {
  getTodos,
  createTodo,
  deleteTodo,
} = require("../controllers/todoController");

const auth = require("../middleware/auth");
const router = express.Router();

// GET /api/todos - Get all todos for the logged-in user
router.get("/", auth, getTodos);

// POST /api/todos - Create a new todo
router.post("/", auth, createTodo);

// DELETE /api/todos/:id - Delete a todo
router.delete("/:id", auth, deleteTodo);

module.exports = router;
