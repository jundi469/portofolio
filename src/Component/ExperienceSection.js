import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import Experience from "./Experience";

export default function ExperienceSection() {
  const ref1 = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref1,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  return (
    <section ref={ref1} className="flex justify-around w-full pb-[5rem]">
      <motion.div style={{ opacity: opacity }} className="w-[80%]">
        <div>
          <h1 className="text-[1.8rem] font-bold">EXPIRIENCE</h1>
        </div>
        <div className="md:grid grid-cols-2 md:gap-14 mt-[2rem] w-[100%] space-y-[2rem] md:space-y-0">
          <Experience
            date="Oct 12 2022 - Jan 12 2023"
            name="Frotend Developer Intern"
            item="Colaborate with three other intern consist of, product manager, ui/ux designer, and backend developer, as frontend developer to 
            developing mailing website that can facilitate the correspondence process at upana studio, within three mounths & Responsible to code six pages interface on the confie.id website along with configuration with the API, using react, tailwind, axios within three mounths"
          />
          <Experience
            date="Jan 4 2021 - Feb 26 2021"
            name="Frotend Developer Intern"
            item="Work as Frontend Developer to create FAQ pages for Digides Website within one mount and 22 days"
          />
        </div>
        <div className="pt-[2rem]">
          <a
            className="cursor-pointer bg-black md:w-[15rem] text-white justify-center flex py-[.5rem] w-full"
            href="CV Agung.pdf"
            download="CV Agung.pdf"
          >
            Download CV
          </a>
        </div>
      </motion.div>
    </section>
  );
}
