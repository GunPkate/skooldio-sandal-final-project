import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = "https://api.storefront.wdb.skooldio.dev/";

  useEffect(() => {
    fetch(`${BASE_URL}products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products. Please try again later.");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  const sortedProducts = [...products].sort((a, b) => b.ratings - a.ratings);
  const topProducts = sortedProducts.slice(0, 4);
  const items = topProducts.map((item) => <ProductCard key={item.id} {...item} />);



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

  <div className="relative bg-white px-6 pb-20 lg:px-8 lg:pb-28">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
        <div className="flex flex-col overflow-hidden rounded-lg">
          <div className="flex flex-1 flex-col justify-between bg-white p-6">
            <div>
              <p className="text-6xl font-bold text-black">
                2024 Collection
              </p>
              <p className="mt-3 text-base text-black">
                Step into a world of winter elegance and style with our latest
                Winter Collection. As temperatures drop, our curated selection
                of clothing is designed to keep you fashionably warm. From
                luxurious knitwear to trend-setting outerwear, each piece in
                our collection is a celebration of seasonal sophistication.
                Explore the blend of comfort and fashion, as we present you
                with the must-have ensembles to make a statement in the chilly
                months ahead. Welcome to a winter wardrobe that seamlessly
                combines coziness with chic aesthetics.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden relative">
          <img
            className="w-full h-full object-cover"
            src="./src/assets/img2.jpg"
            alt=""
          />
          <div className="flex flex-1 flex-col justify-between p-6 absolute bottom-0" style={{ background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))" }}>
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-xl font-semibold text-white">Cozy Breeze</p>
              <p className="mt-3 text-base text-white font-light">
                Embrace the season with our carefully curated selection of
                garments, each piece thoughtfully designed to blend fashion and
                functionality. From cozy knits to elegant outerwear, our
                collection invites you to indulge in the allure of winter
                fashion.
              </p>
              <Link to="/Products/Spring%202024/spring-2024"><button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded">
                View more
              </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden relative">
          <img
            className="w-full h-full object-cover"
            src="./src/assets/img3.jpg"
            alt=""
          />
          <div className="flex flex-1 flex-col justify-between p-6 absolute bottom-0" style={{ background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))" }}>
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-xl font-semibold text-white">Flexi Move</p>
              <p className="mt-3 text-base text-white font-light">
                Step into a world where fashion meets functionality with our
                latest Sneaker Collection. Designed for those who appreciate
                the perfect fusion of style and comfort, our curated selection
                of sneakers is a celebration of urban chic.
              </p>
              <Link to="/Products/Spring%202024/spring-2024"><button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded">
                View more
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


      <div className="flex flex-col items-center px-4 font-bold mx-auto">
        <p className="text-[32px] mb-16">Feature Products</p>
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2 xl:grid-cols-4 md:gap-x-10 md:gap-y-[60px]">
          {items}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
