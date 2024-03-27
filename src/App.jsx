import { createContext, useState, useEffect } from "react";
import "./App.css";

import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Mycart from "./pages/Mycart";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import ProductsByCategories from "./pages/ProductsByCategories";

export const UserContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/Products",
    element: <Products />,
    children: [
      {
        path: "/Products/:Name/:Categories",
        element: <ProductsByCategories />,
      },
    ],
  },
  {
    path: "/Mycart",
    element: <Mycart />,
  },
  {
    path: "/ProductDetail/:permalink",
    element: <ProductDetail />,
  },
]);

function App() {
  const items = [];
  // const [userInfo,setUserInfo] = useState({user:""});

  const [userPurhcase, setuserPurhcase] = useState(items);
  const [myCart, setMyCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCategories();
    getCollection();
    let id = localStorage.getItem('id')
    fetchMycart(id);
  }, []);

  const getCategories = async () => {
    let categoriesGroup = [];
    try {
      await axios
        .get("https://api.storefront.wdb.skooldio.dev/categories")
        .then((res) => {
          let data = res.data;
          categoriesGroup = data.sort((a, b) =>
            a.permalink.localeCompare(b.name)
          );
          setCategories(categoriesGroup);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getCollection = async () => {
    try {
      await axios
        .get("https://api.storefront.wdb.skooldio.dev/collections")
        .then((res) => {
          let data = res.data;
          setCollections(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMycart = async (id) => {
    try {
  
      if(id !== null || id !== undefined || id !== ""){
        await axios.get(`https://api.storefront.wdb.skooldio.dev/carts/${id}`).then( res => {
        let itemCart =  res.data;
        // console.log("Navbar get",itemCart)
          let myCartTemp = myCart
          res.data.items.forEach(async x=>{
            await axios.get("https://api.storefront.wdb.skooldio.dev/products/"+x.productPermalink).then(resDetail=>{
              const dataDetail = resDetail.data
            
              let displayBody = {
                  id: x.id,
                  name: dataDetail.name,
                  skuCode: x.skuCode,
                  quantity: x.quantity,
                  variants:  dataDetail.variants,
                  price: dataDetail.price,
                  image: dataDetail.imageUrls[0],
                  color: Array.from( new Set(dataDetail.variants.map(x=>x.color)) ).sort(),
                  // colorCode: Array.from( new Set(data.variants.map(x=>x.colorCode)) ).sort(),
                  size: Array.from( new Set(dataDetail.variants.map(x=>x.size)) ).sort(),
              }
              let b = Object.create(displayBody)
              
              // console.log(displayBody)
              myCartTemp.push(displayBody)
              
              setMyCart(Array.from( new Set(myCartTemp.map(x=>x)) ))
              setuserPurhcase(myCartTemp)
            })
          })

          console.log("Navbar myCartTemp",myCartTemp)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        userPurhcase,
        setuserPurhcase,
        categories,
        setCategories,
        collections,
        setCollections,
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
