import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Products from "./pages/Products";
import Homepage from "./pages/Homepage";
import Mycart from "./pages/Mycart";
import ProductDetail from "./pages/ProductDetail";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContext from "./components/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/Products",
    element: <Products />,
  },
  {
    path: "/Mycart",
    element: <Mycart />,
  },
  {
    path: "/ProductDetail",
    element: <ProductDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContext>
      <RouterProvider router={router} />
    </UserContext>

  </React.StrictMode>
);
