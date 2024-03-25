import { UserContext } from "../App";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function DropdownRootByGender(input) {
  const checkCurrPage = () => {
    const highlight = " text-primary-700";
    const location = useLocation();
    const currPage = location.pathname.split("/")[3];
    if (currPage !== undefined && currPage.includes(input)) {
      return highlight;
    }
  };

  const { categories } = useContext(UserContext);
  const gender = capitalizeFirstLetter(input);

  return (
    <div className="dropdown dropdown-start">
      <div tabIndex="0" role="button" className="btn btn-ghost rounded-btn">
        <h2 className={"font-light text-md" + checkCurrPage()}>{gender}</h2>
      </div>
      <ul
        tabIndex="0"
        className="dropdown-content z-[1] p-2 shadow text-secondary bg-base-100 rounded-none w-52 mt-4 flex flex-col"
      >
        {categories.map((item, id) => {
          if (item.permalink.toUpperCase().includes(gender.toUpperCase())) {
            return (
              <Link
                key={item.name}
                to={`/Products/${item.name}/${item.permalink}`}
                className={
                  "py-2 px-4 rounded-lg hover:bg-secondary-100 hover:text-primary-700 active:text-primary active:bg-base-100"
                }
              >
                {item.name}
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
}
