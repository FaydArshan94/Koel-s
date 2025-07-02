import { motion, useAnimation, useMotionValue } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

const liveCards = [
  {
    img: "https://images.unsplash.com/photo-1736754074555-54b6abcb2fb4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    followers: "12.3k",
    name: "Aisha Verma",
  },
  {
    img: "https://images.unsplash.com/photo-1699693592017-4d59ecf2c282?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    followers: "8.7k",
    name: "Priya Singh",
  },
  {
    img: "https://images.unsplash.com/photo-1709033787737-0c8b1631e748?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    followers: "15.1k",
    name: "Meera Patel",
  },
  {
    img: "https://images.unsplash.com/photo-1701170069071-ceac88e41d43?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    followers: "21.4k",
    name: "Rohan Malhotra",
  },
  {
    img: "https://images.unsplash.com/photo-1741675121314-e46ce22a17d1?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    followers: "9.2k",
    name: "Simran Kaur",
  },
  {
    img: "https://images.unsplash.com/photo-1658722449397-0f2e9db9d3a4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    followers: "5.8k",
    name: "Arjun Desai",
  },
  {
    img: "https://images.unsplash.com/photo-1729529886854-1a7fe529ce22?q=80&w=415&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "/video.mp4",
    followers: "13.6k",
    name: "Neha Joshi",
  },
];

const repeatedCards = [...liveCards, ...liveCards, ...liveCards]; // Triplet

const Hero = ({ shouldAnimate }) => {
  const containerRef = useRef();
  const section1Ref = useRef();
  const section2Ref = useRef(); // Add this ref
  // Add this ref
  const x = useMotionValue(0);

  // Width of one full image set
  const singleWidth = liveCards.length * 360; // 360px = approx card width + gap

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial scroll position to middle set
    container.scrollLeft = singleWidth;
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    // If scroll too far left, jump to center
    if (container.scrollLeft <= singleWidth * 0.25) {
      container.scrollLeft += singleWidth;
    }

    // If scroll too far right, jump to center
    if (container.scrollLeft >= singleWidth * 1.75) {
      container.scrollLeft -= singleWidth;
    }
  };

  // Typing effect for the intro paragraph
  const fullText =
    "Koel's Fashion is a live or niche event, brand or collection that has emerged after recent trends.";
  const [typedText, setTypedText] = useState(shouldAnimate ? "" : fullText);

  useEffect(() => {
    if (!shouldAnimate) {
      setTypedText(fullText);
      return;
    }
    let i = 0;
    let raf;
    let startTimeout = setTimeout(type, 0);

    function type() {
      setTypedText(fullText.slice(0, i + 60));
      i++;
      if (i < fullText.length) {
        raf = setTimeout(type, 60);
      }
    }

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(raf);
    };
  }, [shouldAnimate, fullText]);

  return (
    <div className="w-full flex flex-col items-center  select-none sm:py-10 py-0 min-h-screen">
      {/* Section 1 */}
      <section className="section-1 flex flex-col  gap-0  md:flex-row items-center md:items-center sm:justify-between  sm:w-full md:px-6   md:gap-0 h-auto md:h-[20vh]">
        <motion.p
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full md:w-[17%] text-left hidden sm:block text-xs sm:text-sm text-zinc-400 font-semiboldbold"
        >
          {typedText}
          <span className="animate-pulse">|</span>
        </motion.p>
        <div className="relative  hidden  line w-full md:w-[28%] sm:h-16 md:h-32 sm:flex items-center justify-center md:mt-0">
          <div className="flex items-center justify-between h-full w-full">
            <motion.div
              initial={shouldAnimate ? { scaleX: 0 } : false}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="absolute top-1/2 left-0 w-[38%] border-t border-zinc-300"
              style={{ originX: 0 }}
            ></motion.div>
            <motion.div
              initial={shouldAnimate ? { scaleX: 0 } : false}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="absolute top-1/2 right-0 w-[38%] border-t border-zinc-300"
              style={{ originX: 1 }}
            ></motion.div>
          </div>
          <div className="flex items-center absolute justify-center gap-2 md:gap-[1.1rem] z-10 left-1/2 -translate-x-1/2">
            <motion.div
              initial={shouldAnimate ? { y: "-200vh" } : false}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.1 }}
              className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform rounded-full border-1 border-zinc-300 bg-white z-10"
            ></motion.div>
            <motion.div
              initial={shouldAnimate ? { y: "-200vh" } : false}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.1 }}
              className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform rounded-full border-1 border-zinc-300 bg-white z-20 -ml-4 md:-ml-8"
            ></motion.div>
            <motion.div
              initial={shouldAnimate ? { y: "-200vh" } : false}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.1 }}
              className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform rounded-full border-1 border-zinc-300 bg-white z-30 -ml-4 md:-ml-8"
            ></motion.div>
          </div>
        </div>
        <div className="the relative  overflow-hidden  md:h-[10rem] items-center  flex sm:items-end sm:mt-4 md:mt-0">
          <motion.h1
            initial={shouldAnimate ? { y: "100%", opacity: 0 } : false}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0 }}
            className="text-[4.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[10rem] text-zinc-900 tracking-tighter font-[MonaSans] leading-none"
            style={{ willChange: "transform" }}
          >
            THE
          </motion.h1>
        </div>
      </section>

      {/* Section 2 */}
      <section className="section-2 -top-5 h-24 origin-top relative sm:flex sm:items-center sm:justify-around sm:px-4 sm:gap-10 sm:pl-40 p-0 sm:h-40 ">
        <motion.h1
          initial={shouldAnimate ? { y: "100%", opacity: 0 } : false}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} // Add delay here
          className="ULTIMATE text-[4rem]   sm:text-[10.5rem] sm:tracking-wider sm:w-90%   font-medium text-zinc-950 font-[PlayfairDisplay]"
        >
          ULTIMATE{" "}
        </motion.h1>
        <p className="text-xs hidden sm:block  text-zinc-500 pt-16 font-bold leading-[23px] font-[MonaSans]">
          Sense of poise, good manners, and a graceful presence.
        </p>
      </section>

      {/* Section 3 */}
      <section className="section-3 relative mt-20 h-[65vh] w-full select-none sm:flex sm:justify-between sm:gap-4 sm:mt-0 sm:relative sm:w-full sm:h-[250vh]                     sm:rounded-[3rem] sm:border-[0.5px] sm:border-zinc-100 sm:bg-gradient-to-bl sm:from-transparent sm:via-[#f8f8f8] sm:to-[#96f47f] sm:shadow-gray-950">
        {/* FASHION Heading */}

        <motion.h1
          initial={shouldAnimate ? { y: "100%", opacity: 0 } : false}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="fashion  text-[4.5rem]    text-center    -top-32     sm:text-[10rem] sm:tracking-tight absolute sm:font-[MonaSans] left-1/2 -translate-x-1/2 sm:-top-10 sm:text-zinc-950"
          style={{ willChange: "transform" }}
        >
          FASHION
        </motion.h1>

        {/* iPhone Image */}

        <motion.img
          initial={shouldAnimate ? { y: 100, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.5 }}
          className="absolute   h-[70vh] w-[70vw]  -top-20 left-1/2 -translate-x-1/2          sm:h-[250vh] sm:left-1/2 sm:-translate-x-1/2 z-8 sm:w-[60%] select-none sm:-top-15 sm:scale-[80%]"
          src="src/assets/Iphone.png"
          alt=""
        />

        {/* Floating Quotes */}
        <div ref={section1Ref} className="w-1/3  hidden sm:block  h-1/3 ">
          <motion.div
            drag
            dragConstraints={section1Ref}
            className="absolute z-20 rounded-xl shadow-md p-4 text-zinc-700 text-sm font-semibold w-[15vw]"
            style={{
              top: "30vh",
              left: "2vw",
              zIndex: 20,
            }}
          >
            Fashion is art, style is your personal expression.
          </motion.div>

          <motion.div
            drag
            dragConstraints={section1Ref}
            className="absolute z-20 rounded-xl shadow-md p-4 text-zinc-700 text-sm font-semibold w-[15vw]"
            style={{
              top: "60vh",
              left: "10vw",
              zIndex: 20,
            }}
          >
            Where your fashion journey begins.
          </motion.div>
        </div>

        <div ref={section2Ref} className="w-1/3 hidden  sm:block h-1/3 ">
          <motion.div
            drag
            dragConstraints={section2Ref}
            className="absolute z-20 bg-white/80 rounded-xl   flex flex-col gap-4 shadow-md p-4 text-zinc-700 text-sm font-semibold w-[20vw]"
            style={{
              top: "40vh",
              right: "0",
              zIndex: 20,
            }}
          >
            <span>01</span>
            <p>Elegance is not standing out, but being remembered.</p>
          </motion.div>

          <motion.div
            drag
            dragConstraints={section2Ref}
            className="absolute z-20 bg-white/80 rounded-xl   flex flex-col gap-4 shadow-md p-4 text-zinc-700 text-sm font-semibold w-[20vw]"
            style={{
              top: "65vh",
              right: "0",
              zIndex: 20,
            }}
          >
            <span>02</span>
            <p>Trends fade, but true style is eternal and unique.</p>
          </motion.div>
        </div>

        <div className="w-[70vw] h-[40vh] absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-between">
          <motion.img
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 2.8 }}
            className="h-40 absolute bottom-24 left-20 z-0"
            src="src/assets/arrow-left.png"
            alt=""
          />
          <motion.img
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 2.95 }}
            className="h-40 absolute -top-32 right-16 z-0"
            src="src/assets/arrow-right.png"
            alt=""
          />
        </div>

        <div className="w-[80vw] h-[40vh] absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-between">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 3.5 }}
            className="h-16 hover:scale-105 transition-transform duration-500 absolute left-0 top-10 z-[1]"
            src="src/assets/app-store.png"
            alt=""
          />
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 3.5 }}
            className="w-40 hover:scale-[130%] scale-125 transition-transform duration-500 absolute right-0 top-10 z-[1]"
            src="src/assets/google-play.png"
            alt=""
          />
        </div>

        <motion.div
          ref={containerRef}
          onScroll={handleScroll}
          onMouseDown={(e) => {
            containerRef.current.isDown = true;
            containerRef.current.classList.add("cursor-grabbing");
            containerRef.current.startX =
              e.pageX - containerRef.current.offsetLeft;
            containerRef.current.scrollLeftStart =
              containerRef.current.scrollLeft;
          }}
          onMouseLeave={() => {
            containerRef.current.isDown = false;
            containerRef.current.classList.remove("cursor-grabbing");
          }}
          onMouseUp={() => {
            containerRef.current.isDown = false;
            containerRef.current.classList.remove("cursor-grabbing");
          }}
          onMouseMove={(e) => {
            const container = containerRef.current;
            if (!container.isDown) return;
            e.preventDefault();

            const x = e.pageX - container.offsetLeft;
            const walk = (x - container.startX) * 1;

            if (!container.rafId) {
              container.rafId = requestAnimationFrame(() => {
                container.scrollLeft = container.scrollLeftStart - walk;
                container.rafId = null;
              });
            }
          }}
          className="absolute live z-15 left-1/2 w-full -translate-x-1/2 top-12 h-[45vh]   sm:bottom-120 sm:translate-y-120 sm:w-full sm:h-[75vh] flex gap-2 sm:gap-6 py-4       cursor-grab transition-all select-none duration-initial  overflow-x-scroll scrollbar-hide"
          style={{
            scrollBehavior: "auto",
            scrollSnapType: "x mandatory",
          }}
        >
          {repeatedCards.map((card, idx) => {
            const videoRef = useRef(null);
            const [active, setActive] = useState(false);
            const liveNumber = React.useMemo(
              () => Math.floor(Math.random() * 900 + 100),
              []
            );

            return (
              <motion.div
                key={idx}
                className="group relative h-full w-52 sm:min-w-[22rem]  sm:h-full bg-cover rounded-4xl shadow-lg flex-shrink-0 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110"
                style={{ backgroundImage: `url(${card.img})` }}
                onMouseEnter={() => {
                  if (videoRef.current) videoRef.current.play();
                }}
                onMouseLeave={() => {
                  setActive(false);
                  if (videoRef.current) videoRef.current.pause();
                }}
                onClick={() => {
                  setActive(true);
                  if (videoRef.current) videoRef.current.play();
                }}
              >
                {/* Video overlay */}
                {card.video && (
                  <video
                    ref={videoRef}
                    src={card.video}
                    className={`absolute inset-0 w-full h-full object-cover rounded-4xl z-0 transition-opacity duration-300 ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    muted
                    loop
                    preload="none"
                    playsInline
                    poster={card.img}
                  />
                )}
                {/* Top left buttons */}
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  <button className="px-2 py-1 text-[10px]  sm:px-3 bg-red-500 sm:py-2 rounded-full flex items-center sm:text-xs font-semibold hover:bg-red-300 ">
                    <img
                      className="h-4 animate-pulse"
                      src="src/assets/stream.png"
                      alt=""
                    />
                    <span className="ml-1 text-zinc-100 text-[12px] font-normal font-[MonaSans]">
                      Live
                    </span>
                  </button>
                  <button className="bg-black/20 backdrop-blur-[1px] font-[Baskville] tracking-wide text-white px-3 py-1 flex items-center rounded-full text-xs font-semibold hover:bg-zinc-500">
                    {/* Play Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 mr-1 fill-transparent"
                      viewBox="0 0 16 16"
                    >
                      <polygon
                        points="3,2 13,8 3,14"
                        fill=""
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                    {liveNumber}K
                  </button>
                </div>
                <div className="absolute w-48 h-[6vh] sm:w-64 left-2 bottom-6 sm:h-[10vh] flex items-center gap-2 sm:gap-3 bg-black/20 backdrop-blur-[1px] rounded-full p-2 shadow transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110">
                  <div className="w-10 h-10 rounded-full   sm:w-14 sm:h-14    flex items-center justify-center overflow-hidden">
                    <img
                      src={card.img}
                      alt="Creator"
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold font-[MonaSans] text-zinc-100 text-[10px] sm:text-sm">
                      {card.name}
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[8px] sm:text-xs font-[MonaSans] text-zinc-200">
                        {card.followers} Follower
                      </p>
                      <span className="p-[3px] rounded-full bg-white"></span>
                      <span className="text-[8px] sm:text-xs font-[MonaSans] text-[#6cfa7a] font-semibold hover:text-[#90a955] cursor-pointer">
                        Follow +
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
