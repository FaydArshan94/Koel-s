import { motion } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const section3Ref = useRef();
  return (
    <div className="w-full flex flex-col select-none py-10 min-h-screen px-6">
      {/* Section 1 */}
      <section className="section-1  flex flex-col  h-[40vh] items-center justify-between ">
        <div className="flex justify-between items-center h-full w-full">
          <h1 className="text-[5.3rem] text-zinc-900 leading-[8vw] tracking-tight font-[MonaSans]">
            PRIME PERFECTION &
          </h1>
          <div className="w-1/4 h-[10vh] mt-2">
            <img
              className="w-full object-cover h-full opacity-20"
              src="src/assets/line.png"
              alt=""
            />
          </div>
        </div>
        <div className="flex mb-32  items-center h-full  justify-between">
          <h1 className="text-[6rem]  font-[Baskville] w-full leading-[8vw] tracking-normal text-zinc-900">
            TIMELY DELIVERY
          </h1>
          <p className="w-[29%]  leading-relaxed text-left text-sm font-[MonaSans] text-zinc-400 font-semiboldbold mt-2">
            Our unparalleled dedication to precision ensures that every product
            or service is crafted with utmost care.
          </p>
        </div>
      </section>

      <section className="section-3 mt-24 select-none flex relative w-full h-[160vh] justify-between rounded-[3rem] bg-gradient-to-r from-[#D4FFEE] to-transparent">
        <div className=" h-full w-[40vw] px-5">
          <div className="flex flex-col gap-3 items-start justify-start h-full p-8">
            <h4 className="text-md font-semibold text-zinc-700 ">
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
            <p className="text-zinc-800 mt-6 text-xs w-[70%] font-semibold font-[MonaSans] ">
              Experience seamless performance and reliability. Our app is
              trusted by thousands for its efficiency and user-friendly design
              Our app is trusted by thousands.
            </p>
            <div className="flex gap-12  w-[80%] mt-40">
              <p className="text-md text-zinc-400 font-medium">2023</p>
              <p className="text-md text-zinc-400 font-medium capitalize">
                Fashion mobile Awards
              </p>
            </div>

            <div className="  w-[52vw] text-zinc-900 ">
              <span className="uppercase  text-2xl font-[MonaSans] leading-loose">
                STEP INTO A WORLD WHERE MOBILE INNOVATION MEETS THE RUNWAY-OUR
                FASHION APP HAS EMERGED AS THE UNDISPUTED CHAMPION AT THE MOBILE
                AWARDS, SETTING THE STANDARD FOR ELEGANCE.
              </span>
            </div>
          </div>
        </div>

        <div ref={section3Ref} className=" h-full  w-[40vw]">
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

        <div className=" absolute -top-20 left-1/2 -translate-x-1/2 h-[50%]  ">
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
