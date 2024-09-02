const Todo = require('../models/todo.model');

// Add a new ToDo
exports.addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = new Todo({
      title,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json({message:"Todo Added successfully", data:savedTodo});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all ToDos
exports.getAllTodos = async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
// Delete a ToDo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a ToDo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isCompleted } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title,isCompleted },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({message:"Todo Added successfully", data:updatedTodo});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Toogle todo
// In your Express controller (already included in your existing backend)
exports.toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.isCompleted = !todo.isCompleted;
    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
