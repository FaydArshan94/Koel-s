import React from "react";
import Hero from "../components/Hero";
import Hero2 from "../components/Hero2";
import Hero3 from "../components/Hero3";
import Footer from "../components/Footer";
import FadeInWrapper from "../components/FadeInWrapper";

const isReload =
  (window.performance &&
    window.performance.getEntriesByType("navigation")[0]?.type === "reload") ||
  (window.performance &&
    window.performance.navigation &&
    window.performance.navigation.type === 1);

const Home = () => {
  const shouldAnimate = isReload;

  return (
    <>
      <FadeInWrapper delay={0}><Hero shouldAnimate={shouldAnimate} /></FadeInWrapper>
      <FadeInWrapper delay={0.2}><Hero2 shouldAnimate={shouldAnimate} /></FadeInWrapper>
      <FadeInWrapper delay={0.4}><Hero3 shouldAnimate={shouldAnimate} /></FadeInWrapper>
      <FadeInWrapper delay={0.6}><Footer /></FadeInWrapper>
    </>
  );
};

export default Home;
