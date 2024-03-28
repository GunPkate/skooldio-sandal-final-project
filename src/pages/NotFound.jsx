import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <div className="w-screen flex justify-center items-center">
        <div className="text-4xl flex flex-col items-center gap-10">
          <div className="flex flex-col text-[100px] gap-10">
            <span className="text-primary mb-5">SORRY</span>
            <div>Page Not Found</div>
          </div>
          <span className="w-full text-end">
            Error <span className="text-primary">404</span>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
