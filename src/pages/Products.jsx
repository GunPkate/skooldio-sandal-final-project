import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import AccordianRoot from "../components/AccordianRoot";

function Products() {
  const location = useLocation();
  const productsContext = { value: "2" };

  return (
    <>
      <Navbar />

      <div className="2xl:flex h-[100vh] 2xl:max-w-[1600px] justify-between mx-auto">
        {/* accordian */}
        <div className="hidden 2xl:flex 2xl:flex-col min-w-[280px] 2xl:min-h-max text-secondary font-semibold px-4 gap-0 pt-24 join join-vertical">
          {AccordianRoot("Men")}
          {AccordianRoot("Ladies")}
          {AccordianRoot("Collections")}
        </div>

        {/* product list */}
        <Outlet context={{ productsContext }} key={location.pathname} />
      </div>
    </>
  );
}

export default Products;
