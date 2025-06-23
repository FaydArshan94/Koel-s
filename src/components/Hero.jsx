import { motion, useMotionValue } from "framer-motion";
import React, { useRef, useEffect } from "react";

const liveCards = [
  {
    img: "https://img.freepik.com/free-photo/portrait-young-happy-woman-studio_1303-13799.jpg?t=st=1750654476~exp=1750658076~hmac=e4fe67c71de29696bb3ee498a2e0083fdd2662af23d3c76acf2fd3b1a0de2ecd&w=900",
    video:
      "https://videos.openai.com/vg-assets/assets%2Ftask_01js5m0978f5d9f1a9b6zharzj%2Ftask_01js5m0978f5d9f1a9b6zharzj_genid_bd55d659-c83f-4cf7-b196-607e3c6eaac2_25_04_18_23_34_182553%2Fvideos%2F00000_837833298%2Fsource.mp4?st=2025-06-23T05%3A41%3A13Z&se=2025-06-29T06%3A41%3A13Z&sks=b&skt=2025-06-23T05%3A41%3A13Z&ske=2025-06-29T06%3A41%3A13Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=h4gw0xhY%2BhHOBQeM56fn8gsxG2tjcFHgipqOQVMYjpo%3D&az=oaivgprodscus",
    followers: "12.3k",
    name: "Aisha Verma",
  },
  {
    img: "https://img.freepik.com/free-photo/full-shot-super-woman-with-superpowers_23-2150168138.jpg?t=st=1750654625~exp=1750658225~hmac=7ee6b799a9640894c5dd46a6a42c1d7124ef4bbc350fa064a2d76f28bb65c918&w=900",
    video:
      "https://videos.openai.com/vg-assets/assets%2Ftask_01jn9839bjf1c8f34eprazgj0p%2Ftask_01jn9839bjf1c8f34eprazgj0p_genid_ca2d915b-735a-47f1-a55b-f8b8233397ee_25_03_01_16_19_182360%2Fvideos%2F00000_178613209%2Fsource.mp4?st=2025-06-23T05%3A42%3A28Z&se=2025-06-29T06%3A42%3A28Z&sks=b&skt=2025-06-23T05%3A42%3A28Z&ske=2025-06-29T06%3A42%3A28Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=tA7kUgvnjSFAOzd4f95VKVtqMt1VujxNhKalTx%2Fkzjc%3D&az=oaivgprodscus",
    followers: "8.7k",
    name: "Priya Singh",
  },
  {
    img: "https://videos.openai.com/vg-assets/assets%2Ftask_01jxsjhqsyedx9pymnwmfnw7ms%2F1749983849_img_0.webp?st=2025-06-23T05%3A42%3A17Z&se=2025-06-29T06%3A42%3A17Z&sks=b&skt=2025-06-23T05%3A42%3A17Z&ske=2025-06-29T06%3A42%3A17Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=YRYcK%2FW2EX6rLs9e0UDPA2Gdq6DfrmcmDmpIWAXjK00%3D&az=oaivgprodscus",
    video:
      "https://videos.openai.com/vg-assets/assets%2Ftask_01jrhp033nfgfszrbedjeaxqfa%2Ftask_01jrhp033nfgfszrbedjeaxqfa_genid_e4e8545f-c139-434e-824f-141bba2d9b0d_25_04_11_05_45_796216%2Fvideos%2F00000_123588863%2Fsource.mp4?st=2025-06-23T05%3A39%3A53Z&se=2025-06-29T06%3A39%3A53Z&sks=b&skt=2025-06-23T05%3A39%3A53Z&ske=2025-06-29T06%3A39%3A53Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=FDCx9o9AbQGSFr19Mk5qAsdIyeBN6v8nzo3F3H2ACWw%3D&az=oaivgprodscus",
    followers: "15.1k",
    name: "Meera Patel",
  },
  {
    img: "https://img.freepik.com/free-photo/young-confident-man-black-shirt-with-optical-glasses-crosses-arms-looks-isolated-pink-wall_141793-35232.jpg?t=st=1750654968~exp=1750658568~hmac=a3adecdc005345cf3d2fe14eddba94cb33dfed1a5c9a35daf788a0da395441e4&w=900",
    video:
      "https://videos.openai.com/vg-assets/assets%2Ftask_01jma1kymde8j8yvcy1dyn9w6e%2Ftask_01jma1kymde8j8yvcy1dyn9w6e_genid_407b354b-3511-46f7-81c0-dad7d5f47f1a_25_02_17_13_30_025095%2Fvideos%2F00000_637227812%2Fsource.mp4?st=2025-06-23T05%3A39%3A27Z&se=2025-06-29T06%3A39%3A27Z&sks=b&skt=2025-06-23T05%3A39%3A27Z&ske=2025-06-29T06%3A39%3A27Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=DfGJyWcgHeEIGpOmM8eUlvfFLlIPR5iWY2dACAjOH30%3D&az=oaivgprodscus",
    followers: "21.4k",
    name: "Rohan Malhotra",
  },
  {
    img: "https://videos.openai.com/vg-assets/assets%2Ftask_01jy9v07vfegpa8jxke2erk62g%2F1750529512_img_3.webp?st=2025-06-23T02%3A00%3A13Z&se=2025-06-29T03%3A00%3A13Z&sks=b&skt=2025-06-23T02%3A00%3A13Z&ske=2025-06-29T03%3A00%3A13Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=onSnZwqXNg3mwxKBhGiefP4kkH%2FAhF86Sw%2BdIL3kya4%3D&az=oaivgprodscus",
    video:
      "https://videos.openai.com/vg-assets/assets%2Ftask_01jma1kymde8j8yvcy1dyn9w6e%2Ftask_01jma1kymde8j8yvcy1dyn9w6e_genid_407b354b-3511-46f7-81c0-dad7d5f47f1a_25_02_17_13_30_025095%2Fvideos%2F00000_637227812%2Fsource.mp4?st=2025-06-23T05%3A39%3A27Z&se=2025-06-29T06%3A39%3A27Z&sks=b&skt=2025-06-23T05%3A39%3A27Z&ske=2025-06-29T06%3A39%3A27Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=DfGJyWcgHeEIGpOmM8eUlvfFLlIPR5iWY2dACAjOH30%3D&az=oaivgprodscus",
    followers: "9.2k",
    name: "Simran Kaur",
  },
  {
    img: "https://videos.openai.com/vg-assets/assets%2Ftask_01jyacmvvye2gb75kqdjjtrrsn%2F1750548071_img_2.webp?st=2025-06-23T02%3A01%3A08Z&se=2025-06-29T03%3A01%3A08Z&sks=b&skt=2025-06-23T02%3A01%3A08Z&ske=2025-06-29T03%3A01%3A08Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=wucPhW21YlommMg%2FE%2Fq96tAnyhqsqW3rZ%2BOavcfT6Fg%3D&az=oaivgprodscus",
    video:
      "https://videos.openai.com/vg-assets/assets%2Ftask_01jma1kymde8j8yvcy1dyn9w6e%2Ftask_01jma1kymde8j8yvcy1dyn9w6e_genid_407b354b-3511-46f7-81c0-dad7d5f47f1a_25_02_17_13_30_025095%2Fvideos%2F00000_637227812%2Fsource.mp4?st=2025-06-23T05%3A39%3A27Z&se=2025-06-29T06%3A39%3A27Z&sks=b&skt=2025-06-23T05%3A39%3A27Z&ske=2025-06-29T06%3A39%3A27Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=DfGJyWcgHeEIGpOmM8eUlvfFLlIPR5iWY2dACAjOH30%3D&az=oaivgprodscus",
    followers: "5.8k",
    name: "Arjun Desai",
  },
  {
    img: "https://videos.openai.com/vg-assets/assets%2Ftask_01jyd8cf57enbbwtn7mye4tp0n%2F1750644276_img_0.webp?st=2025-06-23T03%3A51%3A16Z&se=2025-06-29T04%3A51%3A16Z&sks=b&skt=2025-06-23T03%3A51%3A16Z&ske=2025-06-29T04%3A51%3A16Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=PKRnIbJ%2Fegd0%2BLMnP7WwpL2VoUXuEHIIl6NwJFNlA2k%3D&az=oaivgprodscus",
    video:
      "https://videos.openai.com/vg-assets/assets%2Ftask_01jma1kymde8j8yvcy1dyn9w6e%2Ftask_01jma1kymde8j8yvcy1dyn9w6e_genid_407b354b-3511-46f7-81c0-dad7d5f47f1a_25_02_17_13_30_025095%2Fvideos%2F00000_637227812%2Fsource.mp4?st=2025-06-23T05%3A39%3A27Z&se=2025-06-29T06%3A39%3A27Z&sks=b&skt=2025-06-23T05%3A39%3A27Z&ske=2025-06-29T06%3A39%3A27Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=DfGJyWcgHeEIGpOmM8eUlvfFLlIPR5iWY2dACAjOH30%3D&az=oaivgprodscus",
    followers: "13.6k",
    name: "Neha Joshi",
  },
  {
    img: "https://img.freepik.com/free-photo/funny-smiling-hipster-handsome-man-stylish-summer-cloth-street-sunglasses_158538-2105.jpg?t=st=1750655193~exp=1750658793~hmac=7f164bcbde280d6f4e1cbf6719f652de9ecabcb40c38fc1d0bc73b2f4b5be7e9&w=900",
    video:
      "https://videos.openai.com/vg-assets/assets%2Ftask_01jma1kymde8j8yvcy1dyn9w6e%2Ftask_01jma1kymde8j8yvcy1dyn9w6e_genid_407b354b-3511-46f7-81c0-dad7d5f47f1a_25_02_17_13_30_025095%2Fvideos%2F00000_637227812%2Fsource.mp4?st=2025-06-23T05%3A39%3A27Z&se=2025-06-29T06%3A39%3A27Z&sks=b&skt=2025-06-23T05%3A39%3A27Z&ske=2025-06-29T06%3A39%3A27Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=DfGJyWcgHeEIGpOmM8eUlvfFLlIPR5iWY2dACAjOH30%3D&az=oaivgprodscus",
    followers: "7.9k",
    name: "Kabir Mehta",
  },
  {
    img: "https://videos.openai.com/vg-assets/assets%2Ftask_01jw773z21e0gs20jq9z2m9c41%2F1748294117_img_3.webp?st=2025-06-23T03%3A50%3A13Z&se=2025-06-29T04%3A50%3A13Z&sks=b&skt=2025-06-23T03%3A50%3A13Z&ske=2025-06-29T04%3A50%3A13Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=VxeRW65Gt62PiJI7ihSHIdKTz279A%2F8aO9LvkIcTtok%3D&az=oaivgprodscus",
    video:
      "https://videos.openai.com/vg-assets/assets%2Ftask_01jma1kymde8j8yvcy1dyn9w6e%2Ftask_01jma1kymde8j8yvcy1dyn9w6e_genid_407b354b-3511-46f7-81c0-dad7d5f47f1a_25_02_17_13_30_025095%2Fvideos%2F00000_637227812%2Fsource.mp4?st=2025-06-23T05%3A39%3A27Z&se=2025-06-29T06%3A39%3A27Z&sks=b&skt=2025-06-23T05%3A39%3A27Z&ske=2025-06-29T06%3A39%3A27Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=DfGJyWcgHeEIGpOmM8eUlvfFLlIPR5iWY2dACAjOH30%3D&az=oaivgprodscus",
    followers: "11.2k",
    name: "Tanvi Shah",
  },
  {
    img: "https://videos.openai.com/vg-assets/assets%2Ftask_01jya02ba4f41tgr9dcnm1ywgm%2F1750534895_img_3.webp?st=2025-06-23T03%3A50%3A13Z&se=2025-06-29T04%3A50%3A13Z&sks=b&skt=2025-06-23T03%3A50%3A13Z&ske=2025-06-29T04%3A50%3A13Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Si%2FwXarOLCHGidA4CgQAkoTECNgNeKAEJ19c06h3gto%3D&az=oaivgprodscus",
    video:
      "https://videos.openai.com/vg-assets/assets%2Ftask_01jma1kymde8j8yvcy1dyn9w6e%2Ftask_01jma1kymde8j8yvcy1dyn9w6e_genid_407b354b-3511-46f7-81c0-dad7d5f47f1a_25_02_17_13_30_025095%2Fvideos%2F00000_637227812%2Fsource.mp4?st=2025-06-23T05%3A39%3A27Z&se=2025-06-29T06%3A39%3A27Z&sks=b&skt=2025-06-23T05%3A39%3A27Z&ske=2025-06-29T06%3A39%3A27Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=DfGJyWcgHeEIGpOmM8eUlvfFLlIPR5iWY2dACAjOH30%3D&az=oaivgprodscus",
    followers: "6.4k",
    name: "Ritika Jain",
  },
];

const repeatedCards = [...liveCards, ...liveCards, ...liveCards]; // Triplet



  const Hero = () => {
  const containerRef = useRef();
  const section3Ref = useRef(); // Add this ref
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

    return (
    <div className="w-full flex flex-col select-none py-10 min-h-screen px-6">
      {/* Section 1 */}
      <section className="section-1 flex h-[20vh] items-center justify-around pr-20">
        <p className="w-[17%] text-left text-sm text-zinc-400 font-semiboldbold">
          Koel's Fashion is a live or niche event, brand or collection that has
          emerged after recent trends.
        </p>
        <img
          className="w-[35vw] opacity-20 pl-20"
          src="src/assets/line.png"
          alt=""
        />
        <h1 className="text-[10rem] text-zinc-900 font-[MonaSans]">THE</h1>
      </section>

      {/* Section 2 */}
      <section className="section-2 flex items-center justify-around px-4 gap-10 pl-40 h-[25vh] overflow-hidden">
        <h1 className="text-[10.5rem] tracking-wider w-90% font-medium text-zinc-950 font-[PlayfairDisplay]">
          ULTIMATE{" "}
        </h1>
        <p className="text-xs text-zinc-500 pt-16 font-bold leading-[23px] font-[MonaSans]">
          Sense of poise, good manners, and a graceful presence.
        </p>
      </section>

      {/* Section 3 */}
      <section
        ref={section3Ref}
        className="section-3  select-none flex relative w-full h-[250vh] justify-center rounded-[3rem] border-[0.5px] border-zinc-100 bg-gradient-to-bl from-transparent via-[#f8f8f8] to-[#96f47f] shadow-gray-950"
      >
        {/* FASHION Heading */}
        <h1 className="text-[10rem] tracking-tight absolute font-[MonaSans] -top-8 text-zinc-950">
          FASHION
        </h1>
        {/* iPhone Image */}

        <img
          className="absolute h-[250vh]  w-1/2 select-none  -top-5 object-cover"
          src="src/assets/Iphone.png"
          alt=""
        />
        {/* Floating Quotes */}
        <div>
          <motion.div
            drag
            dragConstraints={section3Ref}
            animate={{ y: [0, -20, 0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-[100] rounded-xl shadow-md p-4 text-zinc-700 text-sm font-semibold w-[15vw]"
            style={{
              top: "30vh",
              left: "2vw",
              zIndex: 2,
            }}
          >
            Fashion is art, style is your personal expression.
          </motion.div>
          <motion.div
            drag
            dragConstraints={section3Ref}
            className="absolute z-[102] bg-white/80 rounded-xl flex flex-col gap-4 shadow-md p-4 text-zinc-700 text-sm font-semibold w-[20vw]"
            style={{
              top: "40vh",
              right: "0",
              zIndex: 2,
            }}
          >
            <span>01</span>
            <p>Elegance is not standing out, but being remembered.</p>
          </motion.div>
          <motion.div
            drag
            dragConstraints={section3Ref}
            className="absolute z-[102] bg-white/80 rounded-xl shadow-md p-4 text-zinc-700 text-sm font-semibold w-[15vw]"
            style={{
              top: "60vh",
              left: "5vw",
              zIndex: 2,
            }}
          >
            Wear confidence like you wear your favorite outfit.
          </motion.div>
          <motion.div
            drag
            dragConstraints={section3Ref}
            className="absolute z-[102] bg-white/80 rounded-xl flex flex-col gap-4 shadow-md p-4 text-zinc-700 text-sm font-semibold w-[20vw]"
            style={{
              top: "65vh",
              right: "0",
              zIndex: 2,
            }}
          >
            <span>02</span>
            <p>Trends fade, but true style is eternal and unique.</p>
          </motion.div>
        </div>

        <div className=" w-[70vw]  h-[40vh] absolute bottom-10 flex items-center justify-between">
          <img
            className="h-40 absolute left-10 z-[1]"
            src="src/assets/arrow-left.png"
            alt=""
          />
          <img
            className="h-40 absolute -top-20 right-10 z-[1]"
            src="src/assets/arrow-right.png"
            alt=""
          />
        </div>

        <div className=" w-[80vw] h-[40vh] absolute bottom-20 flex items-center justify-between">
          <img
            className="h-16 absolute left-0 top-20 z-[1]"
            src="src/assets/app-store.png"
            alt=""
          />
          <img
            className="w-40 absolute right-0 top-6  z-[1]"
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
          className="absolute live z-[100] left-10 bottom-1/2 translate-y-1/2 w-full h-[75vh] flex gap-6 py-4 cursor-grab transition-all select-none duration-initial  overflow-x-scroll scrollbar-hide"
          style={{
            scrollBehavior: "auto",
            scrollSnapType: "x mandatory",
          }}
        >
          {repeatedCards.map((card, idx) => {
            const videoRef = useRef(null);

            return (
              <motion.div
                key={idx}
                className="group relative min-w-[22rem] h-full bg-cover rounded-4xl shadow-lg flex-shrink-0 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110"
                style={{ backgroundImage: `url(${card.img})` }}
                onMouseEnter={() => videoRef.current && videoRef.current.play()}
                onMouseLeave={() =>
                  videoRef.current && videoRef.current.pause()
                }
              >
                {/* Video overlay */}
                {card.video && (
                  <video
                    ref={videoRef}
                    src={card.video}
                    className="absolute inset-0 w-full h-full object-cover rounded-4xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    muted
                    loop
                    preload="none"
                    playsInline
                    poster={card.img}
                  />
                )}
                {/* Top left buttons */}
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  <button className="  px-3 bg-red-500 py-2 rounded-full flex items-center text-xs font-semibold hover:bg-red-300 ">
                    <img
                      className="h-6 animate-pulse"
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
                    {Math.floor(Math.random() * 900 + 100)}K
                  </button>
                </div>
                <div className="absolute w-64 left-2 bottom-6 h-[10vh] flex items-center gap-3 bg-black/20 backdrop-blur-[1px] rounded-full p-2 shadow transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110">
                  <div className="w-14 h-14 rounded-full  flex items-center justify-center overflow-hidden">
                    <img
                      src={card.img}
                      alt="Creator"
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold font-[MonaSans] text-zinc-100 text-sm">
                      {card.name}
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-[MonaSans] text-zinc-200">
                        {card.followers} Follower
                      </p>
                      <span className="p-[3px] rounded-full bg-white"></span>
                      <span className="text-xs font-[MonaSans] text-[#6cfa7a] font-semibold hover:text-[#90a955] cursor-pointer">
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
