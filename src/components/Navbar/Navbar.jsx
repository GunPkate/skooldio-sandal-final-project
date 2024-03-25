import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import "./navbar.css";

import { Drawer } from "vaul";
import DrawerRootByGender from "../DrawerRootByGender.jsx";
import DrawerRootByCollections from "../DrawerRootByCollections.jsx";
import DropdownRootByGender from "../DropdownRootByGender.jsx";
import DropdownRootByCollections from "../DropdownRootByCollections.jsx";

export default function Navbar() {
  const { userPurhcase } = useContext(UserContext);

  const navItemStyle = "text-white ml-6 text-base my-auto bg-black";
  const contentStyle = "flex items-center text-white ";
  const navMenuTextStyle =
    "text-left text-[18px] font-semibold py-3 hover:text-primary-300 active:text-primary flex justify-between items-center";
  const cart = `
    <svg width="40px" height="40px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fcfcfc" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>    `;

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div
      className={
        "bg-fixed bg-black lg:h-[60px] h-[56px]  w-full px-[max(8.34%,16px)] justify-between fixed top-0 z-30 " +
        contentStyle
      }
    >
      {/* MOBILE */}
      <Drawer.Root
        direction="left"
        open={openDrawer}
        onOpenChange={setOpenDrawer}
      >
        <Drawer.Trigger asChild className="lg:hidden">
          <img src="../../src/assets/hamburger.svg" />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-white flex flex-col rounded-r-xl h-full w-[400px] mt-24 fixed bottom-0 left-0">
            <div className="px-8 pt-5 bg-white h-full flex flex-col gap-2 rounded-r-xl">
              <Link className={navMenuTextStyle} to={"/"}>
                Home
              </Link>

              {DrawerRootByGender("men")}
              {DrawerRootByGender("ladies")}
              {DrawerRootByCollections("collections")}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* DESKTOP */}
      <div className="hidden lg:flex">
        <Link className="btn btn-ghost rounded-btn font-light text-md" to={"/"}>
          Home
        </Link>

        {DropdownRootByGender("men")}
        {DropdownRootByGender("ladies")}
        {DropdownRootByCollections("collections")}
      </div>

      <div className={contentStyle}>
        <Link className={navItemStyle} to={"/Mycart"}>
          <div className="flex">
            <div className="relative">
              <span className="absolute m-auto left-0 top-0.25 right-0 text-pink-600 text-xl text-center font-bold">
                {userPurhcase.length}
              </span>
              <span dangerouslySetInnerHTML={{ __html: `${cart}` }}></span>
            </div>
            <span
              style={{
                height: "15px",
                width: "15px",
                background: "red",
                borderRadius: "50%",
                display: "inlineBlock",
                color: "red",
                opacity: `${userPurhcase.length > 0 ? 1 : 0.1}`,
                overflow: "hidden",
              }}
            >
              x
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
