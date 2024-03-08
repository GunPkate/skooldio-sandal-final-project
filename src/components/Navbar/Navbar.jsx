import { Link } from "react-router-dom"
import { UserContext } from "../../App"
import { useContext } from "react"
// import  "./Navbar.css"




export default function Navbar() {
    // console.log(userData)
    const {userInfo,setUserInfo} = useContext(UserContext)
    const logIn = () =>{
        setUserInfo({user:"Gun P"})
    }
    const logOut = () => {
        setUserInfo({user:""})   
    }
    
    const {userPurhcase,setuserPurhcase} = useContext(UserContext)

    const categories = [
        {value:"Men"},
        {value:"Women"},
        {value:"Kids"},
        {value:"Shoes"},
        {value:"Accessories"},
    ]
    const navItemStyle = "text-white ml-6 text-base"
    const cart = `
    <svg width="40px" height="40px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fcfcfc" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>    `

    return (
    <div className="bg-fixed bg-black h-60px  w-full flex">
        <div className="container">
            <Link className={navItemStyle} to={"/"}>
                Home
            </Link>
            {categories? categories.map((item,id) => 

                <span key={id+1}>                        
                    <Link  to={`/Products/?=${item.value}`} className={navItemStyle}>
                            {item.value}
                    </Link>
                </span>

                ): <></>}
           {/* 
            <Link className={navItemStyle} to={"/Productdetail"}>
                Product Detail
            </Link> */}

        </div>

        <div className="flex text-white">
            {userInfo.user === "" || userInfo.user === null ?
                <button onClick={logIn}>   Log in          </button>:
                <button onClick={logOut}>   Log out          </button>
            }
            <span>
                Hello {userInfo.user}
            </span>
            <span >
                {userPurhcase.length}
            </span>
            <Link className={navItemStyle} to={"/Mycart"}>
                {/* <div dangerouslySetInnerHTML={{__html: `${cart}`}}></div> */}
            </Link>
        </div>
    </div>
    )
}