import { createContext, useState, useEffect } from "react";
import "./App.css";

import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Mycart from "./pages/Mycart";

import { createBrowserRouter, Link, RouterProvider, BrowserRouter } from "react-router-dom";
import axios from "axios";

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
          name: "Reyon Long Sleeve Shirt",
          price: 2000,
          quantity: 2,
          image: "https://picsum.photos/200/300",
        },
        {
          id:2,
          name: "Flexi Move Sneaker",
          price: 1700,
          quantity: 1,
          image: "https://picsum.photos/200/300",
        },
        {
          id:3,
          name: "Flexi Move Sneaker",
          price: 1700,
          quantity: 1,
          image: "https://picsum.photos/200/300",
        },
    ]
  // const [userInfo,setUserInfo] = useState({user:""});

  const [userPurhcase,setuserPurhcase] = useState(items);
  const [categories,setCategories] = useState([
    {name:"Men"},
    {name:"Women"},
    {name:"Kids"},
    {name:"Shoes"},
    {name:"Accessories"},
  ]);

  // useEffect(()=>{getCategories()},[])
    
  const getCategories = async () => {
      try {
          await axios.get("https://api.storefront.wdb.skooldio.dev/categories").then(res=>{
              let data = res.data
              // let data = res.data.map(item=>item.name)
              // console.log(data)
              setCategories(data)
          })
      } catch (error) {
          console.log(error)
      }

  }

  return (
    <UserContext.Provider value={{
      userPurhcase,setuserPurhcase,
      categories,setCategories
    }}>
    {/* <UserContext.Provider value={{userInfo,setUserInfo,userPurhcase,setuserPurhcase}}> */}
      <RouterProvider router={router}/>
    </UserContext.Provider>
  );
}

export default App;
