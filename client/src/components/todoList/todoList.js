import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Data, fetchTodos, toggleTodo, deleteTodo } from "../../features/Reducer/todoReducer";
import Styles from "./todoList.module.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function TodoList() {
  const data = useSelector(Data);
  const dispatch = useDispatch();
  const [isUpdated,setIsUpdated]=useState(false);
  useEffect(() => {
    dispatch(fetchTodos());
    setIsUpdated(false);
  }, [dispatch,isUpdated]);

  return (
    <div className={Styles.main}>
      {data.length === 0 && <h1 className={Styles.heading}>No Todo Found</h1>}
      {data.map((item) => (
        <div className={Styles.list} key={item.id}>
          <div className={Styles.title}>
            {item.title.length >= 20 ? (
              <>
                {item.title.slice(0, 20)}
                <br />
                {item.title.slice(20)}
              </>
            ) : (
              item.title
            )}
          </div>
          <div>
            <button
              className={item.isCompleted ? Styles.completed : Styles.pending}
              onClick={() => {
                console.log(item)
                dispatch(toggleTodo(item._id))
                setIsUpdated(true);
              }}
                
            >
              {item.isCompleted ? "Completed" : "Pending"}
            </button>
          </div>
          <div>
            <NavLink to={`/update/${item._id}`}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1828/1828270.png"
                className={`${Styles.btnImg}`}
                alt=""
              />
            </NavLink>
          </div>
          <div>
            <img
              className={`${Styles.btnImg}`}
              src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
              alt="delete"
              onClick={() => {
                dispatch(deleteTodo(item._id));  // Pass the correct ID
                setIsUpdated(true);
                toast.error("Todo has been Deleted");
                
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
