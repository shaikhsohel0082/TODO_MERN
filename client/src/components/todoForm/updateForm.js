import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Data, updateTodo } from "../../features/Reducer/todoReducer";
import Styles from "./todoForm.module.css";
import { toast } from "react-toastify";

export default function UpdateForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const data = useSelector(Data);
  const { id } = useParams();

  function submitHandle(e) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    dispatch(updateTodo({ id, title}))
      .unwrap()
      .then(() => {
        toast.success("Todo Updated Successfully");
        setTitle("");
      })
      .catch(() => {
        toast.error("Failed to update todo");
      });
  }

  return (
    <form>
      <div className={Styles.container}>
        <input
          className={Styles.input}
          type="text"
          placeholder="Add To Do"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className={Styles.addbutton}
          type="submit"
          onClick={submitHandle}
        >
          Update
        </button>
      </div>
    </form>
  );
}
