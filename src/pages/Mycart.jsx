import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../App"
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Mycart(){
    const {userPurhcase,setuserPurhcase} = useContext(UserContext)
    const [myCart, setMyCart] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedNewItem,setSelectedNewItem] = useState([])

    const fetchMycart = async (id) => {
        try {
      
          if(id !== null || id !== undefined || id !== ""){
            await axios.get(`https://api.storefront.wdb.skooldio.dev/carts/${id}`).then( res => {
            let itemCart =  res.data;
            // console.log("Navbar get",itemCart)
              let myCartTemp = []
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
                  
                  // console.log(displayBody)
                  myCartTemp.push(displayBody)
                  
                  setMyCart(Array.from( new Set(myCartTemp.map(x=>x)) ))
                  setuserPurhcase(myCartTemp)
                })
              })
    
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    
    const handleDelete = (e) => {
        //My cart number
        let contextResult = userPurhcase.filter(x=>x.id!==e.id)
        setuserPurhcase(contextResult);
        

        axios.delete(`https://api.storefront.wdb.skooldio.dev/carts/${localStorage.getItem('id')}/items/${e.id}`)
    }

    // localStorage.setItem('id',1234)
    const handleUpdateCart = (item, name,value, itemNo) => {
        let tempData = userPurhcase
        console.log("sss",itemNo)


        //Get default colors and size
        let defaultCode = tempData[itemNo].skuCode;
        let defaultVariant = tempData[itemNo].variants.filter(x=>x.skuCode===defaultCode)
        let defaultColor = defaultVariant[0].color
        let defaultSize = defaultVariant[0].size

        // console.log("item",item)
        // console.log("in cart Variant",defaultVariant)
        // console.log("in cart color",defaultColor)
        // console.log("in cart size",defaultSize)

        let firstFilter = [];
        let SecondFilter = [];
        let validateMessage = "";

        let SelectNewList = selectedNewItem


        //add new data when no previous data || replace new data
        // if(SelectNewList){
         let   SelectNewListBody = {
                skuCode: item.skuCode, //???? here change color and filter 
                color:  name === 'color'? value : null,
                size:  name === 'size'? value : null,
            }
        let count = 0;
        console.log("xxxx",selectedNewItem)
        if(selectedNewItem.length > 0){
            selectedNewItem.forEach(x=>x.skuCode === item.skuCode ? count+=1 : count += 0) 
       


        let selectTemp = selectedNewItem
        console.log("1234",JSON.stringify(selectTemp))
        selectTemp.forEach(x=>{ if(x.skuCode === item.skuCode){
                if(name == 'color') x.color = value;
                if(name == 'size') x.size = value;
            }  
            console.log("1234",JSON.stringify(selectTemp))
        })
        }
        if(count > 1){

        }else if(count == 0){
            SelectNewList.push(SelectNewListBody)
        }

        
        console.log("check Select",JSON.stringify(SelectNewListBody))

        console.log("check count SelectNewListBody",count)

        setSelectedNewItem(SelectNewList)
        let newItem = []
        switch (name){
            case 'quantity': 

                tempData.forEach(x=>
                     { if(x.id === item.id) x.quantity = value}
                )

                SecondFilter = tempData.filter(x => x.id === item.id);
                let qtyData = {
                    skuCode: SecondFilter[0].skuCode,
                    quantity: SecondFilter[0].quantity,
                }
                console.log(tempData)
                axios.patch(`https://api.storefront.wdb.skooldio.dev/carts/${localStorage.getItem('id')}/items/${item.id}`,qtyData).then(async resUpdate => {
                    console.log(resUpdate)
                    await fetchMycart(localStorage.getItem('id'))
                    setSelectedNewItem('')
                });
                // console.log(item.price * item.quantity)
                break;
            case 'color': 
                console.log('item here',(item))
                console.log('colors here',(tempData[itemNo].variants))
                //GEt new Variant 
                newItem = selectedNewItem.filter(x=>x.skuCode === item.skuCode && x.id === item.id)
                console.log(12345,newItem)
                if(newItem.length > 0 && ( newItem[0].size !== null &&  newItem[0].size !== undefined ) ){
                    let result = tempData[itemNo].variants.filter(x=>x.color === newItem.color && x.size === newItem.size)
                    console.log("color 2 select",firstFilter)
                    if(result.length == 1){
                        SecondFilter = result
                        console.log("SecondFilter.skuCode",SecondFilter.skuCode)
                        console.log("D .skuCode",defaultCode)
                    }
                }else{

                
                firstFilter = tempData[itemNo].variants.filter(x=> x.color ===value )
                console.log("firstFilter",firstFilter)

                }
                SecondFilter = firstFilter;
                if(firstFilter.length !== 1){
                    SecondFilter = firstFilter.filter(x=>x.size==defaultSize)
                    validateMessage = "Please Select Size";               
                    alert(validateMessage)
                }



                break;
            case 'size': 

            console.log('size here',(tempData[itemNo].variants))
            //GEt new Variant 
            newItem = selectedNewItem.filter(x=>x.size === item.size && x.id === item.id)
            console.log(12345,"size",newItem)
            if(newItem.length > 0 && ( newItem[0].color !== null &&  newItem[0].color !== undefined ) ){
                let result = tempData[itemNo].variants.filter(x=>x.color === newItem.color && x.size === newItem.size)
                console.log("size 2 select",result)
                if(result.length == 1){
                    SecondFilter = result
                    console.log("SecondFilter.skuCode",SecondFilter.skuCode)
                    console.log("D .skuCode",defaultCode)
                }
            }else{

                firstFilter = tempData[itemNo].variants.filter(x=> x.size===value )

                console.log("firstFilter",firstFilter)

                SecondFilter = firstFilter;
                if(firstFilter.length !== 1){
                    SecondFilter = firstFilter.filter(x=>x.size==defaultCode)
                    validateMessage = "Please Select Color";
                    alert(validateMessage)
                }

            }


                break;
        }

        if(SecondFilter.length == 1 &&name !== 'quantity'){
            validateMessage = ""
            let qtyData = {
                skuCode: SecondFilter[0].skuCode,
                quantity: item.quantity,
            }
            //Update Data
            console.log("only 1",SecondFilter)
            axios.patch(`https://api.storefront.wdb.skooldio.dev/carts/${localStorage.getItem('id')}/items/${item.id}`,qtyData).then(async resUpdate => {
                console.log(resUpdate)
                await fetchMycart(localStorage.getItem('id'))
                setSelectedNewItem('')
            });
        }

        console.log("SecondFilter xxx",SecondFilter)
        // axios.patch('https://api.storefront.wdb.skooldio.dev/carts/:id/items/:itemid',qtyData)

        // update UI SetDisplay with SecondFilter


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
    <Navbar/>
     {!loading && userPurhcase.length >0 ?

        
        <>
                {/* <button onClick={()=>{console.log(JSON.stringify(selectedDefault))}}>1234</button> */}
            <div style={{backgroundColor: "azure"}} className="lg:mx-auto"> 
            <div className="min-w=[100vw] lg:mx-[max(8.34%,16px)]">
                <h1 className={ marginLgStyle + marginStyle + " text-2xl font-bold"}>My Cart </h1>
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

                                            <select name="colors" className="lg:w-[7.24vw] w-full h-[54px]" onChange={(e)=>{handleUpdateCart(item, 'color', e.target.value, id)}}>
                                                
                                                <option >{userPurhcase[id].variants.filter(x=>x.skuCode == userPurhcase[id].skuCode)[0].color }</option>
                                                {/* {Array.from(
                                                    new Set( item.variants.map(x => <option>{x.color}</option>) )
                                                    )
                                                } */}
                                                {  userPurhcase?.filter(x=>x.id==item.id).length > 0 ? userPurhcase?.filter(x=>x.id==item.id)[0].color
                                                            .map(y=><option >{y}</option>)  : <></>
                                                    }
                                            </select>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <div className="mr-[16px]">
                                                <h1>Size</h1>
                                                <select name="size" className="lg:w-[7.24vw] md:sm:w-[43vw] sm:w-[41vw] w-[36vw] h-[54px]" onChange={(e)=>{handleUpdateCart(item, 'size', e.target.value, id)}}>
                                                    <option >{userPurhcase[id].variants.filter(x=>x.skuCode == userPurhcase[id].skuCode)[0].size }</option>
                                                    {/* {Array.from(
                                                        new Set(item.variants.map(x=>{ return <option>{x.size}</option> }) ) 
                                                    )} */}
                                                    {  userPurhcase?.filter(x=>x.id==item.id).length > 0 ? userPurhcase?.filter(x=>x.id==item.id)[0].size
                                                            .map(y=><option >{y}</option>)  : <></>
                                                    }
                                                </select>
                                            </div>

                                            <div >
                                                <h1>Qty</h1>
                                                <select name="quantity" 
                                                className="lg:w-[7.24vw] md:sm:w-[43vw] sm:w-[41vw] w-[36vw] h-[54px]" 
                                                onChange={(e)=>{handleUpdateCart(item, 'quantity', e.target.value, id)}}>
                                                    <option>{item.quantity}</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
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
                                                    {/* <h1>{totalPrice !== null ? totalPrice :item.quantity * item.price}</h1> */}
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
        </>
        : 
        <div className="h-[80vh]">
             <LoadingSpinner />
        </div>
    }
    <Footer/>

    </>
}