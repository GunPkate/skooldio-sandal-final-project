import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import Product from "../components/ProductDetailComponents/Product";
// import Modal from "../components/ProductDetailComponents/Modal/Modal";

export default function ProductDetail() {
  return (
    <div className="section">
      <Navbar />
      <Product />
      {/* <Modal /> */}
      <Footer />
    </div>
  );
}
