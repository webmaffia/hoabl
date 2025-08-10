"use client";

import { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../public/fullhd.json";
import animationMobileData from "../../public/fullhd.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { killAllGSAP } from "./gsapCleanup";

gsap.registerPlugin(ScrollTrigger);

export default function Banner() {
  const bannerRef = useRef(null);
  const animationRef = useRef(null);
  const triggerRef = useRef(null);
  const element1Ref = useRef(null);
  const element2Ref = useRef(null);
  const element3Ref = useRef(null);

  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // defensive: kill any existing triggers first
    try { if (triggerRef.current) { triggerRef.current.kill(); triggerRef.current = null; } } catch (e) {}

    if (!animationRef.current || !bannerRef.current) {
      return;
    }
    const getDuration = typeof animationRef.current.getDuration === "function"
      ? () => animationRef.current.getDuration(true)
      : () => (animationRef.current ? (animationRef.current.totalFrames || 0) : 0);

    const totalFrames = (getDuration() || 0) + 180;

    // create trigger
    triggerRef.current = ScrollTrigger.create({
      trigger: bannerRef.current,
      start: "top top",
      end: "+=8000", 
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const frame = Math.round(progress * (totalFrames - 1));
        try { animationRef.current.goToAndStop(frame, true); } catch (e) {}

        
     
        if (element1Ref.current) {
          const startTop = 55, endTop = -15;
          // Slower animation - complete in first 25% of scroll
          let adjustedProgress = Math.min(self.progress / 0.15, 1);
          element1Ref.current.style.top = `${startTop + (endTop - startTop) * adjustedProgress}%`;
          
          // Opacity animation - fade in slowly and stay visible longer
          let opacity = 1;
          if (self.progress <= 0.08) {
            opacity = self.progress / 0.08; 
          } else if (self.progress <= 0.35) {
            opacity = 1; 
          } else if (self.progress <= 0.45) {
            opacity = 1 - ((self.progress - 0.35) / 0.1); 
          }
          element1Ref.current.style.opacity = opacity;
        }
        
        if (element2Ref.current) {
          const startTop = isMobile ? 80 : 100, endTop = -10;
          // Slower animation - start at 12% and complete by 30% of scroll
          let adjustedProgress = Math.max(0, Math.min(1, (self.progress - 0.12) / 0.18));
          element2Ref.current.style.top = `${startTop + (endTop - startTop) * adjustedProgress}%`;
          
          // Opacity animation - fade in slowly after element1
          let opacity = 0;
          if (self.progress >= 0.15 && self.progress <= 0.22) {
            opacity = (self.progress - 0.15) / 0.07; 
          } else if (self.progress > 0.22 && self.progress <= 0.4) {
            opacity = 1; 
          } else if (self.progress > 0.4 && self.progress <= 0.5) {
            opacity = 1 - ((self.progress - 0.4) / 0.1); 
          }
          element2Ref.current.style.opacity = opacity;
        }
        
        if (element3Ref.current) {
          const startTop = isMobile ? 60 : 100, endTop = -15;
          // Slower animation - start at 25% and complete by 45% of scroll
          let adjustedProgress = Math.max(0, Math.min(1, (self.progress - 0.25) / 0.2));
          element3Ref.current.style.top = `${startTop + (endTop - startTop) * adjustedProgress}%`;
          
          // Opacity animation - fade in slowly after element2
          let opacity = 0;
          if (self.progress >= 0.28 && self.progress <= 0.35) {
            opacity = (self.progress - 0.28) / 0.07; 
          } else if (self.progress > 0.35 && self.progress <= 0.5) {
            opacity = 1; 
          } else if (self.progress > 0.5 && self.progress <= 0.6) {
            opacity = 1 - ((self.progress - 0.5) / 0.1); 
          }
          element3Ref.current.style.opacity = opacity;
        }
      },
    });

    const preNavCleanup = () => killAllGSAP();
    window.addEventListener("popstate", preNavCleanup);
    window.addEventListener("beforeunload", preNavCleanup);

    return () => {
      try { triggerRef.current?.kill(); } catch (e) {}
      triggerRef.current = null;
      killAllGSAP();
      window.removeEventListener("popstate", preNavCleanup);
      window.removeEventListener("beforeunload", preNavCleanup);
    };
  }, []);

  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
      document.querySelectorAll("video").forEach((video) => {
        if (video.style.height === "100vh" || video.style.height === "100%") {
          video.style.height = `${window.innerHeight}px`;
        }
      });
    };
    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  return (
    <>
      {!(isAnimationLoaded && isVideoReady) && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "linear-gradient(145deg,#ffb454 0%,#d75c33 100%)",
          display: "flex", justifyContent: "center", alignItems: "center",
          zIndex: 9999999, backdropFilter: "blur(10px)"
        }}>
          <div style={{
            width: 60, height: 60,
            border: "4px solid rgba(255,255,255,0.3)",
            borderTop: "4px solid #fff", borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }}/>
          <style jsx>{`@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      <section ref={bannerRef} style={{ height: "100vh", position: "relative" }} className="banner_section">
        {(videoLoaded) && (
          <video
            width="1920"
            height="959"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "calc(var(--vh,1vh) * 100)", objectFit: "cover", zIndex: 1 }}
            onCanPlayThrough={() => setIsVideoReady(true)}
          >
            <source src="/videos/banner_video_mobile2.webm" type="video/webm" media="(max-width:768px)"/>
            <source src="/videos/banner_video2.webm" type="video/webm" media="(min-width:769px)"/>
          </video>
        )}

        <div className="DB-Wrapper">
          <Lottie
            lottieRef={animationRef}
            animationData={isMobile ? animationMobileData : animationData}
            autoplay={false}
            loop={false}
            renderer="svg"
            onDOMLoaded={() => { setIsAnimationLoaded(true); setVideoLoaded(true); }}
            style={{ width: "100vw", height: "100vh", display: "block" }}
            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            className="DB-Container"
          />
        </div>

        <div className="banner_container">
          <div className="banner_element element_1" ref={element1Ref}>
            <div className="subtitle_70"><span className="db">Step into a world of Growth.</span></div>
          </div>

          <div className="banner_element element_2" ref={element2Ref} style={{ opacity: 0 }}>
            <div className="subtitle_70"><span className="db">Where aspiration</span><span className="db">meets access.</span></div>
          </div>

          <div className="banner_element element_3" ref={element3Ref} style={{ opacity: 0 }}>
            <div className="subtitle_70"><span className="db">Powered by design. Elevated by tech.</span><span className="db">Built for you.</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
