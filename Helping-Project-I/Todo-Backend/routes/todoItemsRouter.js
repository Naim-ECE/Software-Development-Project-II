const express = require("express");
const todoItemsRouter = express.Router();
const {
  createTodoItems,
  getTodoItems,
  deleteTodoItems,
  updateTodoItems,
} = require("../controllers/todoItemsController");

todoItemsRouter.post("/", createTodoItems);
todoItemsRouter.get("/", getTodoItems);
todoItemsRouter.delete("/:id", deleteTodoItems);
todoItemsRouter.put("/:id/completed", updateTodoItems);

module.exports = todoItemsRouter;
