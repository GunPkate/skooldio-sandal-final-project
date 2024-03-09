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

    const marginLgStyle = " lg: m-[24px] "
    const marginStyle = " m-[16px] "
    const CardTemplate = ({ title, width, children, ml, mr}) => (<>
        <div className={"itemList bg-blue-400 min-h-[80vh] "+ width + ml + mr}>
            <h5 className={marginLgStyle+ " text-2xl font-bold tracking-tight text-gray-900 dark:text-white"}> {title} </h5>
                {children}
        </div>
    </>)


    return(
        <>
        <Navbar/>
            <div className="lg:mx-auto"> 
            <div className="min-w=[100vw] my-[40px] lg:mx-[max(8.34%,16px)]">
                <h1 className={ marginLgStyle + marginStyle + " text-2xl font-bold"}>My Cart</h1>
            </div>
            <div className="section section-mycart lg:flex md:flex:none md:block">

                <CardTemplate title={"Items"} width={"min-w-[49.16%]"} ml = {" mx-[max(16px,16px)] lg:ml-[max(8.34%,16px)] "} mr = {" mr-[20px] "}>

                    {userPurhcase.length >0 ? userPurhcase.map( (item,id) =>                
                        <div key={id} className="flex inline-block">
                            <img className={marginLgStyle+ "object-cover rounded-t-lg h-[209px] md:h-auto lg:w-[209px] md:w-48 md:rounded-none md:rounded-s-lg"} src={item.image} alt=""/>
                            <div className="flex flex-col justify-between p-4 leading-normal mx-auto">

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
                        </div>)

                        :<>
                            <div>
                                <h1>Your cart is empty</h1>
                                <button className="button">Continue Shooping</button>
                            </div>
                        </>}
                </CardTemplate>

                <CardTemplate title={"Summary"} width={"min-w-[32.08%]"} mr={"  "}  ml={" lg:ml-[20px] "} >
                    <div className="m-[24px] flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

                            <table style={{width:"100%"}} className="mb-3 font-normal text-gray-700 dark:text-gray-400 block">
                                <tbody>
                                    {userPurhcase.length >0 ? 
                                        userPurhcase.map(  item => 
                                            
                                            <tr key={item.id}>
                                                <td style={{width:"100%"}}>    
                                                    {item.name}
                                                </td>
                                                <td>    
                                                    {item.qty * item.price}
                                                </td>
                                            </tr> 
                                                
                                        ) 
                                        :<div></div>
                                    }
                
                                    <tr>
                                    <td style={{width:"100%"}}>    
                                            <h1>Subtotal</h1>
                                            
                                        </td>
                                        <td>
                                            {userPurhcase.length > 1 ? 
                                                userPurhcase.reduce((accumulator, currentValue) => 
                                                    accumulator + ( currentValue.price * currentValue.qty ), 0, 
                                                )
                                                : userPurhcase.length === 1 ? userPurhcase[0].price * userPurhcase[0].qty :0 
                                            }
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <h1>Shipping fee</h1>
                                        </td>
                                        <td>
                                            <h1>Free</h1>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <h1>Total</h1>
                                        </td>
                                        <td>
                                            {userPurhcase.length > 1 ? 
                                                userPurhcase.reduce((accumulator, currentValue) => 
                                                    accumulator + ( currentValue.price * currentValue.qty ), 0, 
                                                )
                                                : userPurhcase.length === 1 ? userPurhcase[0].price * userPurhcase[0].qty :0 
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button className="button">Check Out</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button className="button">Continue Shooping</button>
                                        </td>
                                    </tr>
          
                                </tbody>
                            </table>

                    </div>
                    </CardTemplate>

            </div>

            </div>
        <Footer/>
        </>
    )
}