import { Link } from "react-router-dom";

function FeatureProduct() {
    return (
        <div className="text-white py-4 lg:py-8 mx-auto lg:w-1/2 lg:order-2 text-center lg:text-left lg:mx-0 lg:max-w-[900px] lg:ml-40">
            <h1 className="font-bold text-2xl mb-4 lg:mb-8">Feature Product</h1>
            <div className="font-semibold space-y-2">
                <ul>
                    <li className="pb-4 block">
                        <Link to="/Products/Men/all-men">Men</Link>
                    </li>
                    <li className="pb-4 block">
                        <Link to="/Products/Ladies/all-ladies">Ladies</Link>
                    </li>
                    <li className="pb-4 block">
                        <Link to="/Products/Shoes/men-shoes">Shoes</Link>
                    </li>
                    <li className="pb-4 block">
                        <Link to="/Products/Accessories/men-accessories">Accessories</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function CustomerServices() {
    return (
        <div className="text-white py-4 lg:py-8 mx-auto lg:w-1/2 lg:order-2 text-center lg:text-left lg:mr-40">
            <h2 className="font-bold text-2xl mb-4 lg:mb-8">Customer services</h2>
            <div className="font-normal text-base lg:text-sm lg:leading-6 space-y-2">
                <p>MBK Tower 20th Floor, 444, Phaya Thai Rd, Wang Mai, Pathum Wan, Bangkok 10330</p>
                <p>Email: jane.doe@realmail.com</p>
            </div>
        </div>
    );
}

function Copyright() {
    return (
        <div className="text-gray-400 text-xs font-normal mb-2 lg:mb-0">
            Copyright © 2024 All rights reserved for all contents.
        </div>
    );
}

function Footer() {
    return (
        <footer className="bg-black min-h-[10vh] min-w-full flex flex-col justify-between lg:space-y-8">
            <div className="lg:flex lg:justify-between">
                <FeatureProduct />
                <CustomerServices />
            </div>
            <div className="flex flex-col items-center py-4 mx-auto lg:flex-row lg:justify-between lg:order-2 text-center lg:ml-40 lg:mr-40">
                <Copyright />
                <div className="flex items-center" style={{ maxWidth: "300px" }}>
                    <p className="text-gray-400 text-xs mr-2">Powered By</p>
                    <img src="src/assets/skooldiowdb.svg" alt="Skooldio" className="w-32" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
