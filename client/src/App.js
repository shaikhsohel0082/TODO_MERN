import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import TodoForm from "./components/todoForm/todoForm";
import TodoList from "./components/todoList/todoList";
import UpdateForm from "./components/todoForm/updateForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/home";
function App() {
  //creating routes to navigate pages/components
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {path:'/',element:<Home/>},
        { path: "/todoform", element: <TodoForm /> },
        {
          path: "/viewAll",
          element: <TodoList />,
        },
        {
          path: "/update/:id",
          element: <UpdateForm />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={route} />
      {/* providing toast container to show messages */}
      <ToastContainer autoClose={2000} position="bottom-right" />
    </>
  );
}

export default App;
