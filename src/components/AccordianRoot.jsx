import { useContext, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function AccordianRoot(input) {
  const [accordianOpen, setAccordianOpen] = useState("Men");
  const { categories, collections } = useContext(UserContext);
  const gender = capitalizeFirstLetter(input);

  return (
    <div className="collapse collapse-arrow join-item">
      <input
        type="radio"
        name="my-accordion-4"
        defaultChecked={accordianOpen === input ? true : false}
        onClick={() => setAccordianOpen(input)}
      />
      <div className="collapse-title text-lg font-semibold">{gender}</div>
      <div className="collapse-content border-solid border-b-[1px] border-secondary-300 w-full">
        {input === "Men" || input === "Ladies"
          ? categories.map((item, id) => {
              if (item.permalink.toUpperCase().includes(gender.toUpperCase())) {
                return (
                  <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                    <Link
                      key={id + 1}
                      to={`/Products/${item.name}/${item.permalink}`}
                    >
                      {item.name === "Men" || item.name === "Ladies"
                        ? "All Items"
                        : item.name}
                    </Link>
                  </div>
                );
              } else {
                return null;
              }
            })
          : collections.map((item, id) => {
              return (
                <div className="h-10 text-[14px] active:bg-primary flex items-center px-[10px]">
                  <Link
                    key={id + 1}
                    to={`/Products/${item.name}/${item.permalink}`}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
      </div>
    </div>
  );
}
