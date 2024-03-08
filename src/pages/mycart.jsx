import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../App"


export default function Mycart(){
    const {userPurhcase,setuserPurhcase} = useContext(UserContext)

    const handleDelete = (e) => {
        let tempData = userPurhcase.filter(data=>data !== e)
        console.log(tempData)
        console.log(e)
        setuserPurhcase(tempData)

    }

    const CardTemplate = ({ title, width, children, ml, mr}) => (<>
        <div className={"itemList bg-blue-400 min-h-[80vh] "+ width + ml + mr}>
            <h5 className="m-[24px] text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {title} </h5>
                {children}
        </div>
    </>)


    return(
        <>
        <Navbar/>
            <div className="mx-auto"> 
            <div className="min-w=[100vw] my-[40px] mx-[max(160px,16px)]">
                <h1 className="m-[24px] text-2xl font-bold">My Cart</h1>
            </div>
            <div className="section section-mycart lg:flex md:flex:none md:block">

                <CardTemplate title={"Items"} width={"min-w-[944px]"} ml = {" mx-[max(160px,16px)] "} mr = {" mr-[20px] "}>

                    {userPurhcase.length >0 ? userPurhcase.map( (item,id) =>                
                        <div className="flex flex-col items-center bg-white border border-gray-200  shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div>
                                <img className="object-cover w-full rounded-t-lg h-[209px] md:h-auto lg:w-[209px] md:w-48 md:rounded-none md:rounded-s-lg" src={item.image} alt=""/>
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
                        </div>)

                        :<>
                            <div>
                                <h1>Your cart is empty</h1>
                                <button className="button">Continue Shooping</button>
                            </div>
                        </>}
                </CardTemplate>

                <CardTemplate title={"Summary"} width={"min-w-[500px]"} ml={" mx-[max(160px,16px)] "}  mr={" mr-[20px] "} >
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

                        <div className="flex flex-col justify-between p-4 leading-normal">

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
                    </CardTemplate>

            </div>

            </div>
        <Footer/>
        </>
    )
}