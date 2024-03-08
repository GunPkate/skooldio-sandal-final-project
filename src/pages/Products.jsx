import { Fragment } from "react";

function Products() {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <header className="my-6 w-[340px]">
          <h1 className="font-bold w-full text-center">Woman's Cloth</h1>
          <div className="flex w-full justify-end">
            <p className="font-semibold">Sort by</p>
            <span>icon</span>
          </div>
        </header>
        <section>
          {["item1", "item2", "item3"].map((item) => {
            return (
              <div className="mb-10">
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  className="min-h-[340px] max-h-[370px] w-[340px] object-cover mb-6"
                />
                <div className="grid grid-cols-1 gap-2">
                  <h2 className="font-bold text-2xl">Cloth Name</h2>
                  <p className="font-thin text-secondary-700 text-base">
                    Description
                  </p>
                  <span>⭐️⭐️⭐️⭐️⭐️</span>
                  <div className="flex items-center gap-4 justify-end">
                    <p className="font-semibold text-sm line-through text-secondary-700">
                      OG price
                    </p>
                    <p className="font-bold text-2xl text-danger">
                      Discount Price
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default Products;
