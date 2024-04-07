"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useEffect, useState } from "react";

function Hero() {
  const [videoSrc, setVideoSrc] = useState("");

  function handleVideoSrcSet() {
    if (window.innerWidth < 760) {
      setVideoSrc("/assets/videos/smallHero.mp4");
    } else {
      setVideoSrc("/assets/videos/hero.mp4");
    }
  }

  useEffect(function () {
    window.addEventListener("resize", handleVideoSrcSet);

    setVideoSrc(
      window.innerWidth < 760
        ? "/assets/videos/smallHero.mp4"
        : "/assets/videos/hero.mp4",
    );

    return () => window.removeEventListener("resize", handleVideoSrcSet);
  }, []);

  useGSAP(() => {
    gsap.to(".hero-title", {
      opacity: 1,
      delay: 2,
    });

    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 2,
    });
  }, []);
  if (typeof window !== "undefined")
    return (
      <section className="nav-height relative w-full bg-black">
        <div className="flex-center h-5/6 w-full flex-col">
          <p className="hero-title">iPhone 15 Pro</p>
          <div className="w-9/12 md:w-10/12">
            <video
              className="pointer-events-none"
              autoPlay
              muted
              playsInline
              key={videoSrc}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>

        <div
          id="cta"
          className="flex translate-y-20 flex-col items-center opacity-0"
        >
          <a href="#highlights" className="btn">
            Buy
          </a>
          <p className="text-xl font-normal">From $199/month or $999</p>
        </div>
      </section>
    );
}

export default Hero;
