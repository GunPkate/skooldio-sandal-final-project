import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

import { Drawer } from "vaul";

const navMenuTextStyle =
  "text-left text-[18px] font-semibold py-3 hover:text-primary-300 active:text-primary flex justify-between items-center";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function DrawerRootByCollections(input) {
  const { collections } = useContext(UserContext);
  const title = capitalizeFirstLetter(input);

  return (
    <Drawer.NestedRoot asChild direction="left">
      <Drawer.Trigger className={navMenuTextStyle}>
        {title}
        <img src="../../src/assets/chevron.svg" className="-rotate-90" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-grey-100 flex flex-col rounded-r-xl h-full w-[400px] mt-24 fixed bottom-0 left-0">
          <div className="px-8 pt-5 bg-white h-full flex flex-col gap-2 rounded-r-xl">
            <Drawer.Trigger className="flex items-center py-1 gap-6 border-solid border-b-[1px] border-b-secondary-300">
              <img src="../../src/assets/chevron.svg" className="rotate-90" />
              <h2 className="font-bold text-2xl">All {title}</h2>
            </Drawer.Trigger>
            {collections.map((item, id) => {
              return (
                <Drawer.Trigger
                  asChild={close}
                  onClick={() => setOpen(false)}
                  className="text-left text-[18px] font-semibold py-3 hover:text-primary-300 active:text-primary flex justify-between items-center"
                >
                  <Link
                    key={id + 1}
                    to={`/Products/${item.name}/${item.permalink}`}
                    className="flex justify-between"
                  >
                    <p className={navMenuTextStyle}>{item.name}</p>
                    <img
                      src="../../src/assets/chevron.svg"
                      className="-rotate-90"
                    />
                  </Link>
                </Drawer.Trigger>
              );
            })}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.NestedRoot>
  );
}
