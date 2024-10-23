const express = require("express");
const {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, getTodos);

router.post("/", auth, createTodo);

router.delete("/:id", auth, deleteTodo);

router.put("/:id", auth, updateTodo);

module.exports = router;
