import React, { Suspense, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import projectList from "../Data/ProjectList.json";
import YouTube from "react-youtube";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import YoutubeFallback from "../Component/YoutubeFallback";
// import YoutubeVideo from "../Component/YoutubeVideo";

const YoutubeVideo = React.lazy(() => import("../Component/YoutubeVideo"));

export default function Portofolio() {
  const [scrollPosition, setScrollPosition] = useState();
  const [data, setData] = useState();
  const [videoId, setVideoId] = useState();
  let [activeNav, setActiveNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // get the id base on project that was clicked
  const id = useParams();
  const location = useLocation();

  // auto scroll from top using useScroll from motion
  const { scrollY } = useScroll();

  // transition duration for motion animation
  const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

  // method to automate a scroll from top after changging page
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  // get data from json file base on id that was passing from previous page
  const section1 = projectList[0].section1;
  const section2 = projectList[0].section2;
  const gabung = [...section1, ...section2];

  useEffect(() => {
    const selected = gabung.filter((data) => data.id === parseInt(id.id));
    setData(selected);
  }, [projectList, id]);

  // react youtube
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };
  const optsMobile = {
    height: "180",
    width: "320",
    playerVars: {
      autoplay: 0,
    },
  };

  React.useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/mobile|android|iphone/.test(userAgent));
    const getVideo = async () => {
      const dataUrl = data[0].url;
      const idVideo = dataUrl.split("v=")[1];
      setVideoId(idVideo);
      setIsLoading(false);
    };
    getVideo();
  }, [data]);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="overflow-hidden md:overflow-visible bg-white"
    >
      {/* navbar */}
      {/* navbar desktop*/}
      <motion.div
        className={`flex items-center justify-around text-[#353435] z-50 sticky top-0 ${
          scrollPosition > 0
            ? "bg-black duration-500 text-white"
            : "duration-500"
        } `}
      >
        <nav className="md:flex items-center justify-between w-[80%] h-[1rem] realtive z-10 py-5 hidden">
          <div>
            <h1 className="font-bold text-[15px]">AGUNG</h1>
          </div>
          <div className="w-[30%] relative">
            <Link to="/">
              <p
                className="text-[9px] font-bold z-10 cursor-pointer duration-200 absolute right-0 top-[-.4rem]"
                id="sumary"
              >
                BACK
              </p>
            </Link>
          </div>
        </nav>
      </motion.div>
      {/* navbar mobile */}
      <nav
        className={`justify-around flex fixed top-0 right-0 left-0 md:hidden z-50 ${
          scrollPosition > 0
            ? "bg-black duration-500 text-white"
            : "duration-500"
        } h-[2.5rem] `}
      >
        <div className="w-[80%] justify-between flex pt-[.5rem]">
          <div
            className={`${
              activeNav ? "text-white duration-100 ease-in" : ""
            } font-bold`}
          >
            <p>AGUNG</p>
          </div>
          <div
            className={`${
              activeNav ? "text-white duration-100 ease-in" : ""
            } font-bold`}
          >
            <Link to="/">BACK</Link>
          </div>
        </div>
        {/* page selector mobile */}
        <div
          className={`absolute left-0 pl-[1.9rem] pt-[2rem] bg-black w-full z-[-1] transition-all duration-500 ease-in ${
            activeNav ? "top-0" : "top-[-20rem]"
          }`}
        >
          <ul className=" text-[9px] font-bold justify-between w-full z-10 space-y-[1rem] py-[1rem]">
            <Link
              to="/"
              className="z-10 cursor-pointer duration-200 text-white"
              id="sumary"
            >
              Sumary
            </Link>
          </ul>
        </div>
      </nav>
      {/* section 1 */}
      <div className="grid w-full justify-items-center relative md:h-[100%] h-[20rem]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="m-4"
        >
          {data &&
            data.map((item, key) => (
              <h1
                className="md:text-[5rem] text-[2rem] font-bold pt-[2rem] md:mt-0 text-center"
                key={key}
              >
                {item.name.toUpperCase()}
              </h1>
            ))}
        </motion.div>
        <div className="w-full grid justify-items-center">
          <motion.div
            initial={{ y: "-50%", width: location.state }}
            animate={{
              y: 0,
              width: "100%",
              height: window.innerWidth > 1440 ? 400 : 700,
              transition: { delay: 0.1, ...transition },
            }}
          >
            <div className="" />
            {data &&
              data.map((item, key) => {
                const myImage = new CloudinaryImage(item.image, {
                  cloudName: "unm",
                });
                return <AdvancedImage cldImg={myImage} />;
              })}
          </motion.div>
        </div>
      </div>

      {/* section 2 */}
      <div className="grid content-around justify-items-center py-[5rem] bg-black text-white">
        <div className="w-[80%] md:grid md:grid-cols-2 md:gap-8">
          <div className="grid content-center mb-[2rem] md:mb-0">
            <div className="grid content-center  ">
              <p className="grid content-center font-bold text-[2rem]">
                About This Project
              </p>
            </div>
          </div>
          <div className="">
            {data &&
              data.map((item, key) => <p key={key}>{item.description}</p>)}
          </div>
        </div>
      </div>
      {/* section 3 */}
      <div className="grid content-around justify-items-center py-9">
        <div className="md:w-[80%] w-[20rem]">
          <div className="grid content-center">
            <div className="flex justify-around">
              <p className="grid content-center font-bold text-[2rem] pb-[2rem]">
                DEMO
              </p>
            </div>
          </div>
          <div className="flex justify-around">
            {isMobile ? (
              <Suspense fallback={<YoutubeFallback />}>
                <YoutubeVideo id={videoId} opts={optsMobile} />
              </Suspense>
            ) : (
              <Suspense fallback={<YoutubeFallback />}>
                <YoutubeVideo id={videoId} opts={opts} />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
