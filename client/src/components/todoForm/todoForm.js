import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Data, addTodo } from "../../features/Reducer/todoReducer";
import Styles from "./todoForm.module.css";
import { toast } from "react-toastify";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const data = useSelector(Data);

  // Adding todo by handling submit
  async function submitHandle(e) {
    e.preventDefault();

    if (title.trim() === "") {
      toast.error("Title cannot be empty");
      return;
    }

    try {
      await dispatch(addTodo({ title })).unwrap();
      setTitle("");
      toast.success("Todo Added Successfully");
    } catch (error) {
      toast.error("Failed to add Todo");
    }
  }

  return (
    <form onSubmit={submitHandle}>
      <div className={Styles.container}>
        <input
          className={Styles.input}
          type="text"
          placeholder="Add To Do"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className={Styles.addbutton} type="submit">
          Add
        </button>
      </div>
    </form>
  );
}
