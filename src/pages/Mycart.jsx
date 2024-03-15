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

    const marginLgStyle = " lg: p-[24px] "
    const marginStyle = " p-[16px] "
    const CardTemplate = ({ title, width, height, children, ml, mr}) => (<>
        <div className={"itemList bg-white min-h-[80vh] "+ width + height + ml + mr}>
            <h5 className={marginLgStyle+ " text-2xl font-bold tracking-tight text-gray-900 dark:text-white"}> {title} </h5>
                {children}
        </div>
    </>)

    const noItemImg = "https://picsum.photos/200/300"

    return(
        <>
        <Navbar/>
            <div style={{backgroundColor: "azure"}} className="lg:mx-auto"> 
            <div className="min-w=[100vw] lg:mx-[max(8.34%,16px)]">
                <h1 className={ marginLgStyle + marginStyle + " text-2xl font-bold"}>My Cart</h1>
            </div>
            <div className="section section-mycart lg:flex md:flex:none md:block">

                <CardTemplate title={"Items"} width={"min-w-[49.16%]"} height={"  "}  ml = {" mx-[max(16px,16px)] lg:ml-[max(8.34%,16px)] "} mr = {" mr-[20px] mb-[40px] "}>

                    {userPurhcase.length >0 ? userPurhcase.map( (item,id) =>                
                        <div key={id} className="lg:flex lg:inline-block md:block">
                            <div className="flex justify-center">
                                <img className={"lg:px-[24px] pb-[24px] " + "object-cover  h-[209px] w-[209px] "} src={item.image} alt=""/>
                            </div>
                            <div style={{width: "100%"}} className={"pb-[24px] pl-[16px] pr-[24px] " + "flex flex-col justify-between leading-normal mx-auto"}>

                                <div className="flex justify-between">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                <button className="bg-red-300" onClick={(e)=>{handleDelete(item)}}> delete </button>
                                </div>

                                <div className="font-normal text-gray-700 dark:text-gray-400 lg:flex justify-between w-ful">
                                   
                                    <div className="lg:flex sm:block w-ful">
                                        <div className="lg:mr-[16px]">
                                            <h1>Colors</h1>
                                            <select className="lg:w-[7.24vw] sm:w-[88vw] h-[54px]">
                                                <option>Colors</option>
                                            </select>
                                        </div>
                                            <div className="flex justify-between w-full">
                                            <div className="mr-[16px]">
                                                <h1>Size</h1>
                                                <select className="lg:w-[7.24vw] sm:w-[43vw] h-[54px]">
                                                    <option>Size</option>
                                                </select>
                                            </div>

                                            <div className="mr-[16px]">
                                                <h1>Qty</h1>
                                                <select className="lg:w-[7.24vw] sm:w-[43vw] h-[54px]">
                                                    <option>Qty</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div style={{width: "100%"}} className={ "align-baseline " + "mt-auto text-2xl font-bold  text-gray-900 dark:text-white flex w-ful"} >
                                        <h5 className="ml-auto"> {item.price * item.qty} THB </h5>
                                    </div>

                                </div>
 
                            </div>
                        </div>)

                        :<>
                            <div className="flex  justify-center">
                                <div>
                                    <img className={"lg:px-[24px] pb-[24px] " + "object-cover  h-[209px] w-[209px] "} src={noItemImg} alt=""/>
                                    <h1 className="text-2xl font-bold mx-auto">Your cart is empty</h1>
                                    <button style={{width:"100%"}} className="button h-[54px] bg-black text-white mt-[40px] mb-[16px]">Continue Shooping</button>
                                </div>
                            </div>
                        </>}
                </CardTemplate>

                <CardTemplate title={"Summary"} width={"min-w-[32.08%]"} height={" max-h-[500px] "} mr={"  "}  ml={" lg:ml-[20px] "} >
                    <div className="mx-[24px] flex flex-col items-center ">

                            <table 
                                style={{width:"100%"}} 
                                // style={{width:"100%",borderCollapse:"separate" ,borderSpacing: "0 1em" }} 
                            className="font-normal text-gray-700 dark:text-gray-400 block">
                                <tbody>
                                    {userPurhcase.length >0 ? 
                                        userPurhcase.map(  item => 

                                            <tr height="36px" key={item.id} >
                                                <td style={{width:"100%" }}>    
                                                    <h1>{item.name}</h1>
                                                </td>
                                                <td>    
                                                    <h1>{item.qty * item.price}</h1>
                                                </td>
                                            </tr> 
                                                
                                        ) 
                                        :                              
                                        <tr>
                                            <td style={{width:"100%"}}>    
                                                No Item
                                            </td>
        
                                        </tr> 
                                    }
                
                                    <tr height="36px" style={{ borderTop:"1pt solid black", }}>
                                        <td >    
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

                                    <tr height="36px" style={{borderBottom:"1pt solid black" }}>
                                        <td>
                                            <h1>Shipping fee</h1>
                                        </td>
                                        <td>
                                            <h1>Free</h1>
                                        </td>
                                    </tr>
                                    <tr height="36px">
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
                                    </tbody>
                                </table>
                                <button style={{width:"100%"}} className="button h-[54px] bg-black text-white mt-[40px] mb-[16px]">Check Out</button>
                                <button style={{width:"100%", border: "1pt solid black"}}  className="button h-[54px]">Continue Shooping</button>

                    </div>
                    </CardTemplate>

            </div>

            </div>
        <Footer/>
        </>
    )
}