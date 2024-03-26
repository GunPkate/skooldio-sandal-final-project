import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import Carousel from "../components/ProductDetailComponents/Carousel";
import ProductDetailRight from "../components/ProductDetailComponents/ProductDetailRight";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PeopleAlsoLike from "../components/ProductDetailComponents/PeopleAlsoLike";

// import Modal from "../components/ProductDetailComponents/Modal/Modal";

export default function ProductDetail() {
  const BASE_URL = "https://api.storefront.wdb.skooldio.dev/";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { permalink } = useParams();
  const [receiveData, setReceiveData] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}products/${permalink}`)
      .then(async (res) => {
        let data = await res.json();
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.log("error ", err));
  }, []);

  if (loading && products.length === 0) {
    return <div>Loading...</div>;
  }

  const handleDataFromChild = (data) => {
    setReceiveData(data);}

  return (
    <div className="section ">
      <Navbar />
      <div className="flex flex-col min-w-[375px]  mt-10 mx-4 mb-20 laptop:mt-24 desktop:flex-col desktop:mx-40  desktop:justify-around ">
        <div className="flex flex-col desktop:flex-row">
          <Carousel {...products} readOnly={receiveData}/>
          <ProductDetailRight {...products}  sendDataToParent={handleDataFromChild}/>
        </div>
        <PeopleAlsoLike {...products}/>
      </div>
      <Footer />
    </div>
  );
}
