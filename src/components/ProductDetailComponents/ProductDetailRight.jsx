import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const ProductDetailRight = (data) => {
  const { userPurhcase, setuserPurhcase } = useContext(UserContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [myItem,setMyItem] = useState([]);

  const [activeSize,setActiveSize] = useState(null);
  const [activeColor,setActiveColor] = useState(null);

  // console.log("xx data",data)
  const initialProducts = data.variants

  let description = [];
  if (data) {
    description = data;
  }

  const setUpdateColor = (groupSize,groupColor,value,e) => {
    e.preventDefault();
    let tempItems = []
    myItem.length === 0 ? tempItems = initialProducts : tempItems = myItem;

    if(groupColor == 'Color'){
      activeColor !== value ? setActiveColor(value) : setActiveColor(''); 
    }

    console.log("Color",activeColor)
    if(groupColor == 'Color' ){
      tempItems = tempItems.filter(x=>x.color == value )
      setMyItem(tempItems)
    }

  }
  const setUpdateSize = (groupSize,groupColor,value,e) => {
    e.preventDefault();

    let tempItems = []
    myItem.length === 0 ? tempItems = initialProducts : tempItems = myItem;

    if(groupSize == 'Size'){
      activeSize !== value ? setActiveSize(value) :setActiveSize('');
    }

    if(groupSize == 'Size' ){
      tempItems = tempItems.filter(x=>x.size == value )
      setMyItem(tempItems)
    }
    if(tempItems.length == 1) console.log(tempItems)
  }

  const setUpdateItem = (e) => {
    e.preventDefault()
    setQuantity(e.target.value)
  }
  
  // price with commas from k'Ter (product cart)
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //rating section from k'Ter (product cart)
  const createStars = (rating) => {
    const amount = Math.floor(rating);
    if (amount) {
      const fill = [...Array(amount)].map(() => (
        <img src="../src/assets/star-fill.svg" key={Math.random()} />
      ));
      const unstar = [...Array(5 - amount)].map(() => (
        <img src="../src/assets/star-grey.svg" key={Math.random()} />
      ));
      return [...fill, ...unstar];
    } else {
      return null;
    }
  };


  const handleAddItem = () => {
    const id = localStorage.getItem('id')
    console.log("Add Item",id)

    let addItem = {
      skuCode: myItem[0].skuCode,
      qty: quantity,
    }

    console.log("Add Item",addItem)
    if(id === null || undefined) {
      try {
        // axios.post("https://api.storefront.wdb.skooldio.dev/carts",).then( res => {
        //       let data = res.data
        //       // let data = res.data.map(item=>item.name)
        //       // console.log(data)
        //       setCategories(data)
        //   })
      } catch (error) {
          console.log(error)
      }
      console.log("Add Item 11",id)
    }else{
      try {
        // axios.post(`https://api.storefront.wdb.skooldio.dev/carts/${id}/items`,).then( res => {
        //       let data = res.data
        //       // let data = res.data.map(item=>item.name)
        //       // console.log(data)
        //       setCategories(data)
        //   })
      } catch (error) {
          console.log(error)
      }
      console.log("Add Item 22",id)
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-10 mx-auto relative flex-1 min-w-[375px] desktop:mt-0  ">
      {/* upper infomation */}
      <div>
        <div className="text-lg font-semibold mb-1 desktop:text-2xl desktop:bold">
          ID : {data.skuCode}
        </div>
        <div className="text-5xl font-bold mb-1 leading-[60px]">
          {data.name} {myItem.length}
        </div>
        <div className="text-lg font-semibold mb-6 leading-6 text-secondary-700 desktop:text-2xl">
          {data.description}
        </div>
        <div className="flex flex-col justify-center">
          {data.promotionalPrice < data.price ? (
            <>
              <div className="flex justify-center items-center text-3xl font-bold mb-2 w-56 h-16 bg-[#FF000D] text-white w-16 h-10 ">
                THB {numberWithCommas(data.promotionalPrice) + ".00"}
              </div>

              <div className="text-lg font-semibold mb-6 ">
                From
                <span className="line-through">
                  {" " + " THB " + numberWithCommas(data.price) + ".00"}
                </span>
              </div>
            </>
          ) : (
            <div className="text-3xl font-bold mb-7">
              {" " + " THB " + numberWithCommas(data.price) + ".00"}
            </div>
          )}

          <div className="flex gap-[10px]">{createStars(data.ratings)}</div>
        </div>
      </div>

      {/* lower information from color below*/}
      <div className="mb-6 mt-14">
        <div className="laptop:w-72 desktop:w-80">
          <div className="font-normal text-base mb-2">Color {activeColor !== null || activeColor !== ""  ? activeColor : "X"}</div>
          <div className="flex justify-evenly gap-6 mb-6">
            {/* Color options */}
            {Array.from(
              new Set(
                data?.variants?.map((variant) => {
                  return { colorCode: variant.colorCode, color: variant.color };
                })
              )
            )
              .slice(0, 3)
              .map((colorCode, index) => (
                <button onClick={(e)=>{setUpdateColor('','Color',colorCode.color,e)}}>
                  <div
                    key={index}
                    className="w-14 h-14 "
                    style={{ background: colorCode.colorCode }}
                  ></div>

                  <div className="text-center mt-[6.5px]">
                    {colorCode.color}
                  </div>
                </button>
              ))}
          </div>
        </div>

        <div className="font-normal text-base mb-2">Size {activeSize !== null || activeSize !== ""? activeSize : "X"}</div>
        <div className="flex gap-2 mb-6">
          {/* Size options */}
          {data.variants.map(x=>x.size)[0] !== undefined || null ? Array.from( new Set(data.variants.map(x=>x.size)) ).map((size) => (
            <button
              key={size}
              className={`w-16 h-14 border border-gray-300 desktop:w-36  ${
                selectedSize === size ? "bg-yellow-300" : ""
              }`}
              onClick={(e) => setUpdateSize('Size','',size,e)}
            >
              {size}
            </button>
          ))
          :
          // disabled
          <button
          className={`bg-gray-300 w-16 h-14 border border-gray-300 desktop:w-36  `}
        >
          {/* {size} */}
        </button>
        }
        </div>
        <div className="font-normal text-base mb-2">Qty.</div>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {setUpdateItem(e);}}
          className="w-full h-14 px-2  border border-gray-300 desktop:w-36"
          min="1"
        /> {myItem.length === 1 ? <span>{myItem[0].remains} </span>:<></>}
      </div>
      {myItem.length === 1 ?

        <Link to="#" onClick={()=>{handleAddItem() }} >
        <button className="w-full h-[54px] bg-black text-white py-2 ">
            Add to cart
        </button>
      </Link>
      :
      <Link >
      <button className="w-full h-[54px] bg-black text-white py-2 ">
          Items not Selected
      </button>
    </Link>
      }
    </div>
  );
};

export default ProductDetailRight;
