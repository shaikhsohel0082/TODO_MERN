import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  todos: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const BASE_URL = "http://localhost:5000/api/todos";

// Async Thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
  const response = await axios.post(`${BASE_URL}/add`, newTodo);
  return response.data.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${BASE_URL}/delete/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
  const response = await axios.put(`${BASE_URL}/update/${updatedTodo.id}`, updatedTodo);
  return response.data.data;
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id) => {
  const response = await axios.put(`${BASE_URL}/toggleTodo/${id}`);
  return response.data;
});

// Creating slice
const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

// Exporting reducers, actions, and state selectors
const todoReducer = todoSlice.reducer;
const Data = (state) => state.todo.todos;
export { Data };
export default todoReducer;
