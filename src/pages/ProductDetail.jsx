import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import Carousel from "../components/ProductDetailComponents/Carousel";
import ProductDetailRight from "../components/ProductDetailComponents/ProductDetailRight";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PeopleAlsoLike from "../components/ProductDetailComponents/PeopleAlsoLike";
import LoadingSpinner from "../components/LoadingSpinner";

// import Modal from "../components/ProductDetailComponents/Modal/Modal";

export default function ProductDetail() {
  const BASE_URL = "https://api.storefront.wdb.skooldio.dev/";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { permalink } = useParams();
  const [receiveData, setReceiveData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}products/${permalink}`)
      .then(async (res) => {
        let data = await res.json();
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.log("error ", err));
  }, [`${BASE_URL}products/${permalink}`]);

  if (loading && products.length === 0) {
    return <LoadingSpinner />;
  }

  const handleDataFromChild = (data) => {
    setReceiveData(data);
  };

  return (
    <div className="section ">
      <Navbar />
      {!loading ? (
        <div className="flex flex-col min-w-[343px] mt-10 mx-4 mb-20 laptop:mt-24 desktop:flex-col lg:mx-auto lg:max-w-[1600px]">
          <div className="flex flex-col lg:flex-row lg:gap-10 px-2">
            <Carousel {...products} readOnly={receiveData} />
            <ProductDetailRight
              {...products}
              sendDataToParent={handleDataFromChild}
            />
          </div>
          <PeopleAlsoLike {...products} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
      <Footer />
    </div>
  );
}
