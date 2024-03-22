import Navbar from "../components/Navbar/Navbar";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [catagoriesInclude, setCatagoriesInclude] = useState([]);
  const [categoriesExclude, setCategoriesExclude] = useState([]);
  const BASE_URL = "https://api.storefront.wdb.skooldio.dev/";

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      });
  }, []);

  let items = [];

  if (products.length > 0) {
    // Sort the products by ratings
    const sortedProducts = products.sort((a, b) => b.ratings - a.ratings);
    // Take only the first 4 sorted products
    const topProducts = sortedProducts.slice(0, 4);
    // Map the top products to ProductCard components
    items = topProducts.map((item, index) => <ProductCard key={index} {...item} />);
  }

  return (
    <>
      <Navbar />
      <div className="mb-16">
        <img
          className="h-[420px] w-full object-cover"
          src="./src/assets/img1.jpg"
          alt="wallpaper"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-10 mx-auto h-fit mb-16">
        <div className="flex flex-col w-full md:w-[363px] h-96">
          <p className="font-bold text-4xl md:text-8xl">2024</p>
          <p className="font-bold text-3xl md:text-5xl">Collection</p>
          <p className="text-base">
            Step into a world of winter elegance and style with our latest
            Winter Collection. As temperatures drop, our curated selection of
            clothing is designed to keep you fashionably warm. From luxurious
            knitwear to trend-setting outerwear, each piece in our collection is
            a celebration of seasonal sophistication. Explore the blend of
            comfort and fashion, as we present you with the must-have ensembles
            to make a statement in the chilly months ahead. Welcome to a winter
            wardrobe that seamlessly combines coziness with chic aesthetics.
          </p>
        </div>
        <div className="relative">
          <img
            className="w-full md:w-[575px] h-[500px] object-cover bg-gradient-to-t from-slate-900 to-transparent "
            src="./src/assets/img2.jpg"
            alt="Cozy Breeze"
          />
          <div className="absolute bottom-4 px-4 flex flex-col items-center text-white ">
            <p className="font-bold text-xl md:text-2xl">Cozy Breeze</p>
            <p className="font-normal text-base">
              Embrace the season with our carefully curated selection of
              garments, each piece thoughtfully designed to blend fashion and
              functionality. From cozy knits to elegant outerwear, our
              collection invites you to indulge in the allure of winter fashion.
            </p>
            <button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded">
              View more
            </button>
          </div>
        </div>
        <div className="relative">
          <img
            className="w-full md:min-w-[575px] h-[500px] object-cover bg-gradient-to-t from-slate-900 to-transparent "
            src="./src/assets/img3.jpg"
            alt="Flexi Move"
          />
          <div className="absolute bottom-4 px-4 flex flex-col items-center text-white ">
            <p className="font-bold text-xl md:text-2xl">Flexi Move</p>
            <p className="font-normal text-base">
              Step into a world where fashion meets functionality with our
              latest Sneaker Collection. Designed for those who appreciate the
              perfect fusion of style and comfort, our curated selection of
              sneakers is a celebration of urban chic.
            </p>
            <button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded">
              View more
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center px-4 font-bold mb-16">
        <p className="text-[32px] mb-16">Feature Products</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mx-auto w-full md:w-fit">
          {items}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
