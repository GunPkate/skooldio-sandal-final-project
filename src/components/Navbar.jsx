import { Link } from "react-router-dom"


export default function Navbar() {
    return (<div className="bg-fixed bg-black min-h-[10vh] min-w-full">
        <Link className="text-white" to={"/"}>
            Home
        </Link>


        <Link className="text-white" to={"/Products"}>
            Products
        </Link>

        <Link className="text-white" to={"/Productdetail"}>
            Product Detail
        </Link>

        <Link className="text-white" to={"/Mycart"}>
            My cart
        </Link>
    </div>)
}