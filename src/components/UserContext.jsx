import { useState, createContext } from "react";

export default function UserContext({children}){
    const UserContext = createContext();
    const items = [
        {
        id:1,
        name: "Reyon Long Sleeve Shirt",
        price: 2000,
        qty: 2,
        image: "https://picsum.photos/200/300",
        },
        {
        id:2,
        name: "Flexi Move Sneaker",
        price: 1700,
        qty: 1,
        image: "https://picsum.photos/200/300",
        },
        {
        id:3,
        name: "Flexi Move Sneaker",
        price: 1700,
        qty: 1,
        image: "https://picsum.photos/200/300",
        },
    ]
    const [userInfo,setUserInfo] = useState({user:""});
    const [userPurhcase,setUserPurhcase ] = useState(items);

    return(<>
            <UserContext.Provider value={{userInfo,setUserInfo,userPurhcase,setUserPurhcase}}>
                {children}
            </UserContext.Provider>
    </>)
}