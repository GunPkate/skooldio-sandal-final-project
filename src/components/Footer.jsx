export default function Footer() {
    return (
        <footer className="bg-fixed bg-black min-h-[10vh] min-w-full flex flex-col justify-between">
            <div>
                <div className="flex justify-between">
                    <div className="text-white py-8 ml-[160px]">
                        <h1 className="font-bold text-4xl mb-8">Feature Product</h1>
                        <div className="font-semibold">
                            <p className="mb-2">Men</p>
                            <p className="mb-2">Ladies</p>
                            <p className="mb-2">Shoes</p>
                            <p className="mb-2">Accessories</p>
                        </div>
                    </div>
                    <div className="text-white py-8 mr-[160px]">
                        <h2 className="font-bold text-4xl mb-8">Customer services</h2>
                        <div></div>
                        <p>MBK Tower 20th Floor, 444, Phaya Thai Rd, Wang Mai, Pathum Wan, Bangkok 10330</p>
                        <p>Email: jane.doe@realmail.com</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mx-[160px] lg:flex-row lg:justify-between">
                <div className="text-gray-400 text-xs font-normal mb-4 lg:mb-0">Copyright © 2024 All rights reserved for all contents.</div>
                <div className="flex items-center">
                    <p className="text-gray-400 text-xs mr-2">Powered By</p>
                    <img src="src/assets/skooldiowdb.svg" alt="Skooldio" className="w-32"/>
                </div>
            </div>
        </footer>
    );
}
