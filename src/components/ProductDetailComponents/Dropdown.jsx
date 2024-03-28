import React, { useState } from "react";

const Dropdown = () => {
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectItem = (value) => {
    setQuantity(value);
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn flex justify-between px-2.5 rounded-none w-[343px] h-[54px] lg:w-[139px] lg:h-[54px] bg-white border-secondary-300"
        onClick={toggleDropdown}
      >
        {quantity}
        {/* SVG icon */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.5878 22.5137L14.7448 16.6705C14.385 16.3108 13.8031 16.3102 13.4444 16.6689C13.0833 17.0301 13.0865 17.6098 13.446 17.9693L19.9368 24.4601C19.937 24.4604 19.9373 24.4606 19.9376 24.4609C19.9379 24.4612 19.9381 24.4614 19.9384 24.4618C20.1187 24.642 20.3535 24.7316 20.5881 24.7312C20.8234 24.7303 21.0581 24.6408 21.2372 24.4618C21.2374 24.4614 21.2378 24.4612 21.238 24.4609C21.2383 24.4606 21.2385 24.4604 21.2388 24.4601L27.7298 17.9693C28.0895 17.6096 28.0901 17.0276 27.7314 16.6689C27.3702 16.3077 26.7904 16.3109 26.431 16.6705L20.5878 22.5137Z"
            fill="#222222"
          />
        </svg>
      </div>

      {/* fix this */}
      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] flex flex-col items-center shadow bg-base-100 rounded-none w-full"
        >
          {[...Array(10).keys()].map((number) => (
            <li
              key={number + 1}
              className={`flex justify-start items-center w-full text-center py-1 cursor-pointer h-[54px] px-[10px] hover:bg-secondary-100 ${
                number < 9 ? "border-b border-gray-100" : ""
              }`} // border between 1-9
              onClick={() => selectItem(number + 1)}
            >
              {number + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
