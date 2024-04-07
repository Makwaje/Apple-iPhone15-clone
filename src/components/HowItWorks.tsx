"use client";
import { useGSAP } from "@gsap/react";
import { chipImg, frameImg, frameVideo } from "@utils";
import { animateWithGsap } from "@utils/animations";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

function HowItWorks() {
  const videoRef = useRef<HTMLVideoElement>(null!);
  useGSAP(function () {
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });

    animateWithGsap(".g_fadeIn", { y: 0, duration: 1, ease: "power2.inOut" });
  }, []);
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div id="chip" className="flex-center my-20 w-full">
          <Image src={chipImg} alt="chip" width={180} height={180} />
        </div>
        <div className="flex flex-col items-center ">
          <h2 className="hiw-title">
            A17 Pro chip.
            <br /> A monster win for gaming.
          </h2>
          <p className="hiw-subtitle">
            It's here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>

        <div className="mb-14 mt-10 md:mt-20">
          <div className="flex-center relative h-full">
            <div className="overflow-hidden">
              <Image
                src={frameImg}
                alt="frame"
                className="relative z-20 bg-transparent"
              />
            </div>
            <div className="hiw-video">
              <video
                className="pointer-events-none"
                playsInline
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4 " />
              </video>
            </div>
          </div>

          <p className="mt-3 text-center font-semibold text-gray">
            Honkai: Star Rail
          </p>
        </div>

        <div className="hiw-text-container">
          <div className="flex flex-1 flex-col justify-center">
            <p className="hiw-text g_fadeIn">
              A17 Pro ts an entirely new class of Iphone chip that delivers our{" "}
              {"   "}
              <span className="text-white">
                best graphic performance by far,{" "}
              </span>
              using the same alloy that spacecrafts use to missions to Mars.
            </p>

            <p className="hiw-text g_fadeIn">
              Mobile {"   "}
              <span className="text-white ">
                games will look and feel immersive.{" "}
              </span>
              with incredibly detailed environments and characters8.{" "}
            </p>
          </div>

          <div className="g_fadeIn flex flex-1 flex-col justify-center">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">Pro-class GPU</p>
            <p className="hiw-text">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
