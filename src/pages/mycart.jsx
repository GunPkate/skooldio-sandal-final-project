import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { UserContext } from "../App"


export default function Mycart(){
    const {userPurhcase,setuserPurhcase} = useContext(UserContext)

    const handleDelete = (e) => {
        let tempData = userPurhcase.filter(data=>data !== e)
        console.log(tempData)
        console.log(e)
        setuserPurhcase(tempData)

    } 

    return(
        <>
        <Navbar/>
            <div className="min-w=[100vw]">
                <h1>My Cart</h1>
            </div>
            <div className="section lg:flex md:flex:none md:block">
                <div className="itemList bg-blue-400 min-h-[80vh] min-w-[40vw]">
                    <h1>Items</h1>
                    {userPurhcase.length >0 ? userPurhcase.map( item =>                
                        <>
                            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={item.image} alt=""/>
                                <div className="flex flex-col justify-between p-4 leading-normal">

                                    <div className="flex justify-between">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                    <button className="bg-red-300" onClick={(e)=>{handleDelete(item)}}> delete </button>
                                    </div>

                                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex justify-between">
                                        <div className="ml-2">
                                            <option>QTY</option>
                                        </div>
                                        <div className="ml-2">
                                            <option>Size</option>
                                        </div>
                                        <div className="ml-2">
                                            <option>Colors</option>
                                        </div>
                                        <h1 style={{opacity: 0.0}}>
                                            {item.price}
                                        </h1>
                                    </div>
                                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex justify-between">
                                        <select className="ml-2">
                                            <option>QTY</option>
                                        </select>
                                        <select className="ml-2">
                                            <option>Size</option>
                                        </select>
                                        <select className="ml-2">
                                            <option>Colors</option>
                                        </select>
                                        <h1>
                                            {item.price * item.qty}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    :<>
                    <div>
                        <h1>Your cart is empty</h1>
                        <button className="button">Continue Shooping</button>
                    </div>
                    </>}
                </div>
                <div className="summary bg-red-400 min-h-[80vh] min-w-[40vw]">
                    





                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

                        <div className="flex flex-col justify-between p-4 leading-normal">

                            <div className="flex justify-between">

                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Summary</h5>

                            </div>

                            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 block">
            
                            {userPurhcase.length >0 ? 
                                userPurhcase.map(  item => 
                                    <div key={item.id}>{item.name} {item.qty * item.price}</div>     
                                ) 
                                :<div></div>
                            }
        
                            <h1>Subtotal 
                                {userPurhcase.length > 1 ? 
                                userPurhcase.reduce((u,v)=>{
                                    return u.qty*u.price + v.qty*v.price
                                  })
                                : userPurhcase.length === 1 ? userPurhcase[0].price * userPurhcase[0].qty :0 }
                            </h1>
                            <h1>Shipping fee</h1>
                            <h1>Total 
                                {userPurhcase.length > 1 ? 
                                    userPurhcase.reduce((u,v)=>{
                                        return u.qty*u.price + v.qty*v.price
                                    })
                                : userPurhcase.length === 1 ? userPurhcase[0].price * userPurhcase[0].qty :0 }

                            </h1>
                            <button className="button">Check Out</button>
                            <button className="button">Continue Shooping</button>
                                    <h1>
                                        {/* {item.price} */}
                                    </h1>
                                </div>
                        </div>
                    </div>

                </div>
            </div>
        <Footer/>
        </>
    )
}