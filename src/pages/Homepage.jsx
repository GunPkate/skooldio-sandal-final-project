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

      <div className="gap-10">
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
            className="object-fit"
            src="https://s3-alpha-sig.figma.com/img/d5fe/7eb0/680055de67c3d9c6a271ba03847a3cb9?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QoAoFPFXTGXqVstIsmBMC1Sq3~qsDWeK3I-z3NwP12WOlKPS1Lwe7KRuHjvCBR-cCyxGKAz4wT~tr3KbIMlOZvxVxhTwJspMskLIvd3T24u6GCoZdC4bMjvqCK9AvKo6DoAIgNS1fETMpXgo0ICafS1TR~hg0S2t~hSaZFFlqxpAlo3D6zOREfaMLdPq1GHk1Vj6dsp2QZTpDtwta35OnVf0tc2oj6WuPLBV81ZOYB6IYs3Gig6MczVVDGFoFJz9sxv6iDbh6J4xmTM7lDg9RK8WzVjY91CoOGJRgUDi-fITZ3-OmqgJqx9ymptp5Ki-HNTjerkv5KwkvZBV~zvsFg__"
            alt=""
          />
          <div className="flex flex-1 flex-col justify-between p-6 absolute bottom-0">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-xl font-semibold text-white">Cozy Breeze</p>
              <p className="mt-3 text-base text-white font-light">
                Embrace the season with our carefully curated selection of
                garments, each piece thoughtfully designed to blend fashion and
                functionality. From cozy knits to elegant outerwear, our
                collection invites you to indulge in the allure of winter
                fashion.
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded">
                View more
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden relative">
          <img
            className="w-full object-fit"
            src="https://s3-alpha-sig.figma.com/img/1f4b/d42b/1a0763187b13c1a39bff2d14eb960993?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gEKex1PxYViM7KPPxulfJklZIC7Mqmdn8aQ6mBZNzy7AKrkbgGkbR94W7S7yNlny2yt6SDI4beAzXimPDrZzokvYQtk0kbzz6BLH-bqbUs4sYJ5VEv6GDG8sfGDrFxAVqIKnUgh-gIlDNpTG4NmW8IQGBdtYwd0uoxL5pOeUo8lbUZ593oHFhTEYDaeCSKLFv8WSaAU~sMlkM1clnUVXVQtOB3mxMYObWcHZsanK~6pK~Ar5Nimju5y5n~4xgj-9tqyQqqU6EHoNDKB4SqbPSAIkFlXG-s1BtVx-UMVtsTZPWOyxsUu34J7eU6IWo-RLEL6ZG86---8-EiXLmX70Jw__"
            alt=""
          />
          <div className="flex flex-1 flex-col justify-between p-6 absolute bottom-0">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-xl font-semibold text-white">Flexi Move</p>
              <p className="mt-3 text-base text-white font-light">
                Step into a world where fashion meets functionality with our
                latest Sneaker Collection. Designed for those who appreciate
                the perfect fusion of style and comfort, our curated selection
                of sneakers is a celebration of urban chic.
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded">
                View more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>     

      <div className="flex flex-col items-center px-4 font-bold mb-16 mx-auto">
        <p className="text-[32px] mb-16">Feature Products</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 mx-auto w-full md:w-fit">
          {items}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
