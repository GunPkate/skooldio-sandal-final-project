import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Mycart from "./pages/Mycart";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/Products",
    element: <Products/>
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
    <Navbar/>
      <RouterProvider router={router} />
    <Footer/>
  </React.StrictMode>
);
