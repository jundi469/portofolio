import React, { useEffect } from "react";
import projectList from "../Data/ProjectList.json";

export default function ModalProject({ isVisible, onClose, id }) {
  if (isVisible === false) return null;

  const handleBack = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 backdrop-blur-sm z-10 justify-center items-center"
      id="wrapper"
      onClick={handleBack}
    >
      <div className="relative">
        <div className="flex items-center justify-around text-[#353435] z-10">
          <nav className="flex items-center justify-between w-[80%] h-[3rem] realtive">
            <div>
              <h1 className="font-bold text-[20px]">AGUNG</h1>
            </div>
            <div className="w-[30%]">
              <ul className="inline-flex text-[12px] font-bold justify-between w-full">
                <li>SUMMARY</li>
                <li className="text-[#BEBBB5] hover:text-[#353435]">MY WORK</li>
                <li className="text-[#BEBBB5]">EXPERIENCE</li>
                <li className="text-[#BEBBB5]">SKILLS</li>
              </ul>
            </div>
            <div className="absolute right-0 w-[31rem] border-b-[2px] h-[3rem]" />
          </nav>
        </div>
        <div className="flex flex-coll justify-center items-center">
          {/* <div className="absolute w-[100%] h-[70rem] rounded-b-full bg-gray-200"></div> */}
          <div className="w-20 flex flex-col">
            <button
              className="text-white text-xl place-self-end"
              onClick={() => onClose()}
            >
              X
            </button>
            {projectList.map((item) =>
              item.section1.map((data, key) => (
                <div key={key}>{id === data.id && <div>ahhay</div>}</div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
