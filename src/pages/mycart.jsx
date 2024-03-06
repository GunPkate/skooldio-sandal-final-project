import Footer from "../components/Footer"
import Navbar from "../components/Navbar"


export default function Mycart(){
    const items = [
        {
            id:1,
            name: "item 1",
            price: 2000
        },
        {
            id:2,
            name: "item 1",
            price: 2000
        },
    ]
    return(
        <>
        <Navbar/>
        <div className="section lg:flex md:flex:none md:block">
            <div className="itemList bg-blue-400 min-h-[80vh] min-w-[40vw]">
                <h1>My Cart</h1>
                {items.length >0 ? items.map( item => 
                <div key={item.id}>
                    <div>
                        {item.name}
                    </div>
                    <div>
                        {item.price}
                    </div>
                    <div>
                        <select className="ml-2">
                            <option>QTY</option>
                        </select>
                        <select className="ml-2">
                            <option>Size</option>
                        </select>
                        <select className="ml-2">
                            <option>Colors</option>
                        </select>
                    </div>
                </div>
                )
                :<>Please Select items</>}
            </div>
            <div className="summary bg-red-400 min-h-[80vh] min-w-[40vw]">
                <h1>Summary</h1>
                {items.length >0 ? 
                    items.map( 
                        item => <div>{item.name}</div>
                        ) :<div></div>
                    }
            </div>
        </div>
        <Footer/>
        </>
    )
}