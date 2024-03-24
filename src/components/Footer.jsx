import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="bg-fixed bg-black min-h-[10vh] min-w-full flex flex-col justify-between lg:space-y-8">
            <div className="lg:flex lg:justify-between">
                <div className="text-white py-4 lg:py-8 mx-auto lg:w-1/2 lg:order-2 text-center">
                    <h1 className="font-bold text-2xl mb-4 lg:mb-8">Feature Product</h1>
                    <div className="font-semibold space-y-2">
                        <Link to ="/Products/Men/all-men"><p>Men</p></Link>
                        <Link to ="/Ladies/all-ladies"><p>Ladies</p></Link>
                        <Link to="/Shoes/men-shoes"><p>Shoes</p></Link>
                        <Link to="/men-accessories"><p>Accessories</p></Link>
                        
                    </div>
                </div>
                <div className="text-white py-4 lg:py-8 mx-auto lg:w-1/2 lg:order-2 text-center">
                    <h2 className="font-bold text-2xl mb-4 lg:mb-8">Customer services</h2>
                    <div className="font-normal text-normal space-y-2">
                        <p>MBK Tower 20th Floor, 444, Phaya Thai Rd, Wang Mai, Pathum Wan, Bangkok 10330</p>
                        <p>Email: jane.doe@realmail.com</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center py-4 mx-auto lg:flex-row lg:justify-between lg:w-1/2 lg:order-2 text-center">
                <div className="text-gray-400 text-xs font-normal mb-2 lg:mb-0">Copyright © 2024 All rights reserved for all contents.</div>
                <div className="flex items-center mb-2 lg:mb-0">
                    <p className="text-gray-400 text-xs mr-2">Powered By</p>
                    <img src="src/assets/skooldiowdb.svg" alt="Skooldio" className="w-32"/>
                </div>
            </div>
        </footer>
    );
}
