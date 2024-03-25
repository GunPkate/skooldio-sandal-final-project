import { UserContext } from "../App";
import { useContext } from "react";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function DropdownRootByGender(input) {
  const { categories } = useContext(UserContext);
  const gender = capitalizeFirstLetter(input);

  return (
    <div class="dropdown dropdown-start">
      <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">
        <h2 className="font-light text-md">{gender}</h2>
      </div>
      <ul
        tabindex="0"
        class="menu dropdown-content z-[1] p-2 shadow text-secondary bg-base-100 rounded-none w-52 mt-4"
      >
        {categories.map((item, id) => {
          if (item.permalink.toUpperCase().includes(gender.toUpperCase())) {
            return (
              <li>
                <a href={`/Products/${item.name}/${item.permalink}`}>
                  {item.name}
                </a>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
