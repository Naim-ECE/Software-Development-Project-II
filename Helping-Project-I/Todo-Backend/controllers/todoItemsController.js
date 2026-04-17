const TodoItem = require("../models/TodoItem");

exports.createTodoItems = async (req, res, next) => {
  const { task, date } = req.body;
  const todoItem = new TodoItem({
    task,
    date,
  });
  await todoItem.save();
  res.status(201).json(todoItem);
};

exports.getTodoItems = async (req, res, next) => {
  const todoItems = await TodoItem.find();
  res.status(200).json(todoItems);
};

exports.deleteTodoItems = async (req, res, next) => {
  const { id } = req.params;
  await TodoItem.findByIdAndDelete(id);
  res.status(204).json({ _id: id });
};

exports.updateTodoItems = async (req, res, next) => {
  const { id } = req.params;
  const updatedTodoItem = await TodoItem.findById(id);
  updatedTodoItem.completed = true;
  await updatedTodoItem.save();
  res.status(200).json(updatedTodoItem);
};
