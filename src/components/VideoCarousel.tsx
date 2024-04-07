"use client";
import { hightlightsSlides } from "@constants";
import { useGSAP } from "@gsap/react";
import { pauseImg, playImg, replayImg } from "@utils";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function VideoCarousel() {
  const videoRef = useRef<any>([]);
  const videoSpanRef = useRef<any>([]);
  const videoDivRef = useRef<any>([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  const [loadedData, setLoadedData] = useState<any>([null, null, null, null]);

  useGSAP(
    function () {
      gsap.to("#slider", {
        transform: `translateX(${-100 * videoId}%)`,
        duration: 1.5,
        ease: "power2.inOut",
      });

      gsap.to("#video", {
        scrollTrigger: {
          trigger: "#video",
          toggleActions: "restart none none none",
        },
        onComplete: () => {
          setVideo((preVideo) => ({
            ...preVideo,
            startPlay: true,
            isPlaying: true,
          }));
        },
      });
    },
    [isEnd, videoId],
  );

  function handleLoadedMetadata(
    e: React.SyntheticEvent<HTMLVideoElement, Event>,
    i: number,
  ) {
    setLoadedData((pre: any) => {
      return [...pre, e];
    });
  }

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // where are we in the video playing journey (what video playing)
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animation to move the indicator
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                    ? "10vw" // tablet
                    : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration,
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  function handleProcess(type: String, i: number) {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  }

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="flex-center h-full w-full overflow-hidden rounded-3xl bg-black">
                <video
                  className={`${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  onClick={() => {
                    isLastVideo
                      ? () => handleProcess("video-end", i)
                      : !isPlaying
                        ? handleProcess("play", i)
                        : handleProcess("pause", i);
                  }}
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((preVideo) => ({
                      ...preVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetadata(e, i)}
                  onEnded={() => {
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last", i);
                  }}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute left-[5%] top-12 z-10">
                {list.textLists.map((text) => (
                  <p className="text-xl font-medium md:text-2xl" key={text}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-center relative mt-10">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
          {videoRef.current.map((_: any, i: number) => (
            <span
              key={i}
              className="relative mx-2 h-3 w-3 cursor-pointer rounded-full bg-gray-200"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                ref={(el) => (videoSpanRef.current[i] = el)}
                className="absolute h-full w-full rounded-full"
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <Image
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset", 0)
                : !isPlaying
                  ? () => handleProcess("play", 0)
                  : () => handleProcess("pause", 0)
            }
          />
        </button>
      </div>
    </>
  );
}

export default VideoCarousel;
