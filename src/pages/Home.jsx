import React from "react";

import Hero from "../components/Hero";
import Hero2 from "../components/Hero2";
import Hero3 from "../components/Hero3";

import Footer from "../components/Footer";

const isReload =
  (window.performance && window.performance.getEntriesByType("navigation")[0]?.type === "reload") ||
  (window.performance && window.performance.navigation && window.performance.navigation.type === 1);

const Home = () => {
  const shouldAnimate = isReload;

  return (
    <>
      {" "}
      <Hero shouldAnimate={shouldAnimate} />
      <Hero2 shouldAnimate={shouldAnimate} />
      <Hero3 shouldAnimate={shouldAnimate} />
      <Footer />
    </>
  );
};

export default Home;
