import { createContext, useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Mycart from "./pages/Mycart";

import { createBrowserRouter, Link, RouterProvider, BrowserRouter } from "react-router-dom";

export const UserContext = createContext();


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

function App() {
    const items = [
        {
            id:1,
            name: "item 1",
            price: 2000,
            qty: 1,
            image: "https://picsum.photos/200/300",
          },
          {
            id:2,
            name: "item 1",
            price: 2000,
            qty: 1,
            image: "https://picsum.photos/200/300",
        },
    ]
  const [userInfo,setUserInfo] = useState({user:""});
  const [userPurhcase,setuserPurhcase] = useState(items);
  return (
    <UserContext.Provider value={{userInfo,setUserInfo,userPurhcase,setuserPurhcase}}>
      <RouterProvider router={router}/>
    </UserContext.Provider>
  );
}

export default App;
