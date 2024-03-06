import { Link } from "react-router-dom"
import { UserContext } from "../App"
import { useContext } from "react"



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


    const navItemStyle = "text-white ml-2"
    return (
    <div className="bg-fixed bg-black min-h-[10vh] min-w-full flex">
        <div className="container">
            <Link className={navItemStyle} to={"/"}>
                Home
            </Link>


            <Link className={navItemStyle} to={"/Products"}>
                Products
            </Link>

            <Link className={navItemStyle} to={"/Productdetail"}>
                Product Detail
            </Link>

            <Link className={navItemStyle} to={"/Mycart"}>
                My cart
            </Link>
        </div>

        <div className="text-white bg-blue-400">
            {userInfo.user === "" || userInfo.user === null ?
                <button onClick={logIn}>   Log in          </button>:
                <button onClick={logOut}>   Log out          </button>
            }
            <span>
                Hello {userInfo.user}
            </span>
            <div className="bg-red-300 text-2xl">
                {userPurhcase.length}
            </div>
        </div>
    </div>
    )
}