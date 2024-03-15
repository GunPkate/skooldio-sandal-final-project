import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar/Navbar";

function Homepage() {
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

      <div className="flex justify-center gap-10 mx-auto h-fit">
        <div className="flex flex-col w-[363px] h-96">
          <p className="font-bold text-8xl">2024</p>
          <p className="font-bold text-5xl">Collection</p>
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
            className="w-[575px] h-[500px] object-cover bg-gradient-to-t from-slate-900 to-transparent "
            src="./src/assets/img2.jpg"
          ></img>
          <div className="absolute bottom-4 px-4 flex flex-col items-center text-white ">
            <p className="font-bold text-2xl">Cozy Breeze</p>
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
            className="min-w-[575px] h-[500px] object-cover bg-gradient-to-t from-slate-900 to-transparent "
            src="./src/assets/img2.jpg"
          ></img>
          <div className="absolute bottom-4 px-4 flex flex-col items-center text-white ">
            <p className="font-bold text-2xl">Cozy Breeze</p>
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
        {/* <div>
          <img className="size-96" src="./src/assets/img3.jpg"></img>
          <p className="font-bold text-2xl">Flexi Move</p>
          <p className="font-normal text-base">
            Step into a world where fashion meets functionality with our latest
            Sneaker Collection. Designed for those who appreciate the perfect
            fusion of style and comfort, our curated selection of sneakers is a
            celebration of urban chic.
          </p>
          <button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded">
            View more
          </button>
        </div> */}
      </div>

      <div>
        Feature
        <div className="grid grid-cols-4 gap-10 mx-auto w-fit">
          <ProductCard />
        </div>
      </div>
    </>
  );
}

export default Homepage;
