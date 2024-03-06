import { Link } from "react-router-dom"
import { UserContext } from "../App"
import { useContext } from "react"



export default function Navbar() {
    // console.log(userData)
    const userInfo = useContext(UserContext)

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

        <div className="text-white bg-blue-400">Hello {userInfo.user}</div>
    </div>
    )
}