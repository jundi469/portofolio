import React from "react";

export default function Modal({ isActive, userName }) {
  return (
    <div className="aboslute md:w-full w-[20rem] right-[1rem] fixed top-0 z-0 duratio-500 pt-[2rem]">
      <div className="md:w-full">
        <div
          className={`bg-black duration-500 border-[2px] border-black ${
            isActive ? "opacity-80" : "opacity-0"
          } absolute right-0 mt-[1.5rem] mr-[1.5rem] px-[2rem] py-[1.5rem] ${
            isActive ? "transform translate-y-0" : "transform -translate-y-full"
          }`}
        >
          <p className="text-white">
            Hello {userName}, Your Message has been sent{" "}
            <span role="img" aria-label="rocket emoticon">
              🚀
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
