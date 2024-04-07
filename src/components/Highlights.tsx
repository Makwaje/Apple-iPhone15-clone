"use client";
import { useGSAP } from "@gsap/react";
import { rightImg, watchImg } from "@utils";
import gsap from "gsap";
import Image from "next/image";
import VideoCarousel from "./VideoCarousel";

function Highlights() {
  useGSAP(function () {
    gsap.to("#title", {
      y: 0,
      opacity: 1,
    });
    gsap.to(".link", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.25,
    });
  }, []);
  return (
    <section
      id="highlight"
      className="common-padding h-full w-screen overflow-hidden bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 flex w-full items-end justify-between">
          <h1 id="title" className="section-heading">
            Get the highlights
          </h1>

          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch a film
              <Image src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <Image src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
}

export default Highlights;
