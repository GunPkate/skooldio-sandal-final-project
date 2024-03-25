import { UserContext } from "../App";
import { useContext } from "react";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function DropdownRootByCollections(input) {
  const { collections } = useContext(UserContext);
  const title = capitalizeFirstLetter(input);

  return (
    <div class="dropdown dropdown-start">
      <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">
        <h2 className="font-light text-md">All {title}</h2>
      </div>
      <ul
        tabindex="0"
        class="menu dropdown-content z-[1] p-2 shadow text-secondary bg-base-100 rounded-none w-52 mt-4"
      >
        {collections.map((item) => {
          return (
            <li>
              <a href={`/Products/${item.name}/${item.permalink}`}>
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
