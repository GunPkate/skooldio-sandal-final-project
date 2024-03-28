import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../App";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import DeleteLogo from "../assets/delete.svg";
import logo from "../../src/assets/Logo/Storefront.svg";
import noItem from "../../src/assets/Logo/noItem.svg";
import { Link } from "react-router-dom";

function numberWithCommas(num) {
  const number = (Math.round(num * 100) / 100).toFixed(2);
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Mycart() {
  setTimeout(()=>{setLoading(false)},5000)
  const { userPurhcase, setuserPurhcase } = useContext(UserContext);
  const [myCart, setMyCart] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedNewItem, setSelectedNewItem] = useState([]);
  const [colorBtn, setColorBtn] = useState([]);
  const [sizeBtn, setSizeBtn] = useState([]);

  const fetchMycart = async (id) => {
    try {
      if (id !== null || id !== undefined || id !== "") {
        await axios
          .get(`https://api.storefront.wdb.skooldio.dev/carts/${id}`)
          .then((res) => {
            let itemCart = res.data;
            // console.log("Navbar get",itemCart)
            let myCartTemp = [];
            res.data.items.forEach(async (x) => {
              await axios
                .get(
                  "https://api.storefront.wdb.skooldio.dev/products/" +
                    x.productPermalink
                )
                .then((resDetail) => {
                  const dataDetail = resDetail.data;

                  let displayBody = {
                    id: x.id,
                    name: dataDetail.name,
                    skuCode: x.skuCode,
                    quantity: x.quantity,
                    variants: dataDetail.variants,
                    price: dataDetail.price,
                    image: dataDetail.imageUrls[0],
                    color: Array.from(
                      new Set(dataDetail.variants.map((x) => x.color))
                    ).sort(),
                    // colorCode: Array.from( new Set(data.variants.map(x=>x.colorCode)) ).sort(),
                    size: Array.from(
                      new Set(dataDetail.variants.map((x) => x.size))
                    ).sort(),
                  };

                  // console.log(displayBody)
                  myCartTemp.push(displayBody);

                  setMyCart(Array.from(new Set(myCartTemp.map((x) => x))));
                  setuserPurhcase(myCartTemp);
                  setLoading(false);
                });
            });
          });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = (e) => {
    //My cart number
    let contextResult = userPurhcase.filter((x) => x.id !== e.id);
    setuserPurhcase(contextResult);

    axios.delete(
      `https://api.storefront.wdb.skooldio.dev/carts/${localStorage.getItem(
        "id"
      )}/items/${e.id}`
    );
  };

  // localStorage.setItem('id',1234)
  const handleUpdateCart = async (item, name, value, itemNo) => {
    //<<<<<<<<<<<<<<<<  Set Condition >>>>>>>>>>>>>>>>>
    console.log(colorBtn, sizeBtn);

    if (name === "size" && itemNo !== colorBtn[0] && colorBtn.length > 0) {
      resetBtn();
    }

    if (name === "color" && itemNo !== sizeBtn[0] && colorBtn.length > 0) {
      resetBtn();
    }

    if (name == "color") {
      setColorBtn([itemNo, value]);
    }
    if (name == "size") {
      setSizeBtn([itemNo, value]);
    }

    function resetBtn() {
      setColorBtn([]);
      setSizeBtn([]);
    }

    //<<<<<<<<<<<<<<<<  Set Condition >>>>>>>>>>>>>>>>>

    let tempData = userPurhcase;

    //Get default colors and size
    let defaultCode = tempData[itemNo].skuCode;
    let defaultVariant = tempData[itemNo].variants.filter(
      (x) => x.skuCode === defaultCode
    );
    let defaultColor = defaultVariant[0].color;
    let defaultSize = defaultVariant[0].size;

    // Select
    let selectedVariant = tempData[itemNo].variants;

    let firstFilter = [];
    let secondFilter = [];
    console.log(tempData[itemNo].variants);

    let validate = null;

    //First Select//
    if (name == "quantity" && colorBtn.length == 0 && sizeBtn.length == 0) {
      let qtyData = {
        skuCode: item.skuCode,
        quantity: value,
      };
      //Update Data
      await updateMycartApi(qtyData);
    }

    if (name == "size" && colorBtn.length == 0) {
      firstFilter = selectedVariant.filter((x) => x.size == value);
      validate = "Please Select Color";
    }

    if (name == "color" && sizeBtn.length == 0) {
      firstFilter = selectedVariant.filter((x) => x.color == value);
      validate = "Please Select Size";
    }
    //First Select//

    //seconde//
    if (name == "size" && colorBtn.length !== 0) {
      secondFilter = selectedVariant.filter(
        (x) => x.color == colorBtn[1] && x.size == value
      );
      console.log("secondFilter", secondFilter);
    }

    if (name == "color" && sizeBtn.length !== 0) {
      secondFilter = selectedVariant.filter(
        (x) => x.color == sizeBtn[1] && x.size == value
      );
      console.log("secondFilter", secondFilter);
    }

    if (validate !== null && firstFilter.length !== 1) alert(validate);

    if (firstFilter.length == 1 && name !== "quantity") {
      let qtyData = {
        skuCode: firstFilter[0].skuCode,
        quantity: item.quantity,
      };
      //Update Data
      await updateMycartApi(qtyData);
      resetBtn();
    }

    if (secondFilter.length == 1 && name !== "quantity") {
      let qtyData = {
        skuCode: secondFilter[0].skuCode,
        quantity: item.quantity,
      };
      //Update Data
      await updateMycartApi(qtyData);
      resetBtn();
    }
    console.log(firstFilter);

    function updateMycartApi(bodyData) {
      axios
        .patch(
          `https://api.storefront.wdb.skooldio.dev/carts/${localStorage.getItem(
            "id"
          )}/items/${item.id}`,
          bodyData
        )
        .then(async (resUpdate) => {
          console.log(resUpdate);
          await fetchMycart(localStorage.getItem("id"));
          setSelectedNewItem([]);
        });
    }
  };

  const marginLgStyle = " lg: p-[24px] ";
  const marginStyle = " p-[16px] ";
  const CardTemplate = ({ title, width, height, children, ml, mr }) => (
    <>
      <div
        id={title}
        className={"itemList bg-white mb-10 pb-10 " + width + height + ml + mr}
      >
        <h5
          className={
            marginLgStyle + " text-2xl font-bold tracking-tight text-gray-900"
          }
        >
          {" "}
          {title}{" "}
        </h5>
        {children}
      </div>
    </>
  );

  const printInvoice = (e) => {
    printdiv(e);
  };

  const printdiv = (elem) => {
    var invoice = document.getElementById(elem).innerHTML;

    invoice = invoice.replace(
      /(<button.*.\"\>)(.*)(<\/button>)/gi,
      "Thank You For your support"
    );
    invoice = invoice.replace(/(h1)/gi, "h3");
    invoice = invoice.replace(/(h5)/gi, 'h1 class="center"');
    //Logo
    invoice = invoice.replace(
      /(<div class)/gi,
      `<img class="center" src=${logo} alt=""/> <div class`
    );
    invoice = invoice.replace(
      /(td style="width: 100%;)/gi,
      `td style="width: 80%;`
    );

    var WinPrint = window.open(
      "",
      "",
      "left=0,top=0,toolbar=0,scrollbars=0,status=0"
    );
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
  };

  const noItemImg = noItem;

  return (
    <>
      <Navbar />

      <>
        {/* <button onClick={()=>{console.log(JSON.stringify(selectedDefault))}}>1234</button> */}
        <div className="lg:mx-auto bg-gray-50">
          <div className="min-w=[100vw]">
            <h1
              className={
                "font-bold max-w-[1600px] mx-auto text-[32px] px-6 md:px-10"
              }
            >
              My Cart{" "}
            </h1>
          </div>
          <div className="section section-mycart xl:flex md:flex:none md:block max-w-[1600px] mx-auto lg:gap-10 md:px-10">
            <CardTemplate
              title={"Items"}
              width={"w-full"}
              height={" h-fit"}
              ml={" ml-0 "}
              mr={" mr-0"}
            >
              {!loading ? (
                userPurhcase.length > 0 ? (
                  userPurhcase.map((item, id) => (
                    <div
                      key={id}
                      className="py-6 mx-6 lg:flex lg:inline-block md:block border-solid border-secondary-300 border-b-[0.5px]"
                    >
                      <div className="justify-center lg:min-w-[200px]">
                        <img
                          className="h-[200px] sm:h-[300px] lg:h-[200px] w-full object-cover"
                          src={item.image}
                          alt=""
                        />
                      </div>
                      <div
                        style={{ width: "100%" }}
                        className={
                          "mt-6 lg:ml-10 lg:mt-0 flex flex-col justify-between leading-normal mx-auto"
                        }
                      >
                        <div className="flex justify-between">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate pr-10">
                            {item.name}
                          </h5>
                          <button
                            onClick={(e) => {
                              handleDelete(item);
                            }}
                          >
                            <img src={DeleteLogo}></img>
                          </button>
                        </div>

                        <div className="text-[16px] text-gray-700 dark:text-gray-400 lg:flex w-full gap-10">
                          <div className="gap-4 w-full grid grid-cols-2 grid-rows-2 xl:grid-cols-3 xl:grid-rows-1">
                            <div className="col-span-2 xl:col-span-1">
                              <h1 className="text-gray-700 text-[16px] p-0 m-0">
                                Colors
                              </h1>

                              <select
                                name="colors"
                                className="w-full h-[54px] border-gray-300 rounded-none border-[1px] text-black"
                                onChange={(e) => {
                                  handleUpdateCart(
                                    item,
                                    "color",
                                    e.target.value,
                                    id
                                  );
                                }}
                              >
                                <option>
                                  {
                                    userPurhcase[id].variants.filter(
                                      (x) =>
                                        x.skuCode == userPurhcase[id].skuCode
                                    )[0].color
                                  }
                                </option>
                                {/* {Array.from(
                                                    new Set( item.variants.map(x => <option>{x.color}</option>) )
                                                    )
                                                } */}
                                {userPurhcase?.filter((x) => x.id == item.id)
                                  .length > 0 ? (
                                  userPurhcase
                                    ?.filter((x) => x.id == item.id)[0]
                                    .color.map((y) => <option>{y}</option>)
                                ) : (
                                  <></>
                                )}
                              </select>
                            </div>
                            <div>
                              <h1 className="text-gray-700 text-[16px] p-0 m-0">
                                Size
                              </h1>
                              <select
                                name="size"
                                className="w-full h-[54px] border-gray-300 rounded-none border-[1px] text-black"
                                onChange={(e) => {
                                  handleUpdateCart(
                                    item,
                                    "size",
                                    e.target.value,
                                    id
                                  );
                                }}
                              >
                                <option>
                                  {
                                    userPurhcase[id].variants.filter(
                                      (x) =>
                                        x.skuCode == userPurhcase[id].skuCode
                                    )[0].size
                                  }
                                </option>
                                {/* {Array.from(
                                                        new Set(item.variants.map(x=>{ return <option>{x.size}</option> }) ) 
                                                    )} */}
                                {userPurhcase?.filter((x) => x.id == item.id)
                                  .length > 0 ? (
                                  userPurhcase
                                    ?.filter((x) => x.id == item.id)[0]
                                    .size.map((y) => <option>{y}</option>)
                                ) : (
                                  <></>
                                )}
                              </select>
                            </div>
                            <div>
                              <h1 className="text-gray-700 text-[16px] p-0 m-0">
                                Qty
                              </h1>
                              <select
                                name="quantity"
                                className="w-full h-[54px] border-gray-300 rounded-none border-[1px] text-black"
                                onChange={(e) => {
                                  handleUpdateCart(
                                    item,
                                    "quantity",
                                    e.target.value,
                                    id
                                  );
                                }}
                              >
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
                          <div
                            className={
                              "mt-6 w-full text-end items-end text-3xl font-bold  text-gray-900 dark:text-white flex lg:w-fit"
                            }
                          >
                            <h5 className="ml-auto text-secondary truncate">
                              THB {numberWithCommas(item.price * item.quantity)}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex  justify-center">
                      <div>
                        <img
                          className={
                            "lg:px-[24px] pb-[24px] " +
                            "object-cover  h-[209px] w-[209px] "
                          }
                          src={noItemImg}
                          alt=""
                        />
                        <h1 className="text-2xl font-bold mx-auto">
                          Your cart is empty
                        </h1>
                        <button
                          style={{ width: "100%" }}
                          className="button h-[54px] bg-black text-white mt-[40px] mb-[16px]"
                        >
                          Continue Shoping
                        </button>
                      </div>
                    </div>
                  </>
                )
              ) : (
                <LoadingSpinner />
              )}
            </CardTemplate>

            <CardTemplate
              title={"Summary"}
              width={"min-w-[32.08%]"}
              height={" max-h-[500px] "}
              mr={""}
              ml={""}
            >
              <div className="mx-[24px] flex flex-col items-center ">
                <table
                  style={{ width: "100%" }}
                  // style={{width:"100%",borderCollapse:"separate" ,borderSpacing: "0 1em" }}
                  className="text-[16px] text-gray-700 dark:text-gray-400 block"
                >
                  <tbody className="flex flex-col gap-4">
                    {userPurhcase.length > 0 ? (
                      userPurhcase.map((item) => (
                        <tr key={item.id}>
                          <td className="w-full">
                            <h1 className="p-0 m-0 text-[16px] text-secondary">
                              {item.name}
                            </h1>
                          </td>
                          <td>
                            <h1 className="p-0 m-0 text-[16px] text-secondary">
                              {numberWithCommas(item.quantity * item.price)}
                            </h1>
                            {/* <h1>{totalPrice !== null ? totalPrice :item.quantity * item.price}</h1> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td style={{ width: "100%" }}>
                          <h1>No Item</h1>
                        </td>
                      </tr>
                    )}

                    <div className="divider p-0 m-0"></div>

                    <tr>
                      <td className="w-full">
                        <h1 className="p-0 m-0 text-[16px] text-secondary">
                          Subtotal
                        </h1>
                      </td>
                      <td>
                        <h1 className="p-0 m-0 text-[16px] text-secondary">
                          {userPurhcase.length > 1
                            ? numberWithCommas(
                                userPurhcase.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    currentValue.price * currentValue.quantity,
                                  0
                                )
                              )
                            : userPurhcase.length === 1
                            ? numberWithCommas(
                                userPurhcase[0].price * userPurhcase[0].quantity
                              )
                            : 0}
                        </h1>
                      </td>
                    </tr>

                    <tr>
                      <td className="w-full">
                        <h1 className="p-0 m-0 text-[16px] text-secondary">
                          Shipping fee
                        </h1>
                      </td>
                      <td>
                        <h1 className="p-0 m-0 text-[16px] text-secondary">
                          Free
                        </h1>
                      </td>
                    </tr>

                    <div className="divider p-0 m-0"></div>

                    <tr className="text-[18px] font-semibold">
                      <td className="w-full">
                        <h1 className="p-0 m-0 text-[16px] text-secondary">
                          Total
                        </h1>
                      </td>
                      <td>
                        <h1 className="p-0 m-0 text-[16px] text-secondary">
                          {userPurhcase.length > 1
                            ? numberWithCommas(
                                userPurhcase.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    currentValue.price * currentValue.quantity,
                                  0
                                )
                              )
                            : userPurhcase.length === 1
                            ? numberWithCommas(
                                userPurhcase[0].price * userPurhcase[0].quantity
                              )
                            : 0}
                        </h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {userPurhcase.length == 0 ? (
                  <>
                    <button
                      disabled={userPurhcase.length == 0}
                      style={{ width: "100%" }}
                      className="button h-[54px] bg-[#E1E1E1] text-[#9F9F9F] mt-[40px] mb-[16px]"
                      onClick={(e) => {
                        printInvoice("Summary");
                      }}
                    >
                      Check Out
                    </button>
                    <button
                      disabled={userPurhcase.length == 0}
                      style={{ width: "100%", border: "1pt solid #9F9F9F" }}
                      className="button h-[54px] text-[#9F9F9F]"
                    >
                      Continue Shoping
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{ width: "100%" }}
                      className="button h-[54px] bg-black text-white mt-[40px] mb-[16px]"
                      onClick={(e) => {
                        printInvoice("Summary");
                      }}
                    >
                      Check Out
                    </button>
                    <button
                      style={{ width: "100%", border: "1pt solid black" }}
                      className="button h-[54px]"
                    >
                      Continue Shoping
                    </button>
                  </>
                )}
              </div>
            </CardTemplate>
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}
