const express = require('express');
const {
  addTodo,
  deleteTodo,
  updateTodo,
  getAllTodos,
  toggleTodo
} = require('../controller/todoController');

const router = express.Router();

// Route to add a new ToDo
router.post('/add', addTodo);

// Route to get all ToDos
router.get('/all', getAllTodos);

// Route to delete a ToDo by id
router.delete('/delete/:id', deleteTodo);

// Route to update a ToDo by id
router.put('/update/:id', updateTodo);

// Route to toggle todo
router.put('/toggleTodo/:id',toggleTodo)

module.exports = router;
