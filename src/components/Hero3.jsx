import { motion } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const section1Ref = useRef();
  const section2Ref = useRef();
  const section3Ref = useRef();
  const section4Ref = useRef();
  const section5Ref = useRef();
  const section6Ref = useRef();

  return (
    <div className="w-full flex flex-col  select-none py-10 min-h-screen px-6 ">
      {/* Section 1 */}

      <section className="section-3  select-none flex relative  overflow-hidden w-full  justify-between ">
        <div ref={section1Ref} className=" h-full  overflow-hidden flex items-center justify-center w-1/2">
        <motion.div
            drag
            dragConstraints={section1Ref}
            className="absolute w-[20vw] scale-75 z-20 bg-white/80 rounded-xl   flex flex-col gap-4 shadow-md p-4 text-zinc-700 text-lg font-semibold "
            style={{
              top: "5vh",
              left: "0",
              zIndex: 20,
            }}
          >
            <span>01</span>
            <p>
              Designers unveil new collections in anticipation of changing
              weather.
            </p>
          </motion.div>
          <div className="h-[100%] rounded-[3rem] overflow-hidden  w-[100%]">
            <img
              src="src\assets\cap boy.jpg"
              alt="Landscape"
              className="w-full h-full object-cover "
            />
          </div>
        </div>

        <div className=" h-full flex flex-col gap-[13.5rem] relative justify-between px-10  w-1/2">
          <div
            ref={section2Ref}
            className=" flex justify-end h-1/2 w-full"
          >
            <motion.div
              drag
              dragConstraints={section2Ref}
              className="absolute w-[20vw] scale-75 z-20 bg-white/80 rounded-xl   flex flex-col gap-4 shadow-md p-4 text-zinc-700 text-lg font-semibold "
              style={{
                top: "45vh",
                right: "15vh",
                zIndex: 20,
              }}
            >
              <span>02</span>
              <p>
                Beyond aesthetics, fashion has the power to empower individuals.
              </p>
            </motion.div>
            <div className="h-[35vh] scale-110 mt-10 rounded-3xl overflow-hidden  w-[50%]">
              <img
                src="https://media.assettype.com/indulgexpress%2Fimport%2F2023%2F8%2F17%2Foriginal%2FFocusonsustainablefashion.jpg?w=768&auto=format%2Ccompress&fit=max"
                alt="Landscape"
                className="w-full h-full object-cover "
              />
            </div>
          </div>
          <div
            ref={section3Ref}
            className=" h-1/2 w-full flex items-end  overflow-hidden "
          >
            <motion.div
              drag
              dragConstraints={section3Ref}
              className="absolute w-[18vw] scale-75 z-20 bg-white/80 rounded-xl   flex flex-col gap-4 shadow-md p-4 text-zinc-700 text-lg font-semibold "
              style={{
                bottom: "5vh",
                right: "5vh",
                zIndex: 20,
              }}
            >
              <span>03</span>
              <p>
                Fashion is a dynamic reflection of culture and societal trends.
              </p>
            </motion.div>
            <div className="h-[50vh]  rounded-3xl overflow-hidden  w-[60%]">
              <img
                src="https://audiophile-ecommerce-mj.netlify.app/img/product-images-xx99-mark2-2-desktop.jpg"
                alt="Landscape"
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-3 h-screen items-start py-4 mt-6  select-none flex relative  overflow-hidden w-full gap-10 ">
        <div className="flex  h-full gap-10 w-1/2 ">
          <div
            ref={section5Ref}
            className=" h-full w-1/2  flex flex-col px-4 items-start gap-6  "
          >
            <div className="h-[55%] bg-red-500 rounded-3xl overflow-hidden  w-full">
              <img
                src="https://i0.wp.com/krvia.ac.in/wp-content/uploads/2021/09/AboutPage-Team-Jenna.jpg?w=410&ssl=1"
                alt="Landscape"
                className="h-full w-full object-cover "
              />
            </div>

            <motion.div
              drag
              dragConstraints={section5Ref}
              className=" w-[18vw]  z-20 bg-white/80 rounded-xl   flex flex-col gap-4 shadow-md p-2 text-zinc-700 text-sm font-semibold "
            >
              <span className="text-[#DEC0AB] ">05</span>
              <p>
                The digital era has transformed the way people engage with
                fashion.
              </p>
            </motion.div>
          </div>

          <div
            ref={section4Ref}
            className=" h-[90%] w-[42%]  flex flex-col  relative items-center gap-10 justify-end "
          >
            <motion.div
              drag
              dragConstraints={section4Ref}
              className=" w-[15vw]  z-20 bg-white/80 rounded-xl   flex flex-col gap-4 shadow-md p-4 text-zinc-700 text-sm font-semibold "
            >
              <span className="text-[#E7C8AB]"> 04 </span>
              <p>
                Growing awareness and emphasis on sustainability and ethical
                practices.
              </p>
            </motion.div>

            <div className="h-[48vh]  rounded-3xl overflow-hidden  w-full">
              <img
                src="src\assets\shoe.jpg"
                alt="Landscape"
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        </div>

        <div
          ref={section6Ref}
          className=" h-full flex flex-col w-1/2    gap-4 relative items-start "
        >
          <div className=" flex  h-[60%]  w-full">
            <div className="h-full  rounded-3xl overflow-hidden  w-full">
              <img
                src="https://www.opticsonline.ae/wp-content/uploads/2024/11/SMTBMB0253SC00152-4.jpg"
                alt="Landscape"
                className="w-full h-full object-cover "
              />
            </div>
          </div>

          <div className="w-full ">
            <motion.div
              drag
              dragConstraints={section6Ref}
              className=" w-[25vw]  z-80 bg-white/80 rounded-xl   flex flex-col gap-4 shadow-md p-4 text-zinc-700 text-sm font-semibold "
            >
              <span className="text-[#799189] ">06 </span>
              <p>
                Fashion serves as a powerful medium for individuals to express
                their unique personalities
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
