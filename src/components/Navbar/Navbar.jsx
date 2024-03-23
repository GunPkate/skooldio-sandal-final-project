import { Link } from "react-router-dom"
import { UserContext } from "../../App"
import { useContext, useEffect, useState} from "react"
import  "./navbar.css"


export default function Navbar() {
    // console.log(userData)
    // const {userInfo,setUserInfo} = useContext(UserContext)
    // const logIn = () =>{
    //     setUserInfo({user:"Gun P"})
    // }
    // const logOut = () => {
    //     setUserInfo({user:""})   
    // }
    const {
        userPurhcase,
        categories
    } = useContext(UserContext)

    const positionY = "translate-y-[100px] md:translate-y-[0px] "
    const [hideMenuMobile,setHideMenuMobile] = useState(false);
    const [movePositionY,setMovePositionY] = useState("container "+positionY);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
      });

    const handleResize = () => {
        setMovePositionY("container ") 

        setDimensions({
            width: window.innerWidth,
        });
    }

    useEffect(()=>{
        window.addEventListener("resize", handleResize, false);


        setTimeout(() => {
            initialNavbar()
        }, 100);
    },[])

    const initialNavbar = () => {
        setHideMenuMobile(false);
        if (dimensions.width > 720 ) {

            setMovePositionY("container ")
            setHideMenuMobile(false)
            // console.log(hideMenu)
        }else{
            hideMenuMobile? setMovePositionY("container "+positionY) : setMovePositionY("container ")
            setHideMenuMobile(true)
            // console.log(hideMenu)
        }
    }

    const navHomeStyle = " text-white text-base my-auto "
    const navItemStyle = "text-white ml-6 text-base my-auto bg-black"
    const contentStyle = "flex items-center text-white "
    const responsiveStyle = " md:opacity-1 md:items-center  "

    const baseMenuStyle = "flex md:inline-flex bg-black "
    const cart = `
    <svg width="40px" height="40px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fcfcfc" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>    `
    const noti = `  <span style={{
        height: "30px",
        width: "25px",
        background: "red",
        borderRadius: "50%",
        display: "inlineBlock"
    }}>x</span>`


    function togggleNavbar(){
        setHideMenuMobile(!hideMenuMobile)
        hideMenuMobile? setMovePositionY("container "+positionY) : setMovePositionY("container ")
    }

    return (
    <div className={"bg-fixed bg-black lg:h-[60px] h-[56px]  w-full px-[max(8.34%,16px)] "+contentStyle}>
        <div className={movePositionY}> 
        {/* {dimensions.width}  */}
            <button onClick={()=>{togggleNavbar()}}>
                <span className={navHomeStyle+" ml-6 visible md:invisible"}> 
                    {hideMenuMobile?<>|||</>:<>|X|</>}
                </span>
            </button>
            <Link className={navHomeStyle+" ml-6 md:ml-[0px]"} to={"/"}>
                Home
            </Link>
            {   self.innerWidth < 768 ?
                <>
                {categories && !hideMenuMobile? categories.map((item,id) => 
                    <span className={baseMenuStyle + responsiveStyle}> 
                    <Link key={id+1} to={`/Products/${item.name}/${item.permalink}`} className={navItemStyle}>
                    {item.name}
                    </Link>
                    </span>
                    ): <></>
                }
                </>
                :
                <>
                {categories ? categories.map((item,id) => 
                    <span className={baseMenuStyle + responsiveStyle}> 
                    <Link key={id+1} to={`/Products/${item.name}/${item.permalink}`} className={navItemStyle}>
                    {item.name}
                    </Link>
                    </span>
                    ): <></>
                }
                </>
            }

        </div>

        <div className={contentStyle}>
            <Link className={navItemStyle} to={"/Mycart"}>
                <div className="flex">
                    <div className="relative">
                        <span className="absolute m-auto left-0 top-0.25 right-0 text-pink-600 text-xl text-center font-bold">
                            {userPurhcase.length}
                        </span>
                        <span  dangerouslySetInnerHTML={{__html: `${cart}`}}></span>
                    </div>
                <span style={{
                    height: "15px",
                    width: "15px",
                    background: "red",
                    borderRadius: "50%",
                    display: "inlineBlock",
                    color:"red",
                    opacity: `${userPurhcase.length>0?1 : 0.1 }`,
                    overflow: "hidden"
                }}>x</span>
                </div>
            </Link>
        </div>
    </div>
    )
}