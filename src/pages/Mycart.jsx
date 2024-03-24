import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../App"
import axios from "axios";


export default function Mycart(){
    const {userPurhcase,setuserPurhcase} = useContext(UserContext)
    const [displayMycart,setDisplayMycart] = useState([])
    const [loading, setLoading] = useState(false);


    let aa = []

    useEffect(()=>{
        setLoading(true);
        if(userPurhcase.length >0){
            setLoading(false);
            for(let i =0; i < userPurhcase.length; i++){
                fetchItemsDetails(userPurhcase[i])
            }
            console.log("22",aa)
        
        }
    },[])

    async function fetchItemsDetails(dataTemp){
        console.log("delete",dataTemp)
        try {
            await axios.get("https://api.storefront.wdb.skooldio.dev/"+dataTemp.productPermalink).then(res=>{
                const data = res.data
                console.log("aa",data)
                aa.push(data)
            })
        } catch (error) {
            console.log(error)
        }

    }


    const handleDelete = (e) => {
        let tempData = userPurhcase.filter(data=>data !== e)
        // console.log(tempData)
        // console.log(e)
        setuserPurhcase(tempData)
        // axios.delete('https://api.storefront.wdb.skooldio.dev/carts/:id/items/:itemId',)
    }

    // localStorage.setItem('id',1234)
    const handleUpdateCart = (item, name,value) => {
        let tempData = userPurhcase
        // console.log("item",item)
        // console.log(name)
        // console.log("value",value)
        tempData[item.id-1][`${name}`] = value 

        console.log(JSON.stringify(tempData[item.id-1]))
        const qtyData = { quantity: tempData[item.id-1][`${name}`], skuCode: "123" }

        console.log(qtyData)
        setuserPurhcase(tempData)

        switch (name){
            case 'quantity': 
                // axios.patch('https://api.storefront.wdb.skooldio.dev/carts/:id/items/:itemid',qtyData);
                console.log('qty')
                break;
            case 'colors': 
                // axios.patch('https://api.storefront.wdb.skooldio.dev/carts/:id/items/:itemid',qtyData);
                console.log('colors here')
                break;
            case 'size': 
                // axios.patch('https://api.storefront.wdb.skooldio.dev/carts/:id/items/:itemid',qtyData);
                console.log('size 3')
                break;
        }
        // axios.patch('https://api.storefront.wdb.skooldio.dev/carts/:id/items/:itemid',qtyData)
    }

    const marginLgStyle = " lg: p-[24px] "
    const marginStyle = " p-[16px] "
    const CardTemplate = ({ title, width, height, children, ml, mr}) => (<>
        <div id={title} className={"itemList bg-white min-h-[80vh] "+ width + height + ml + mr}>
            <h5 className={marginLgStyle+ " text-2xl font-bold tracking-tight text-gray-900 dark:text-white"}> {title} </h5>
                {children}
        </div>
    </>)

    const printInvoice = (e) => {
        printdiv(e)
    }

    const printdiv = (elem) => {
        var invoice = document.getElementById(elem).innerHTML;
        
        invoice = invoice.replace(/(<button.*.\"\>)(.*)(<\/button>)/gi,"Thank You For your support")
        invoice = invoice.replace(/(h1)/gi,"h3")
        invoice = invoice.replace(/(h5)/gi,'h1 class="center"')
        //Logo
        invoice = invoice.replace(/(<div class)/gi,'<img class="center" src="https://picsum.photos/100/100" alt=""/> <div class')
        invoice = invoice.replace(/(td style="width: 100%;)/gi,`td style="width: 80%;`)

        var WinPrint = window.open('', '', 'left=0,top=0,toolbar=0,scrollbars=0,status=0');
        WinPrint.document.write(`
        <style>
            body {            
                font-family: "Times New Roman"
            }
            h1 {align-self: center;}
            .center {
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            .items-center {margin-left: 10%;}
        </style>
        `);
        
        WinPrint.document.write(invoice);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    }

    const noItemImg = "https://picsum.photos/200/300"

    return <>
     {!loading ?

    
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

                                <div className="font-normal text-gray-700 dark:text-gray-400 lg:flex  w-ful">
                                   
                                    <div className="lg:flex sm:block w-ful">
                                        <div className="lg:mr-[16px]">
                                            <h1>Colors</h1>
                                            <select name="colors" className="lg:w-[7.24vw] w-full h-[54px]" onChange={(e)=>{handleUpdateCart(item, 'colors', e.target.value)}}>
                                                <option disabled>Colors</option>
                                                <option>Blue</option>
                                                <option>Green</option>

                                            </select>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <div className="mr-[16px]">
                                                <h1>Size</h1>
                                                <select name="size" className="lg:w-[7.24vw] md:sm:w-[43vw] sm:w-[41vw] w-[36vw] h-[54px]" onChange={(e)=>{handleUpdateCart(item, 'size', e.target.value)}}>
                                                    <option disabled>Size</option>
                                                    <option>S</option>
                                                    <option>M</option>
                                                    <option>L</option>
                                                </select>
                                            </div>

                                            <div >
                                                <h1>Qty</h1>
                                                <select name="quantity" className="lg:w-[7.24vw] md:sm:w-[43vw] sm:w-[41vw] w-[36vw] h-[54px]" onChange={(e)=>{handleUpdateCart(item, 'quantity', e.target.value)}}>
                                                    <option>Qty</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div style={{width: "100%"}} className={ "align-baseline " + "mt-auto text-2xl font-bold  text-gray-900 dark:text-white flex w-ful"} >
                                        <h5 className="ml-auto"> {item.price * item.quantity} THB </h5>
                                    </div>

                                </div>
 
                            </div>
                        </div>)

                        :<>
                            <div className="flex  justify-center">
                                <div>
                                    <img className={"lg:px-[24px] pb-[24px] " + "object-cover  h-[209px] w-[209px] "} src={noItemImg} alt=""/>
                                    <h1 className="text-2xl font-bold mx-auto">Your cart is empty</h1>
                                    <button style={{width:"100%"}} className="button h-[54px] bg-black text-white mt-[40px] mb-[16px]">Continue Shoping</button>
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
                                                    <h1>{item.quantity * item.price}</h1>
                                                </td>
                                            </tr> 
                                                
                                        ) 
                                        :                              
                                        <tr>
                                            <td style={{width:"100%"}}>    
                                                <h1>No Item</h1>
                                            </td>
        
                                        </tr> 
                                    }
                
                                    <tr height="36px" style={{ borderTop:"1pt solid black", }}>
                                        <td >    
                                            <h1>Subtotal</h1>
                                        </td>
                                        <td>
                                            <h1>
                                            {userPurhcase.length > 1 ? 
                                                userPurhcase.reduce((accumulator, currentValue) => 
                                                    accumulator + ( currentValue.price * currentValue.quantity ), 0, 
                                                )
                                                : userPurhcase.length === 1 ? userPurhcase[0].price * userPurhcase[0].quantity :0 
                                            }
                                            </h1>
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
                                            <h1>
                                            {userPurhcase.length > 1 ? 
                                                userPurhcase.reduce((accumulator, currentValue) => 
                                                accumulator + ( currentValue.price * currentValue.quantity ), 0, 
                                                )
                                                : userPurhcase.length === 1 ? userPurhcase[0].price * userPurhcase[0].quantity :0 
                                            }
                                            </h1>
                                            </td>
                                        </tr>         
                                    </tbody>
                                </table>
                                {userPurhcase.length ==0 ?
                                <>
                                    <button disabled={userPurhcase.length ==0} style={{width:"100%"}} className="button h-[54px] bg-[#E1E1E1] text-[#9F9F9F] mt-[40px] mb-[16px]" onClick={(e)=>{printInvoice("Summary")}} >Check Out</button>
                                    <button disabled={userPurhcase.length ==0} style={{width:"100%", border: "1pt solid #9F9F9F"}}  className="button h-[54px] text-[#9F9F9F]">Continue Shoping</button>
                                </>
                                :<>
                                    <button style={{width:"100%"}} className="button h-[54px] bg-black text-white mt-[40px] mb-[16px]" onClick={(e)=>{printInvoice("Summary")}} >Check Out</button>
                                    <button style={{width:"100%", border: "1pt solid black"}}  className="button h-[54px]">Continue Shoping</button>
                                </>
                                } 

                    </div>
                    </CardTemplate>

            </div>

            </div>
        <Footer/>
        </>
     : <>
    </>
    }

    </>
}