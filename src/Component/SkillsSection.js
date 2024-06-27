import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import toolsList from "../Data/Tools.json";

export default function SkillsSection({ ref }) {
  const languange = toolsList[0].langguange;
  const library = toolsList[1].library;
  const frameworks = toolsList[2].frameworks;
  const other = toolsList[3].other;

  const ref1 = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref1,
    offset: ["end end", "start end"],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.9], [1, 0]);
  return (
    <section
      // ref={ref1}
      ref={ref}
      className="flex justify-around w-full pb-[5rem] pt-[2rem]"
    >
      <motion.div style={{ opacity: opacity }} className=" w-[80%]">
        <h1 className="text-[1.8rem] font-bold flex justify-center">
          TOOLS & SKILLS
        </h1>
        <div className="mt-6">
          <div className="grid w-full bg-black place-content-center">
            <p className="font-light text-white w-[50%]">Languange</p>
          </div>
          <div className="grid grid-cols-4 border-[.1rem] border-black row-span-3 py-4 gap-y-3">
            {/* will be change with looping */}
            {languange &&
              languange.map((data, key) => (
                <div className="flex justify-around">
                  <div className="flex space-x-1 text-[.8rem] font-bold">
                    <div className="grid content-center">
                      <p>{data.name}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex bg-black text-white font-lilght bg-white gap-[.1rem]">
            <div className="grid place-content-center bg-black w-[50%]">
              Library's
            </div>
            <div className="grid place-content-center bg-black w-[50%] border-r-[.1rem] border-black">
              Frameworks
            </div>
          </div>
          <div className=" grid grid-cols-2 bg-black text-white font-bold bg-black gap-[.1rem]">
            <div className="grid grid-cols-2 bg-white border-l-[.1rem] border-black text-black py-3 gap-y-3">
              {library &&
                library.map((data, key) => (
                  <div className="flex justify-around">
                    <div className="flex space-x-1 text-[.8rem] font-bold">
                      <div className="grid content-center">
                        <p>{data.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-2 bg-white border-r-[.1rem] border-black text-black py-3 gap-y-3">
              {frameworks &&
                frameworks.map((data, key) => (
                  <div className="flex justify-around">
                    <div className="flex space-x-1 text-[.8rem] font-bold">
                      {/* <div className="flex content-center flex-wrap ">
                          <img
                            src="./icon/github.png"
                            alt=""
                            className="w-[.7rem] h-[.71rem] mt-[-.1rem]"
                          ></img>
                        </div> */}
                      <div className="grid content-center">
                        <p>{data.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="grid w-full bg-black place-content-center">
            <p className="font-light text-white">Other</p>
          </div>

          <div className="grid grid-cols-4 border-[.1rem] border-black row-span-3 py-3 gap-y-3">
            {/* will be change with looping */}
            {other &&
              other.map((data, key) => (
                <div className="flex justify-around">
                  <div className="flex space-x-1 text-[.8rem] font-bold">
                    {/* <div className="flex content-center flex-wrap ">
                        <img
                          src="./icon/github.png"
                          alt=""
                          className="w-[.7rem] h-[.71rem] mt-[-.1rem]"
                        ></img>
                      </div> */}
                    <div className="grid content-center">
                      <p>{data.name}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
