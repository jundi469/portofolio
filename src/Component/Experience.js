import React, { useState } from "react";

export default function Experience({ date, name, item }) {
  const [active, setActive] = useState(false);

  // dropdown
  const dropDown = () => {
    setActive(!active);
  };
  return (
    <div
      className="text-[.73rem] md:w-full cursor-pointer md:flex block"
      onClick={dropDown}
    >
      <div className="flex w-[100%] align-center">
        <p className="date w-full mt-[.2rem]">{date}</p>
      </div>
      <div className="content flex">
        <div>
          <p className="title text-[1rem] font-bold">{name}</p>
          <div className="flex space-x-2">
            <p
              className={`description md:w-[18rem] w-[16rem] ${
                active
                  ? `duration-500`
                  : `truncate overflow-hidden pr-2 duration-500`
              }`}
            >
              {item}
            </p>
          </div>
        </div>
        <div className="w-2 h-full pt-[1.8rem]">
          <img
            alt=""
            src="./icon/arrow.png"
            className={`-rotate-90 w-[1rem] ${
              active ? `rotate-90 duration-300` : `-rotate-90 duration-300`
            }`}
          ></img>
        </div>
      </div>
    </div>
  );
}
