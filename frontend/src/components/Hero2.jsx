import { motion } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const section3Ref = useRef();
  return (
    <div className="sm:w-full sm:flex sm:flex-col select-none sm:py-10 py-0 sm:min-h-screen px-5">
      {/* Section 1 */}
      <section className="section-1  flex flex-col  justify-center sm:h-[40vh]  items-center sm:justify-between ">
        <div className="sm:flex h-8 sm:justify-between sm:items-center sm:h-full w-full">
          <h1 className="text-[2rem] text-center leading-[5vh]   sm:text-[5.3rem] text-zinc-900 sm:leading-[8vw] tracking-tight font-[MonaSans]">
            PRIME PERFECTION
          </h1>
          <div className="w-1/4 h-[10vh] mt-2">
            <img
              className="w-full hidden sm:block object-cover h-full opacity-20"
              src="src/assets/line.png"
              alt=""
            />
          </div>
        </div>
        <div className="flex sm:mb-32    items-center sm:h-full w-full justify-between">
          <h1 className=" sm:text-[6rem] text-[2rem] leading-[5vh] font-bold sm:font-normal text-center font-[Baskville] w-full  sm:leading-[8vw] tracking-normal text-zinc-900">
            TIMELY DELIVERY
          </h1>
          <p className="w-[29%] hidden sm:block  leading-relaxed text-left text-sm font-[MonaSans] text-zinc-400 font-semiboldbold mt-2">
            Our unparalleled dedication to precision ensures that every product
            or service is crafted with utmost care.
          </p>
        </div>
      </section>

      <section className="section-3  sm:mt-24  mt-10 w-full select-none sm:flex relative sm:w-full sm:h-[160vh] sm:justify-between rounded-[3rem] sm:bg-gradient-to-r sm:from-[#D4FFEE] sm:to-transparent">
        <div className=" h-full sm:w-[40vw] w-full px-5">
          <div className="flex flex-col gap-3  sm:items-start items-center sm:justify-start h-full py-4  sm:py-8">
            <h4 className="sm:text-md text-xl text-center font-semibold sm:text-zinc-700 text-zinc-800 ">
              Downloaded Application
            </h4>
            <h1 className="text-6xl font-bold text-zinc-900  font-[PlayfairDisplay]">
              120K+
            </h1>
            <img
              src="src\assets\KOEL.png"
              alt="Landscape"
              className="w-full mt-10 max-w-xs h-48 object-cover object-center rounded-xl border-2 border-[#AAC6BD] mb-4"
            />
            <p className="text-zinc-800 sm:mt-6 sm:text-xs sm:w-[70%] font-semibold font-[MonaSans] ">
              Experience seamless performance and reliability. Our app is
              trusted by thousands for its efficiency and user-friendly design
              Our app is trusted by thousands.
            </p>

            <div className="sm:flex  hidden   sm:w-[80%] sm:mt-40">
              <p className="text-md text-zinc-400 font-medium">2023</p>
              <p className="text-md text-zinc-400 font-medium capitalize">Fashion mobile Awards</p>
            </div>

            <div className=" sm:w-[52vw] text-zinc-900 ">
              <span className="uppercase hidden  sm:block  sm:text-2xl font-[MonaSans] leading-loose">
                STEP INTO A WORLD WHERE MOBILE INNOVATION MEETS THE RUNWAY-OUR
                FASHION APP HAS EMERGED AS THE UNDISPUTED CHAMPION AT THE MOBILE
                AWARDS, SETTING THE STANDARD FOR ELEGANCE.
              </span>
            </div>
          </div>
        </div>

        <div ref={section3Ref} className=" hidden sm:block h-full  w-[40vw]">
          <motion.div
            drag
            dragConstraints={section3Ref}
            className="absolute w-[18.5vw] scale-75 z-20  rounded-xl   flex flex-col gap-4  p-4 text-zinc-700 text-sm font-semibold "
            style={{
              top: "5vh",
              right: "10vh",
              zIndex: 20,
            }}
          >
            <span>01</span>
            <p>
              Live fashion is characterized by the immediacy of access to the
              latest styles.
            </p>
          </motion.div>

          <motion.div
            drag
            dragConstraints={section3Ref}
            className="absolute w-[18vw] scale-75 z-20  rounded-xl   flex flex-col gap-4  p-4 text-zinc-700 text-sm font-semibold "
            style={{
              top: "25vh",
              right: "35vh",
              zIndex: 20,
            }}
          >
            <span>02</span>
            <p>Live fashion extends beyond physical garments.</p>
          </motion.div>

          <div className=" absolute bottom-40 right-40 h-[45%]   ">
            <img
              className=" z-10 w-full h-full  scale-150 select-none"
              src="src/assets/Iphone.png"
              alt=""
            />
          </div>
        </div>

        <div className=" absolute hidden sm:block sm:-top-0 top-0 left-1/2 -translate-x-1/2 sm:h-[50%]  ">
          <img
            className=" z-10 w-full h-full scale-150 select-none"
            src="src/assets/Iphone.png"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
