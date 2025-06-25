import { motion, useAnimation, useMotionValue } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

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
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    let raf;
    let startTimeout = setTimeout(type, 0); // Small delay before typing starts

    function type() {
      setTypedText(fullText.slice(0, i + 69));
      i++;
      if (i < fullText.length) {
        raf = setTimeout(type, 60); // Smooth, not too fast
      }
    }

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(raf);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center  select-none sm:py-10 py-0 min-h-screen">
      {/* Section 1 */}
      <section className="section-1 flex flex-col  gap-0  md:flex-row items-center md:items-center sm:justify-between  sm:w-full md:px-6   md:gap-0 h-auto md:h-[20vh]">
        <motion.p
          initial={{ opacity: 0 }}
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
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="absolute top-1/2 left-0 w-[38%] border-t border-zinc-300"
              style={{ originX: 0 }}
            ></motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="absolute top-1/2 right-0 w-[38%] border-t border-zinc-300"
              style={{ originX: 1 }}
            ></motion.div>
          </div>
          <div className="flex items-center absolute justify-center gap-2 md:gap-[1.1rem] z-10 left-1/2 -translate-x-1/2">
            <motion.div
              initial={{ y: "-200vh" }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.1 }}
              className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform rounded-full border-1 border-zinc-300 bg-white z-10"
            ></motion.div>
            <motion.div
              initial={{ y: "-200vh" }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.1 }}
              className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform rounded-full border-1 border-zinc-300 bg-white z-20 -ml-4 md:-ml-8"
            ></motion.div>
            <motion.div
              initial={{ y: "-200vh" }}
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
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0 }}
            className="text-[4.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[10rem] text-zinc-900 tracking-tighter font-[MonaSans] leading-none"
            style={{ willChange: "transform" }}
          >
            THE
          </motion.h1>
        </div>
      </section>

      {/* section */}
      <section className="section-2 -top-5 h-24 origin-top relative sm:flex sm:items-center sm:justify-around sm:px-4 sm:gap-10 sm:pl-40 p-0 sm:h-40 ">
        <motion.h1
          initial={{ y: "100%", opacity: 0 }}
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
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="fashion  text-[4.5rem]    text-center    -top-32     sm:text-[10rem] sm:tracking-tight absolute sm:font-[MonaSans] left-1/2 -translate-x-1/2 sm:-top-10 sm:text-zinc-950"
          style={{ willChange: "transform" }}
        >
          FASHION
        </motion.h1>

        {/* iPhone Image */}

        <motion.img
          initial={{ y: 100, opacity: 0 }}
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
