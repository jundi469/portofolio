import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";
import { Link } from "react-router-dom";
import ModalProject from "../Component/ModalProject";

import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import projectList2 from "../Data/ProjectList.json";
import { useInView } from "react-intersection-observer";
import ExperienceSection from "../Component/ExperienceSection";
import SkillsSection from "../Component/SkillsSection";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import Contact from "../Component/Contact";
import Modal from "../Component/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazySocialMedia from "../Component/LazySocialMedia";

const LazyLoad = React.lazy(() => import("../Component/LazyLoadingImage"));

export default function Main() {
  const refSumary = useRef(null);
  const refMyWork = useRef(null);
  const refExperience = useRef(null);
  const refSkills = useRef(null);
  const refContact = useRef(null);
  const [next, setNext] = useState(0);
  const [idProject, setIdProject] = useState();
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState();
  const [hoverId, setHoverId] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState();
  const containerRef = useRef(null);
  const [mobile, setMobile] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  const [userName, setUserName] = useState();
  let [activeNav, setActiveNav] = useState(false);

  const projectList = [
    {
      section1: [
        {
          id: 1,
          image: "1_w0mgia",
          width: "20rem",
          class: "inset-[9rem] w-[15rem] hover:w-[17rem]",
          name: "Persuratan Upana",
          factoryX: 0.1,
          factoryY: 0.1,
        },
        {
          id: 2,
          image: "3_rfywro",
          width: "20rem",
          class: "inset-[7rem] left-[35rem] w-[18rem] hover:w-[19rem]",
          name: "Confie.id",
          factoryX: 0.2,
          factoryY: 0.2,
        },
        {
          id: 3,
          image: "6_bwyo8b",
          width: "15rem",
          name: "Sebuah Teman",
          class: "inset-[17rem] left-[60rem] w-[15rem] hover:w-[17rem]",
          factoryX: 0.2,
          factoryY: 0.2,
        },
        {
          id: 4,
          image: "13_gbxvla",
          width: "17rem",
          class: "right-[19rem] top-[28rem] w-[15rem] hover:w-[17rem]",
          name: "TokoKu",
          factoryX: 0.4,
          factoryY: 0.4,
        },
        {
          id: 5,
          image: "6_hrk5cq",
          width: "20rem",
          class: "inset-[15rem] top-[25rem] w-[16rem] hover:w-[17rem]",
          name: "Digides FAQ",
          factoryX: 0.3,
          factoryY: 0.3,
        },
      ],
      section2: [
        {
          id: 6,
          image: "10_rr9ele",
          width: "20rem",
          class: "inset-[9rem] w-[15rem] hover:w-[17rem]",
          name: "Pisangji",
          url: "https://www.youtube.com/watch?v=9e1jGNzXI3o",
          factoryX: 0.3,
          factoryY: 0.3,
        },
        {
          id: 7,
          image: "14_glay4v",
          width: "20rem",
          class: "inset-[7rem] left-[35rem] w-[18rem] hover:w-[19rem]",
          name: "E Katalogue",
          url: "https://www.youtube.com/watch?v=9e1jGNzXI3o",
          factoryX: 0.5,
          factoryY: 0.5,
        },
        {
          id: 8,
          image: "8_j4er3d",
          width: "15rem",
          class: "inset-[18rem] left-[60rem] w-[13rem] hover:w-[17rem]",
          name: "Kampusku",
          factoryX: 0.2,
          factoryY: 0.2,
        },
        {
          id: 9,
          name: "Car Rental",
          image: "7_pa55e6",
          width: "12rem",
          class: "right-[19rem] top-[28rem] w-[15rem] hover:w-[17rem]",
          factoryX: 0.3,
          factoryY: 0.4,
        },
        {
          id: 10,
          image: "so_na_f8eeih",
          width: "20rem",
          class: "inset-[15rem] top-[25rem] w-[16rem] hover:w-[17rem]",
          name: "Personal Website",
          url: "https://www.youtube.com/watch?v=XuqTGP74ik8",
          factoryX: 0.3,
          factoryY: 0.3,
        },
      ],
    },
  ];

  // animation on scroll
  const ref1 = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref1,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.8], [1, 0]);

  // transition with motion
  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.9] };
  // slider
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 1800;
    setNext(false);
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 1800;
    setNext(true);
  };

  const handleScroll = () => {
    setNext(containerRef?.current.scrollLeft);
  };

  const handleHover = (e) => {
    const id = parseInt(e.target.id);
    setIdProject(id);
    setHoverId(parseInt(e.target.id));
  };
  const handleLeave = (e) => {
    setIdProject(null);
  };

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  // animation on view
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const animation = useAnimation();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/mobile|android|iphone/.test(userAgent));
    if (inView) {
      animation.start({
        x: 0,
        opacity: 100,
        transition: {
          type: "spring",
          duration: 2,
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      animation.start({ x: "-100vw", opacity: 0 });
    }
  }, [inView, animation]);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // scroll to component with navbar
  const clickSumary = () => {
    refSumary.current?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(false);
  };
  const clickMyWork = () => {
    refMyWork.current?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(false);
  };

  const clickExperience = () => {
    refExperience.current?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(false);
  };
  const clickSkills = () => {
    refSkills.current?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(false);
  };
  const clickContact = () => {
    refContact.current?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(false);
  };

  // navbar mobile function
  const handleNavbar = () => {
    setActiveNav(!activeNav);
  };

  const goToWhatsup = () => {
    const phoneNumber = "085241944648";
    const whatsappURL = `https://wa.me/${phoneNumber}`;

    window.open(whatsappURL, "_blank");
  };

  const modalActive = (e, name) => {
    setEmailSend(e);
    setUserName(name);
    setTimeout(() => {
      setEmailSend(false);
    }, 3000);
  };

  // make 2 section data into one data
  const section1 = projectList2[0].section1;
  const section2 = projectList2[0].section2;
  const gabung = [...section1, ...section2];

  return (
    <div className="overflow-hidden md:overflow-visible relative bg-white">
      <Modal isActive={emailSend} userName={userName} />
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
          <div className="flex space-x-5">
            <div>
              <ul className="inline-flex text-[9px] font-bold justify-between w-full z-10 space-x-5">
                <li
                  className="hover:text-[#BEBBB5] z-10 cursor-pointer duration-200"
                  id="sumary"
                  onClick={clickSumary}
                >
                  Sumary
                </li>
                <li
                  className="hover:text-[#BEBBB5] z-10 cursor-pointer duration-200"
                  id="my work"
                  onClick={clickMyWork}
                >
                  My Work
                </li>
                <li
                  className="hover:text-[#BEBBB5] z-10 cursor-pointer duration-200"
                  id="experience"
                  onClick={clickExperience}
                >
                  Experience
                </li>
                <li
                  className="hover:text-[#BEBBB5] z-10 cursor-pointer duration-200"
                  id="skills"
                  onClick={clickSkills}
                >
                  Skils
                </li>
              </ul>
            </div>
            <div
              className={`text-[9px] font-bold hover:text-[#BEBBB5] z-10 cursor-pointer duration-200 p-2 ${
                scrollPosition > 0
                  ? "bg-white text-black"
                  : "bg-black text-white"
              } `}
              id="skills"
              onClick={clickContact}
            >
              Get In Touch
            </div>
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
              activeNav
                ? "w-[.9rem] pt-[.5rem] duration-100"
                : "w-[1rem] pt-[.5rem] duration-100"
            }`}
          >
            {scrollPosition > 0 ? (
              <LazyLoadImage
                src={`${
                  activeNav
                    ? "./icon/x-white.png"
                    : "./icon/hamburger-white.png"
                } `}
                className="duration-100"
                alt=""
                onClick={handleNavbar}
              />
            ) : (
              <LazyLoadImage
                src={`${
                  activeNav ? "./icon/x-white.png" : "./icon/hamburger.png"
                }`}
                alt=""
                className="duration-100"
                onClick={handleNavbar}
              />
            )}
          </div>
        </div>
        {/* page selector mobile */}
        <div
          className={`absolute left-0 pl-[1.9rem] pt-[2rem] bg-black w-full z-[-1] transition-all duration-500 ease-in ${
            activeNav ? "top-0" : "top-[-20rem]"
          }`}
        >
          <ul className=" text-[9px] font-bold justify-between w-full z-10 space-y-[1rem] py-[1rem]">
            <li
              className="z-10 cursor-pointer duration-200 text-white"
              id="sumary"
              onClick={clickSumary}
            >
              Sumary
            </li>
            <li
              className="text-[#BEBBB5] hover:text-[#BEBBB5] z-10 cursor-pointer duration-200"
              id="my work"
              onClick={clickMyWork}
            >
              My Work
            </li>
            <li
              className="text-[#BEBBB5] hover:text-[#BEBBB5] z-10 cursor-pointer duration-200"
              id="experience"
              onClick={clickExperience}
            >
              Experience
            </li>
            <li
              className="text-[#BEBBB5] hover:text-[#BEBBB5] z-10 cursor-pointer duration-200"
              id="skills"
              onClick={clickSkills}
            >
              Skils
            </li>
            <li
              className="text-[#BEBBB5] hover:text-[#BEBBB5] z-10 cursor-pointer duration-200"
              id="skills"
              onClick={clickContact}
            >
              <button className="bg-white text-black px-[1rem] py-[.2rem]">
                Get In Touch
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* summary section */}
      <div
        ref={ref1}
        className="flex items-center justify-around realtive block md:mt-0 mt-[4rem]"
      >
        <motion.div
          style={{ opacity: opacity }}
          transition={{ delay: 2 }}
          className="absolute z-0 w-full items-center justify-around realtive md:flex hidden"
        >
          <MouseParallaxContainer
            useWindowMouseEvents
            className="flex w-full items-center justify-around paralax z-0"
            globalFactorX={0.3}
            globalFactorY={0.3}
            resetOnLeave
          >
            <div className="w-[20rem]">
              <MouseParallaxChild
                factorX={0.1}
                factorY={0.1}
                className="w-[1rem]"
              >
                <LazyLoadImage
                  alt=""
                  src="./icon/background/2.png"
                  className="ml-2 w-2"
                />
              </MouseParallaxChild>
              <MouseParallaxChild factorX={0.5} factorY={0.5}>
                <LazyLoadImage
                  alt=""
                  src="./icon/background/1.png"
                  className="pt-[7rem] w-[6rem]"
                />
              </MouseParallaxChild>
            </div>
          </MouseParallaxContainer>
        </motion.div>
        <div className="w-[80%]" ref={refSumary}>
          <div className="justify-between w-full md:pt-[5rem] block md:flex ">
            {/* socialmedia */}
            <motion.div
              className="media-social w-[10rem] md:mt-[4rem] hidden md:flex z-20"
              style={{ opacity: opacity }}
            >
              <ul className="space-y-[1rem] flex md:block">
                <li className="rounded-full w-[2rem] h-[2rem] bg-[#D9D9D9] p-2">
                  <Link to="https://www.instagram.com/agung_guntek/">
                    <Suspense fallback={<LazySocialMedia />}>
                      <LazyLoad src="./icon/instagram.png" />
                    </Suspense>
                  </Link>
                </li>
                <li className="rounded-full w-[2rem] h-[2rem] bg-[#D9D9D9] p-2">
                  <Link to="https://github.com/guntekhunter">
                    <Suspense fallback={<LazySocialMedia />}>
                      <LazyLoad src="./icon/github.png" />
                    </Suspense>
                  </Link>
                </li>
                <li className="rounded-full w-[2rem] h-[2rem] bg-[#D9D9D9] p-2">
                  <Link to="https://www.linkedin.com/in/muh-agung-haeruddin-a74018186/">
                    <Suspense fallback={<LazySocialMedia />}>
                      <LazyLoad src="./icon/linkedin.png" />
                    </Suspense>
                  </Link>
                </li>
                <li
                  onClick={goToWhatsup}
                  className="rounded-full w-[2rem] h-[2rem] bg-[#D9D9D9] p-2 cursor-pointer"
                >
                  <Suspense fallback={<LazySocialMedia />}>
                    <LazyLoad src="./icon/whatsapp.png" />
                  </Suspense>
                </li>
              </ul>
            </motion.div>

            {/* content */}
            {mobile ? (
              <div className="summary-content md:w-[40rem] w-[100%] flex">
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute w-[9rem] ml-100% right-0 md:hidden w-[100%] hight-[100%] top-[2rem] left-[12rem]"
                >
                  <LazyLoadImage
                    src="./foto.png"
                    alt="./foto.png"
                  ></LazyLoadImage>
                </motion.div>
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  className="summary-container z-10"
                >
                  <p className="hy text-[.7rem] font-light"></p>
                  <motion.p
                    // style={{ opacity: opacity }}
                    className="name text-[.7rem]"
                  >
                    Hey, I'm Agung
                    <br /> and
                  </motion.p>

                  <p className="name text-[1.9rem] font-bold lg:text-[4.8rem]">
                    I'M A
                  </p>
                  <p className="name text-[1.9rem] font-bold lg:text-[4.8rem]">
                    JUNIOR
                  </p>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ opacity: opacity }}
                className="summary-content md:w-[40rem] w-[100%] flex relative"
              >
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  className="summary-container z-10"
                >
                  <p className="hy text-[.7rem] font-light"></p>
                  <motion.p
                    style={{ opacity: opacity }}
                    className="name text-[1rem]"
                  >
                    Hey, my name is Agung
                  </motion.p>

                  <p className="name text-[2rem] font-bold lg:text-[4.8rem]">
                    I'M A
                  </p>
                  <p className="name text-[2rem] font-bold lg:text-[4.8rem]">
                    JUNIOR
                  </p>
                </motion.div>
              </motion.div>
            )}
            <motion.div className="w-[30rem]" style={{ opacity: opacity }}>
              <div className="md:flex absolute top-14 left-[45rem]">
                <LazyLoadImage
                  src="./foto.png"
                  alt=""
                  className="w-[20rem] md:flex hidden"
                ></LazyLoadImage>
              </div>
            </motion.div>
          </div>
          {mobile ? (
            <p className="name font-bold md:ml-[7.8rem] text-[1.8rem] font-bold lg:text-[4.8rem] text-[2rem] z-10">
              WEB DEVELOPER
            </p>
          ) : (
            <motion.p
              style={{ opacity: opacity }}
              className="name font-bold md:ml-[7.8rem] text-[1.8rem] font-bold lg:text-[4.8rem] text-[2rem] z-10"
            >
              WEB DEVELOPER
            </motion.p>
          )}
          {/* socialmedia mobile*/}
          <div className="media-social w-[40%] md:mt-[4rem] block md:hidden flex w-full space-x-[1.5rem] mt-[1rem]">
            <div className="rounded-full w-[2rem] h-[2rem] bg-[#D9D9D9] p-2">
              <Link to="https://www.instagram.com/agung_guntek/">
                <LazyLoadImage
                  alt=""
                  src="./icon/instagram.png"
                ></LazyLoadImage>
              </Link>
            </div>
            <div className="rounded-full w-[2rem] h-[2rem] bg-[#D9D9D9] p-2">
              <Link to="https://github.com/guntekhunter">
                <LazyLoadImage alt="" src="./icon/github.png"></LazyLoadImage>
              </Link>
            </div>
            <div className="rounded-full w-[2rem] h-[2rem] bg-[#D9D9D9] p-2">
              <Link to="https://www.linkedin.com/in/muh-agung-haeruddin-a74018186/">
                <LazyLoadImage alt="" src="./icon/linkedin.png"></LazyLoadImage>
              </Link>
            </div>
            <div
              className="rounded-full w-[2rem] h-[2rem] bg-[#D9D9D9] p-2"
              onClick={goToWhatsup}
            >
              <LazyLoadImage alt="" src="./icon/whatsapp.png"></LazyLoadImage>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="flex justify-around"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {mobile ? (
          <div className="mt-6">
            <p className="">See My Portfolio</p>
            <div className="w-full flex justify-center mt-2">
              <LazyLoadImage
                alt=""
                src="./icon/arrow.png"
                className="rotate-[90deg] w-5"
              />
            </div>
          </div>
        ) : (
          <motion.div style={{ opacity: opacity }} className="mt-6">
            <p className="">See My Portfolio</p>
            <div className="w-full flex justify-center mt-2">
              <LazyLoadImage
                alt=""
                src="./icon/arrow.png"
                className="rotate-[90deg] w-5"
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* project on mobile looks */}
      <div ref={refMyWork}>
        <div className="grid grid-cols-2 gap-5 p-[2rem] md:hidden">
          {gabung &&
            gabung.map((data) => {
              const myImage = new CloudinaryImage(data.image, {
                cloudName: "unm",
              });
              return (
                <Link to={`/portofolio/${data.id}`}>
                  <div className="relative shadow-md">
                    <div className="h-[3.8rem] overflow-hidden">
                      <AdvancedImage
                        loading="lazy"
                        cldImg={myImage}
                        alt=""
                      ></AdvancedImage>
                    </div>
                    <div className="text-[.5rem] px-[.5rem] py-[.5rem]">
                      <p className="font-bold">{data.name}</p>
                      <p className="truncate ... h-[1rem]">
                        {data.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>

        {/* all the project */}
        <section className="relative md:block hidden">
          {/* background paralax */}
          <div className="flex absolute z-0 w-full items-center justify-around realtive h-full ">
            <MouseParallaxContainer
              useWindowMouseEvents
              className="flex w-full h-full items-center justify-around paralax"
              globalFactorX={0.3}
              globalFactorY={0.3}
              resetOnLeave
            >
              <div className="w-[20rem]">
                <MouseParallaxChild
                  factorX={0.1}
                  factorY={0.1}
                  className="w-[1rem]"
                >
                  <LazyLoadImage
                    alt=""
                    src="./icon/background/2.2.png"
                    className="mt-[1rem] w-2"
                  />
                </MouseParallaxChild>
                <MouseParallaxChild factorX={0.5} factorY={0.5}>
                  <LazyLoadImage
                    alt=""
                    src="./icon/background/2.1.png"
                    className="pt-[7rem] ml-[25rem] w-[5rem]"
                  />
                </MouseParallaxChild>
              </div>
              <div className="w-[20rem]">
                <MouseParallaxChild
                  factorX={0.1}
                  factorY={0.1}
                  className="w-[1rem]"
                >
                  <div className="w-[10rem] h-[15rem]">
                    <MouseParallaxChild factorX={0.1} factorY={0.1}>
                      <LazyLoadImage
                        alt=""
                        src="./icon/background/2.2.png"
                        className="mt-[-14rem] ml-[15rem] w-2"
                      />
                    </MouseParallaxChild>
                    <MouseParallaxChild factorX={0.5} factorY={0.5}>
                      <LazyLoadImage
                        alt=""
                        src="./icon/background/2.1.png"
                        className="mt-[2rem] ml-[8rem] w-[5rem]"
                      />
                    </MouseParallaxChild>
                  </div>
                </MouseParallaxChild>
                <MouseParallaxChild factorX={0.1} factorY={0.5}>
                  <LazyLoadImage
                    alt=""
                    src="./icon/background/2.2.png"
                    className="ml-[15rem] mt-[5rem] w-[.51rem]"
                  />
                </MouseParallaxChild>
              </div>
            </MouseParallaxContainer>
          </div>
          <div
            className={`hover:opacity-100 opacity-0 duration-500 absolute left-[-1.5rem] grid content-center h-[75%] align-center z-10 p-[1rem] ${
              next >= 1296 ? "border-[#353435]" : "hidden duration-200"
            } cursor-pointer transition ease-in-out hover:translate-x-5`}
            onClick={slideLeft}
          >
            <LazyLoadImage
              alt=""
              src="./icon/arrow.png"
              className="w-[1rem] h-[100%] bg-red rotate-180"
            />
          </div>
          <div
            id="slider"
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-scroll scroll whitespace-nowrap hover:overflow-x-scroll scrollbar-hide scroll-smooth"
          >
            <div>
              <div ref={ref}>
                <motion.div
                  className="container w-[100vw] h-[120vh] relative"
                  animate={animation}
                >
                  <MouseParallaxContainer
                    useWindowMouseEvents
                    className="flex w-full h-full items-center justify-around paralax "
                    globalFactorX={0.3}
                    globalFactorY={0.3}
                    resetOnLeave
                  >
                    {projectList.map((item) =>
                      item.section1.map((data, key) => {
                        const myImage = new CloudinaryImage(data.image, {
                          cloudName: "unm",
                        });

                        return (
                          <MouseParallaxChild
                            key={key}
                            factorX={data.factoryX}
                            factorY={data.factoryY}
                            width={data.width}
                            className={`absolute ${data.class} ease-out duration-500`}
                          >
                            <Link
                              to={`/portofolio/${data.id}`}
                              state={data.width}
                            >
                              <motion.div
                                exit={hoverId !== data.id && { opacity: 0 }}
                                className="w-full relative cursor-pointer bg-gray-200"
                                id={data.id}
                                onMouseEnter={handleHover}
                                onMouseLeave={handleLeave}
                              >
                                <AdvancedImage
                                  loading="lazy"
                                  cldImg={myImage}
                                  className="border-[#353435] border-dashed border-[2px] relative hover:border-dashed hover:opacity-70 duration-500"
                                />
                                <p
                                  className={`${
                                    idProject === data.id
                                      ? "flex duration-500"
                                      : "hidden"
                                  } absolute ease-out left-[50%] top-[50%] z-0 text-[.6rem] bg-black text-white duration-300 px-2`}
                                >
                                  {data.name}
                                </p>
                              </motion.div>
                            </Link>
                          </MouseParallaxChild>
                        );
                      })
                    )}
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ transition }}
                      className="text-container h-full flex items-center justify-around text-right"
                    >
                      <div className="text-[2rem] ml-[15rem] mt-[1rem] border-b-[2px] border-[#353435]">
                        <p className="">SOME OF</p>
                        <p className="font-bold">MY WORK.</p>
                      </div>
                    </motion.div>
                  </MouseParallaxContainer>
                </motion.div>
              </div>
            </div>
            <div>
              <div className="container w-[100vw] h-[120vh] relative">
                <MouseParallaxContainer
                  useWindowMouseEvents
                  className="flex w-full h-full items-center justify-around paralax"
                  globalFactorX={0.3}
                  globalFactorY={0.3}
                  resetOnLeave
                >
                  {projectList.map((item) =>
                    item.section2.map((data, key) => {
                      const myImage = new CloudinaryImage(data.image, {
                        cloudName: "unm",
                      });
                      return (
                        <MouseParallaxChild
                          key={key}
                          factorX={data.factoryX}
                          factorY={data.factoryY}
                          width={data.width}
                          className={`absolute ${data.class} ease-out duration-500`}
                        >
                          <Link
                            to={`/portofolio/${data.id}`}
                            state={data.width}
                          >
                            <motion.div
                              exit={hoverId !== data.id && { opacity: 0 }}
                              className="w-full relative cursor-pointer bg-gray-200"
                              id={data.id}
                              onMouseEnter={handleHover}
                              onMouseLeave={handleLeave}
                            >
                              <AdvancedImage
                                loading="lazy"
                                cldImg={myImage}
                                className="border-[#353435] border-dashed border-[2px] relative hover:border-dashed hover:opacity-70 duration-500"
                              />
                              <p
                                className={`${
                                  idProject === data.id
                                    ? "flex duration-500"
                                    : "hidden"
                                } absolute ease-out left-[50%] top-[50%] z-0 text-[.6rem] bg-black text-white duration-300 px-2`}
                              >
                                {data.name}
                              </p>
                            </motion.div>
                          </Link>
                        </MouseParallaxChild>
                      );
                    })
                  )}
                </MouseParallaxContainer>
              </div>
            </div>
          </div>
          <div
            className={`hover:opacity-100 opacity-0 duration-500 absolute padding-auto grid content-center left-[76rem] h-[85%] top-0 flex justify-around align-center p-[1rem] ${
              next >= 1296 ? "hidden duration-200" : "border-[#353435]"
            }  cursor-pointer`}
            onClick={slideRight}
          >
            <LazyLoadImage
              alt=""
              src="./icon/arrow.png"
              className="w-[1rem] h-[1rem]"
            />
          </div>
          <div className="container w-full items-center justify-around flex">
            <div className="w-[85%]">
              <div className="grid justify-items-end">
                <ul className="flex gap-x-5">
                  <li
                    className={`${
                      next ? "text-[#D9D9D9]" : "text-[#353435]"
                    } duration-200`}
                  >
                    01
                  </li>
                  <li
                    className={`${
                      !next ? "text-[#D9D9D9]" : "text-[#353435]"
                    } duration-200`}
                  >
                    02
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ModalProject
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        id={id}
      />
      {/* expirience section */}
      <div ref={refExperience} className="pt-[3rem]">
        <ExperienceSection />
      </div>

      {/* skills section */}
      <div ref={refSkills}>
        <SkillsSection />
      </div>

      {/* contact section */}
      <div ref={refContact} className="z-10">
        <Contact callback={modalActive} />
      </div>
    </div>
  );
}
