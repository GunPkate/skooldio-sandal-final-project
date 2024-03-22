export default function Footer() {
    return (
        <div className="bg-fixed bg-black min-h-[10vh] min-w-full">
            <div className="flex justify-between">
                <div className="text-white py-8 ml-8">
                    <h1 className="font-bold text-4xl mb-8">Feature Product</h1>
                    <div>
                        <p className="mb-2">Men</p>
                        <p className="mb-2">Ladies</p>
                        <p className="mb-2">Shoes</p>
                        <p className="mb-2">Accessories</p>
                    </div>
                </div>
                <div className="text-white py-8 mr-8">
                    <h2 className="font-bold text-4xl mb-8">Customer services</h2>
                    <p>MBK Tower 20th Floor, 444, Phaya Thai Rd, Wang Mai, Pathum Wan, Bangkok 10330</p>
                    <p>Email: jane.doe@realmail.com</p>
                </div>
            </div>
        </div>
    );
}