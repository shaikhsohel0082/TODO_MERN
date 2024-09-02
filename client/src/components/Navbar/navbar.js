import React from "react";
import Styles from "./navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className={Styles.main}>
        <NavLink to={"/"}>
          {/* navigate to home */}
          <div>Todo</div>
        </NavLink>
        {/* navigate to todoform */}
        <NavLink to={"/todoform"}>
          <div>AddToDo</div>
        </NavLink>
        {/* navigate to viewall */}
        <NavLink to={"/viewAll"}>
          <div>view All</div>
        </NavLink>
      </div>
      <Outlet />
    </>
  );
}
