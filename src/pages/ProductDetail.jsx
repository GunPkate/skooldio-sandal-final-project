import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import Product from "../components/ProductDetailComponents/Product";

export default function ProductDetail() {
  return (
    <div className="section">
      <Navbar />
      <Product />
      <Footer />
    </div>
  );
}
