"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { killAllGSAP } from "@/components/gsapCleanup";


export default function Manifesto() {

      const paragraphRef = useRef(null);
      const paragraphRef2 = useRef(null);
      const paragraphRef3 = useRef(null);
      const paragraphRef4 = useRef(null);
      const paragraphRef5 = useRef(null);
      const paragraphRef6 = useRef(null);
      const cls6Ref = useRef(null); // Added ref for .cls-6
       const cls1Ref = useRef(null);
          const cls2Ref = useRef(null);
      const pathRef = useRef(null);
      const [isMobile, setIsMobile] = useState(false);
      const svg1 = useRef(null);
      const svg2 = useRef(null);
      const svg3 = useRef(null);
         useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
      useEffect(() => {
        const path = svg1.current;
        const path2 = svg2.current;
        const path3 = svg3.current;
        
        if (!path) return;
        if (!path2) return;
        if (!path3) return;
    
        const length = path.getTotalLength();
        const length2 = path2.getTotalLength();
        const length3 = path3.getTotalLength();
        // Hide the path initially
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.set(path2, {
          strokeDasharray: length2,
          strokeDashoffset: length2,
        });
        gsap.set(path3, {
          strokeDasharray: length3,
          strokeDashoffset: length3,
        });
        // Animate when scrolling
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          duration: 1.5,
          scrollTrigger: {
            trigger: path,
            start: "top 80%",
            toggleActions: "play none reverse none", // play once, no reset
          },
        });
        gsap.to(path2, {
          strokeDashoffset: 0,
          ease: "none",
          duration: 3,
          scrollTrigger: {
            trigger: path2,
            start: "top 80%",
            toggleActions: "play none reverse none", // play once, no reset
          },
        });
        gsap.to(path3, {
          strokeDashoffset: 0,
          ease: "none", 
          duration: 3,
          scrollTrigger: {
            trigger: path3,
            start: "top 80%",
            toggleActions: "play none reverse none", // play once, no reset
          },
        });
      }, [isMobile]);
      useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          const refs = [paragraphRef, paragraphRef2, paragraphRef3, paragraphRef4, paragraphRef5, paragraphRef6];
          refs.forEach((r) => {
            if (!r.current) return;
            const el = r.current;
            const existingSpans = Array.from(el.querySelectorAll(':scope > span'));
            const original = (el.dataset?.originalText && el.dataset.originalText.length > 0)
              ? el.dataset.originalText
              : (existingSpans.length > 0
                  ? existingSpans.map(s => s.textContent || '').join(' ')
                  : (el.textContent || ''));
            try { el.dataset.originalText = original; } catch (e) {}
            el.innerHTML = '';

            const words = original.split(' ').filter(word => word.length > 0);
            const wordSpans = words.map((word) => {
              const span = document.createElement('span');
              span.textContent = word;
              span.style.display = 'inline-block';
              span.style.color = '#a1a1a1ff';
              span.style.transition = 'all 0.3s ease';
              span.style.marginRight = '0.3em';
              return span;
            });
            wordSpans.forEach(span => el.appendChild(span));

            gsap.to(wordSpans, {
              color: 'transparent',
              background: 'linear-gradient(145deg, #ffb454 0%, #d75c33 100%)',
              backgroundClip: 'text',
              webkitBackgroundClip: 'text',
              webkitTextFillColor: 'transparent',
              duration: 0.2,
              stagger: 0.04,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "bottom 20%",
                scrub: 1,
              }
            });
          });

       

          // Animate .cls-5 path drawing on scroll
          if (pathRef.current) {
            const path = pathRef.current;
            const length = path.getTotalLength();
            console.log(length)
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;

            // Listen to scroll events and update strokeDashoffset based on scroll progress
            const handleScroll = () => {
              const scrollTop = window.scrollY;
              const docHeight = document.documentElement.scrollHeight - window.innerHeight;
              const scrollPercent = scrollTop / docHeight;
              const progressLength = length * scrollPercent;
              console.log(progressLength)

              // Use a range for floating point comparison
                const tolerance = 5; // widen the range

                


                // if (Math.abs(progressLength -  7915.037419768662) <= tolerance) {
                //     if (cls6Ref.current) {
                //     cls6Ref.current.style.opacity = '1';
                //     }
                
                // }
                // else if (progressLength < 7915.037419768662) {
                //     // Before target — keep hidden
                //     if (cls6Ref.current) {
                //     cls6Ref.current.style.opacity = '0';
                //     }
                // }

                //   if (Math.abs(progressLength -  13972.363185459288) <= tolerance) {
                //     if (cls1Ref.current) {
                //     cls1Ref.current.style.opacity = '1';
                //     }
                
                // }
                // else if (progressLength < 13972.363185459288) {
                //     // Before target — keep hidden
                //     if (cls1Ref.current) {
                //     cls1Ref.current.style.opacity = '0';
                //     }
                // }

                //      if (Math.abs(progressLength -  23735.23081433749) <= tolerance) {
                //     if (cls2Ref.current) {
                //     cls2Ref.current.style.opacity = '1';
                //     }
                
                // }
                // else if (progressLength < 23735.23081433749) {
                //     // Before target — keep hidden
                //     if (cls2Ref.current) {
                //     cls2Ref.current.style.opacity = '0';
                //     }
                // }
              // (opacity logic removed)
            };
            window.addEventListener('scroll', handleScroll);

            // --- GSAP ScrollTrigger animation for the path (restored) ---
            // NOTE: Having both GSAP and manual scroll can cause conflicts. Use only one in production.
            gsap.to(path, {
              strokeDashoffset: 0,
              scrollTrigger: {
                trigger: path,
                start: "top 80%",
                end: 6000,
                scrub: true,
              },
              ease: "none",
            });
            // --- End GSAP block ---
          }
        });

        // Cleanup
        return () => {
          try { ctx.revert(); } catch (e) {}
          [paragraphRef, paragraphRef2, paragraphRef3, paragraphRef4, paragraphRef5, paragraphRef6].forEach((r) => {
            if (!r.current) return;
            const el = r.current;
            let original = '';
            try { original = el.dataset?.originalText || ''; } catch (e) {}
            if (!original) {
              const spans = Array.from(el.querySelectorAll(':scope > span'));
              original = spans.length > 0 ? spans.map(s => s.textContent || '').join(' ') : (el.textContent || '');
            }
            el.textContent = original;
          });
          killAllGSAP();
        };
    
      }, [isMobile]);

   

    return(
   <>
            <section data-section="menifesto_banner" className="menifesto_banner inner_banner">
    <div className="inner_banner_flex">
        <div className="inner_banner_box">
            <div className="inner_banner_clip"></div>
            <Image src="/images/menifesto/banner_1.webp" alt="banner" className="banner_img" width="960" height="1080" />
        </div>
        <div className="inner_banner_box active">
            <div className="inner_banner_clip"></div>
            <Image src="/images/menifesto/banner_2.webp" alt="Banner" className="banner_img" width="960" height="1080" />
        </div>
    </div>
    <div className="inner_banner_container">
        {/* <h2 className="subtitle_473">The Manifesto</h2> */}
        <div className="subtitle_10877">
           Built for Growth, <br />
           Rooted in Purpose.
        </div>
    </div>
</section>

 {/* <picture>
        <source media="(max-width: 540px)" srcSet="/images/mobile.png" />
        <Image src="/images/desktop.png" alt="Contact" className="" width="1920" height="1080" />
    </picture> */}
<section data-section="menifesto_wrapper" className="menifesto_wrapper" id="purpose">
    <div className="menifesto_container">
        <h2 className="subtitle_220">
            <span className="text_bg d-none">PURPOSE</span>
        </h2>
        <div className="menifesto_content">
            <div className="subtitle_6113"><span className="text_bg">We&apos;re not just redefining real estate.</span></div>
            
            <p className="subtitle_25 manifestoPara1" ref={paragraphRef}>
                We&apos;re igniting a revolution of growth.
                Not just a roof, but a runway.
                Not just an asset, but a launchpad for identity, ambition, and progress.

                At the heart of this movement is a bold belief:
                Homeownership in India must evolve — from something you buy,
                to something that builds you.

                This is Growth Housing.
                A new category for a rising India.
                Built for the bold. Backed by belief.
                Fueling a generation that&rsquo;s not waiting to arrive — but ready to ascend.

                Growth Homes. For a nation built to grow.
            </p>
        </div>
    </div>
    <div className="menifesto_container" id="philosophy"> 
        <h2 className="subtitle_220">
            <span className="text_bg d-none">PHILOSOPHY</span>
        </h2>
        <div className="menifesto_content">
            <div className="menifesto_box_container">
              <div className="menifesto_box_content">
                <div className="subtitle_6113"><span className="text_bg">Tech-Powered Growth, Not Just Ownership.</span></div>
                <p className="subtitle_25 manifestoPara2" ref={paragraphRef2}>
                    We believe a home should be an enabler, not just a transaction. We design smart, future-ready ecosystems that spark growth: professional, personal, and social.
                </p>
              </div>
              <div className="menifesto_box_content">
                <div className="subtitle_6113"><span className="text_bg">Aspirational, Yet Accessible.</span></div>
                <p className="subtitle_25 manifestoPara4" ref={paragraphRef4}>
                    No compromises. No apologies. Our homes are thoughtfully designed, lifestyle-rich and future-forward — made within reach for those who stretch.
                </p>
              </div>
              <div className="menifesto_box_content">
                <div className="subtitle_6113"><span className="text_bg">Community, Not Commodity.</span></div>
                <p className="subtitle_25 manifestoPara5" ref={paragraphRef5}>
                    We build more than buildings. We cultivate environments — walkable, connected, inspired — where like-minded individuals grow together.
                </p>
              </div>
              <div className="menifesto_box_content">
                <div className="subtitle_6113"><span className="text_bg">The New Indian Standard.</span></div>
                <p className="subtitle_25 manifestoPara6" ref={paragraphRef6}>
                    This is Growth Housing — a category that reflects the rising standard of what Indians deserve, not just what they can afford.
                </p>
              </div>
            </div>

        </div>
    </div>
    <div className="menifesto_container" id="pledge">
        <h2 className="subtitle_220">
            <span className="text_bg d-none">PLEDGE</span>
        </h2>
        <div className="menifesto_content">
            <div className="subtitle_6113"><span className="text_bg">You are not just buying a home.</span></div>
            <p className="subtitle_25 manifestoPara3" ref={paragraphRef3}>
                Not Just Real Estate. A Real Belief. This is more than a purchase.
                It&rsquo;s a pact between ambition and opportunity.

                A home that mirrors your mindset.
                A space that grows with your spirit.

                Not shaped by the past — but built for the bold.
                Where hustle is honoured, and potential is powered.

                We don&rsquo;t sell homes.
                We stand by the self-made.
                We build for the next leap.

                Because growth isn&rsquo;t a luxury. It&rsquo;s your right.
            </p>
        </div>
    </div>
    <div className="menifesto_img">

    {isMobile ? (

      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 410.36 1315.2">
        <defs>
            <style>
                {`
                .cls-1 {
                    fill: url(#linear-gradient);
                }

                .cls-2 {
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke: url(#linear-gradient-2);
                }

                .cls-3 {
                    fill: url(#linear-gradient-3);
                }

                .cls-4 {
                    fill: url(#linear-gradient-4);
                }

                .cls-5 {
                    fill: url(#linear-gradient-5);
                }

                .cls-6 {
                    fill: url(#linear-gradient-6);
                }

                .cls-7 {
                    fill: url(#linear-gradient-7);
                }

                .cls-8 {
                    fill: url(#linear-gradient-8);
                }

                .cls-9 {
                    fill: url(#linear-gradient-9);
                }

                .cls-10 {
                    fill: url(#linear-gradient-10);
                }

                .cls-11 {
                    fill: url(#linear-gradient-11);
                }

                .cls-12 {
                    fill: url(#linear-gradient-12);
                }

                .cls-13 {
                    fill: url(#linear-gradient-13);
                }

                .cls-14 {
                    fill: url(#linear-gradient-14);
                }

                .cls-15 {
                    fill: url(#linear-gradient-15);
                }

                .cls-16 {
                    fill: url(#linear-gradient-16);
                }

                .cls-17 {
                    fill: url(#linear-gradient-17);
                }

                .cls-18 {
                    fill: url(#linear-gradient-18);
                }

                .cls-19 {
                    fill: url(#linear-gradient-19);
                }

                .cls-20 {
                    fill: url(#linear-gradient-20);
                }

                .cls-21 {
                    fill: url(#linear-gradient-21);
                }

                .cls-22 {
                    fill: url(#linear-gradient-22);
                }

                .cls-23 {
                    fill: url(#linear-gradient-23);
                }

                .cls-24 {
                    fill: url(#linear-gradient-24);
                }

                .cls-25 {
                    fill: url(#linear-gradient-25);
                }

                .cls-26 {
                    fill: url(#linear-gradient-26);
                }

                .cls-27 {
                    fill: url(#linear-gradient-27);
                }

                .cls-28 {
                    fill: url(#linear-gradient-28);
                }
                `}
            </style>
            <linearGradient id="linear-gradient" x1="115.64" y1="7919.75" x2="292.78" y2="7919.75"
                gradientTransform="matrix(1, 0, 0, -1, 0, 8064.6)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#faa951" />
                <stop offset="1" stop-color="#dd6a38" />
            </linearGradient>
            <linearGradient id="linear-gradient-2" x1="0" y1="710.79" x2="410.36" y2="710.79"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-3" x1="114.4" y1="575.4" x2="291.53" y2="575.4"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-4" x1="113.53" y1="1178.17" x2="290.56" y2="1178.17"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-5" x1="169.26" y1="1269.1" x2="244.22" y2="1269.1"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-6" x1="58.86" y1="27.12" x2="284.57" y2="25.09"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-7" x1="58.86" y1="27.73" x2="284.58" y2="25.7"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-8" x1="58.86" y1="27.72" x2="284.58" y2="25.69"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-9" x1="58.86" y1="27.91" x2="284.58" y2="25.87"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-10" x1="58.87" y1="28.24" x2="284.58" y2="26.2"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-11" x1="58.87" y1="28.5" x2="284.58" y2="26.46"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-12" x1="58.87" y1="28.73" x2="284.59" y2="26.7"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-13" x1="29.42" y1="450.54" x2="332.4" y2="444.44"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-14" x1="29.43" y1="451.3" x2="332.42" y2="445.2"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-15" x1="29.44" y1="451.74" x2="332.43" y2="445.64"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-16" x1="29.45" y1="452.1" x2="332.43" y2="446"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-17" x1="29.46" y1="452.59" x2="332.44" y2="446.49"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-18" x1="29.47" y1="453.17" x2="332.46" y2="447.07"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-19" x1="29.48" y1="453.75" x2="332.47" y2="447.65"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-20" x1="29.49" y1="454.17" x2="332.48" y2="448.07"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-21" x1="29.51" y1="454.93" x2="332.49" y2="448.83"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-22" x1="29.52" y1="455.44" x2="332.5" y2="449.34"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-23" x1="68.21" y1="1075.82" x2="241.64" y2="1080.77"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-24" x1="68.23" y1="1075.02" x2="241.66" y2="1079.97"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-25" x1="68.25" y1="1074.22" x2="241.68" y2="1079.18"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-26" x1="68.27" y1="1073.68" x2="241.7" y2="1078.63"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-27" x1="68.3" y1="1072.66" x2="241.73" y2="1077.62"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-28" x1="68.32" y1="1071.91" x2="241.75" y2="1076.86"
                gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#linear-gradient" />
        </defs>
        <path className="cls-1"
            d="M292.78,160.07a88.9,88.9,0,0,1-2.7,21.79c-7.33.14-13.91,3.36-21.3,7.94-12.72,7.89-7.2,20.68-7.51,24.76s-15.54,3.6-20.81,3.6-7.68,0-7.53-5.12,4.16-11.68,6.1-17.92,2.38-11.76,3.1-13.92a8.77,8.77,0,0,0-.82-8.09c-2-3-1.82-4.63-2.21-12.93s-15.69-33.47-19.4-40.27-7.09-11-17.28-13a20.68,20.68,0,0,0-20.29,7.28c-2.64,3.6-1.92,7.92-1.48,13.38s2.44,6.06,3.64,8.46-.24,6.48-.2,8.4,1.64,1,3.12,1,1.16.21,1,.7-.53,1.19.39,1.31,1,.6,1.69,1.48a4.27,4.27,0,0,0,2.52,1.54c1,.26.39,2.86,2.11,3.38s3.56-.76,5.91-1.22,3.17.46,3.41,1.23-.24.67-2.12.07S198,156.47,196,166.7s-3.56,10.42-6.08,14.65.36,13.28.12,15.44-6.24-3.6-8.28-4,1.32-1.8-.87-3.52-16.53-13.39-19.06-16.24S149,159.35,147.79,158.51s-6.46,11.17-7.12,13-.54,2,.19,2.36-1.82,1.9-1.82,1.9,16.92,14,19.9,16.08,3.26,4.67-.91,1.59-8.31-1.24-14.41,1.6c-4.8,2.24-9.44,12.32-11.34,16.7a88.57,88.57,0,1,1,160.5-51.7Z" />
        <path className="cls-2"
            d="M93,229v-44.6s-3.12-4.53-2.16-9.57,3.6-3.12,3.84-1.44a25.18,25.18,0,0,1-.72,8.88c-1,3.84-2.16-2.88-2.16-5.28s.67-5.91.94-9.32a127.25,127.25,0,0,0,0-13.58c-.22-.39-24,.81-20.14,2.73s27.6,1.68,32.16,1.2,11.76-1,7.68-2.64S99.73,154.1,94.54,154s-22.83,2.51-22.41,1.1,7.86-30,8.58-30.69,12.48-1.2,17.28-1,7.2,0,7.92,3.36,6.48,24.72,6.48,26.64,1,2.88-1.68,2.88-7.68-1.44-7.68,1,5.76,8.41,4.56,13.21-2.4,22.8,1.44,25.92S119.83,208.2,117,212s3.6,14.88,6.48,14.4,2.88-2.35,2.88-2.35,8.94-18.91,14.05-25.59,10.65-6.56,12-6.56a13.24,13.24,0,0,1,11.59,7.89c3.12,7.16,5.44,7.66,6.87,8.33s7.36,2.8,10.41,4.66,11.07,4.36,10.56,5-6.35-.33-9-3.34-9.36-5.35-10.36-5.85-4.68-2-5.35-6.19-2.16-4.51-3.34-5S161,195,161.36,194s1.45-.88,2.56,0,6.46,3.7,7.13,3.36-2.16-1-1.17-1.51,7,.39,8.83,2.12,5.13,6.29,7.51,7.1,14.14,3.84,20.46,4.32,8.66.83,9.16-2.68-3-25.89-1.58-32.4,4.2-13.58,2.4-12.73-2.27,7-4.55,11.29-3.81,7.3-9.23,6.87-4.77-7.28-3.63-9.22c0,0,8.44-15.54,4.12-16.5s-6.48,7.92-7,10.57-1.44,9.12-4.8,13.68-2.64,10.32-2.16,13.44,2.16,6.48,0,5.76-8.16-7-9.36-6.12-5.28,4.68-3.6,3.72,6.24-5,4.8-5.52-7.92-4.56-17.52-14.4-15.84-18-16.8-16.57-7.44,14.41-6.72,14.89,21.6,19,21.84,19,.24,1.92-1.2,1-22.08-16.8-21.84-17.52,2.88-2.4,3.6-1.68,20.64,18,21.84,19a16.69,16.69,0,0,0,3.84,2.16c.72.24,3.36-1.44,5-.72s2.88,1.44,5.28,0,1.68-2.88,3.12-1.68,7.68,6.48,8.64,5.28-3.12-11.76.24-17.52c0,0,4.8-5.52,5-9.6s3.12-16.81,6.72-16.57,2.16-1.2.72-1.68a4.65,4.65,0,0,0-2.81,0c-1.52.88-5.7,2.05-6.7.21s-.84-2.51-.84-2.51-1.84,0-2.34-1.17-1-1.5-1.5-1.68-1-.67-.84-1.17.5-.83-.33-1-3.68.68-3.68-1,1-5.68.5-7.18-3-3.68-3.34-6.52-3.18-10.91,1.5-16.74,13.66-8.18,22.46-6.76,14.57,13.13,20.36,23c6.1,10.44,14.25,29.42,14.55,33.16s.8,6.67-.54,5-5.43-10.61-6.56-11.14,8.38,12.47,9.14,19c.33,2.88-1.51-.38-4.19-4.95-3.43-5.84-8.22-13.82-11.6-13.92-6-.17-17.84,5.76-19.61.38s3.52-12.51,2.79-18.23-3.14-14.2-5.45-12.22-3.92,6.22-9,3.6-14.16-6.11-13.77-9.21,3.72,4.42,11.57,5.59,3.52,5,7.86,1.17,10.7-.5,9.69,11.7c0,0-2.67,9.77-2.75,11.82s-1.76,6.9,1.92,7.4,14.88-4,17.55-2.67,6.35,5.52,8.86,9.86,5.24,9.29,5.46,14.92-4.17,20.27-6.91,26-2.49,10,2.73,10.35,20.79,1.2,23.92-3.41c0-.05-3.56-12.45,4.33-21.71,3.3-3.86,8.08-6.56,13.19-8.3a44.4,44.4,0,0,1,28.47.18c25.69,8.57,100.89,40.6,86.91,118.46-2.65,14.78-14.48,74.14-13,88.83,8,78,49,121,16,176-11.35,18.91-47.6,28.54-60.83,28.13a31.28,31.28,0,0,0-26.14,12.59c-.9,1.22-1.4,2.06-1.31,2.25.72,1.44,10.36-3.12,9.26,0s-17.18,42-19.1,43.68,2.64-2.64,14.4-3.36S331,659,327.88,665.22s-3.36,9.12-14.4,16.08-18,10.56-18,11.28,9.6-8.4,22.08-10.32,17,4.56,14.88,7-21.36,15.85-24.24,16.57-47.28-.72-48.72-.72,7.44-10.33,13-11.05,49-1.92,52.08-1.44,5.76,4.56,5.28,7.2-.72,1.69-1.44-1.92-4.08-4.8-7-4.56-26.16,1.68-27.12.72,1.92-1.92-1.44-3.84-20.16-4.32-25-8.64-14.64-13.44-22.8-13.2-33.6,6.72-42.24,11.76-16.09,12.48-8.17,21.37,39.53-1.21,44.13-2.77,6.12-1.56,7.76,0,9.08,5.41,11.24,5.17a14.61,14.61,0,0,0,8.71-5.17c3.05-3.48,4.73-5.64,8.33-6.12s17.76,1,18.48-.24-1-4.08-11-6.24-19-6.48-17.28-8.64S304.12,659,306,658s-2.4-4.8-8.4-1.2S284.2,663.3,283,663.06s24.72-51.84,24.48-50.64-21.6,48.24-23,49.44-5.28.72-10.56,1.2-44.4-2.88-44.4-2.88c-2.16-.24-3.36-1.44,0-3.12s3.84-1.68,5.76-1,5.28,1.68,8.4.24,2.16-2.4,6.24-.48,7.2,4.08,8.64,2.88c.89-.74.21-2.88-1.7-4.74a11.12,11.12,0,0,0-4.78-2.7c-5.28-1.44-6.24-1.2-6.72-1s8.4,1,10.8,4.08,3.12,4.8,4.32,3.36c.65-.78.45-3.7-1.57-6.31-1.64-2.13-4.5-4.05-9.08-4.46l-.39,0s6.72,1,8.4,4.08,3.6,7,5,6.48,1.68-1,.24-4.08-4.08-7-5.52-7,7,10.32,7.92,10.56,2.16-.48,1-3.12-5.28-11.52-11.76-12-12,.56-22.32,3.36c-11,3-11.28,1.92-7.2.72s3.6-3.6,4.32-4.56-7.92-1.92-7.2-13.44,1.68-17.28,1.2-20.4-1.68-4.32-4.56-5.52-6-.9-6-2.64c0-9.9,1.63-9.75,4.08-2.88,1,2.72,4.08.72,4.56-1.2s-2.4-2.88-5.76-1.44-5,4.8-6.48,6.24-2.64.72-1.92-1.68a14.68,14.68,0,0,1,5-6.72c1.68-1-4.8,6-5.76,4.8s1.2-5.76,3.84-7-3.84,5-5.28,5-3.6-1.68-.72-3.6,7.72-5,7.44-4.56c-1.2,1.92-9.84,5.76-9.12,3.84a11.35,11.35,0,0,1,9.12-6.48c5.52-.72,12,1.92,14.64,7.2s11.76,37,9.84,43-8.16,15.87-37.08,13.94c0,0-5.17-3.62-10.93-3.14s-12.24,9.84-9.12,9.84,6.24-2.64,7.92-5.76,1.44-10.8.48-17.76-4.8-23.28-5-19.92,4.08,17.52,4.32,24-.48,11.52,2.88,10.8,9.85.3,9.49,4.83-1.33,15.57-4.21,17-.48,1,4.21-.1,12.84-2.3,21-7.1,7.92-6.24,9.84-5.52-23.76,12.72-29.52,13.68-22.33,6.48-28.33-3.6-17-32.16-15.84-49.68,6-23,9.6-25.92,4.56-5.28,8.88-4.8,12.48,3.36,16.08,10.8,5.76,7.68,6,2.88-2.64-10.56-1.68-13.2,9.47,2.09,9.06,2.48-5.21-4.64-7.38-4.16.48-1.68,3.37-1,4.08,1.92,5.28-.48.24-9.6,3.6-10.32,3.12-1.68,2.4-4.08-1.92-4.56-.72-6.49,1.92-8.4,1.68-9.84-2.64-.24-4.56-1.2-3.6-3.12-6.24-2.16-2.16,1.16-2.52,3.1-.12,3.14-2.77,3.86-2.88.48-3.84,2.16-1.2,4.32-2.16,3.36.24-5.28-2.4-6.24-7-2.16-7,4.08,2.4,8.89,4.08,8.65,1.92-1,1.92-1A2.15,2.15,0,0,1,186,568c-1.2.48-2.64,2.88-2.64,2.88s-3.36-1.2-3.36,0-1.44-4.32-3.12-7a21.86,21.86,0,0,1-2.78-12.73,19.62,19.62,0,0,1,2.78-8.4c5.52-9.12,12.24-9.12,13.68-8.16s1.92,1,2.64.24a5.51,5.51,0,0,1,6.73-.72c3.36,1.92,4.32,4.32,5.76,3.6s6.48-1.44,8.88,1.68,1.68,7.2.24,8.4-3.6,2.88-1.92,2.16a6.49,6.49,0,0,0,3.84-8.16c-1.44-5-6.24-6.48-11.28-4.8-1-.24-1.2-.24-2.64-1.92s-5.77-3.6-8.41-1.68-2.16,1.92-3.12,1-6.72-1-8.88,1.44-8.16,3.84-9.12,14.16,7.44,18.25,6,24-5.52,11.28-7.92,12.24-12.48,8.16-14.64,21.12c0,0-6.72.72-9.6,5.28s-4.32,7.92-3.84,11.52,5,47,7,47-7.92-47-5.52-46.56,5.52,11.28,7.2,22.08,1.92,22.32,6.24,24.48,3.84,6,0,9.84-10.27,4.54-31.16-1.22-55-.24-75.12,6-41.76,6-46.56-2.88S.84,658.77,16.2,659c14.86.23,21.09,40.77-3.45,87.32L9.2,754c-3.64,9.91-17,28.79-1,100,9.41,41.85-7.06,98.34-2.33,129.33,6.66,43.64,23.41,61.59,13.35,91.26,0,0-21.66,45.09,2.34,67.09s37,1.47,30-10.76c-6.79-11.87-50.29,7.54-44.67,52.53,0,.23,3.42,42.5,23.39,61.73,31.06,29.91,31.07,38.6,26.9,50.65s4.14,21.76,11,18.07c0,0,18.46-13.42,42.23-6.37s54.25,1.7,56.11-1.78.8-35.57.12-39.31-1.93-3.51-1.76-1.47,3.4,12.45,4.7,20.71-.79,15.91-.51,18.74,7.87-10,7.75-18.91-6.22-23.23-8.51-24.12-8.92,3.65-15.71,2.63-37.69-24.37-36.8-22.5,18.72,15.58,20.89,16.77,12,9.08,22.07,6.49,36.33-14.9,38.16-16.17-4.29-12.82-6.67-13.67-11.67,4-22.88,6.45-15.62,3.36-14.85,4.76,3.35-1,2.63-3.48-23.73-26.91-23.94-25.64,6.58,10.53,14.6,14.9,10,10.31,10.61,9.66,2.31,1.44,3.29.31-2.48-11.16-13.35-18.84-13.79-8.69-13.82-9.71,1.72-1.95.56-2.21-2.69.63-3.62-.48-9.79-8.71-9.79-10.55,4.56-5.47,4.87-5-.77,1-.09,2.23,25.24,21.37,28.58,25,7.39,16.92,8.21,18,7.49-1.11,8.26-.7,15.64-5.18,16.93-6.12-3.65-1.21-3-2.84,3.33-1.4,2.91-.85-6.28,2.55-9.53,2.55-3.76.53-2.95.89,2.19-.47,1.68-1.57-12.29-8-14.88-11.82-4.29-9.17-7.26-11.59-4.05-1.74-3.91-1.29,5.1,3.88,7.22,9.06,6.17,22.84,4.81,22.32-3.34-10.72-6.73-17.49-29.21-23.74-29.35-24.62,3.48-3.39,3.34-5.51-5.15-11.92-3.57-21.77,15.07-10.07,16.05-10.58-3.18-.51-2.46-1.1,6.87.48,10.3,2.09,6.22,3.28,7,6.91-7.3,1.52-9.48,3.73-.14,2.63-.68,5.07-4.05.87-5,3,.8,5.68-1.41,5.85-4.08-6.84-8.15-5.83.37,9.85,3.39,9.46-.25-8.69-2.6-8.27-.23,9.26-1.75,9.26-3.68-9.14-2.78-14.46,9.65-7.64,9.94-6.74-4.31,3.68-3.4,3.79,6.74-5.29,8.52-4.81-3.17,6.82-2,6.6,4.33-6.37,9.93-6.26,7.73,9.71,7.73,11.26-.88,2.78-.65,4.08,2.21,5,2.18,6.48-2.1.57-3.14,1.78,0,9.29-3.17,10.9-13.05-4.84-13.33-6,4.59,2.51,6.65,3.61-.62,7.43-1.25,7.79S130,1195.05,127.84,1195s-16.79,14.33-20.64,22.82-2.55,18.11.45,27.57,7.8,23.55,7.93,35.91-4.84,23.68-2.89,24.45,5.49-4.79,13-4.39-4.76,6.62.73,7.13,27.57-2.6,37.41-2.71,11.44,5.66,23.78,2.43,18.23-17.87,40.9-8.07,38.5,8.07,38.22,4.67-22.41,1.47-23.55-2.94.15-32.63,1.16-34.58,35.92-25.56,35.62-23.18-28,19-36.42,21.74-12.35,1.61-18.17-1.83-20.63-9-22.24-12,2.78-11.89,5.54-14,3.8-.85,4-1.55-1.66-2-3.4-2.19-7.83,6-8.41,9,2,3.51,2,2-4.5-3.44-7.18-5.69-2.29-3.67-4.92-6-4.71-4.84-3.52-5.92,5.56,3.37,4.22,3.77-4.41-4.81-4.2-7,1.62-1.06,2.45,0,4.81,3.58,3.21,4.12-5.23-4.8-5.17-6.91,1.79-1.61,2.7-.83,6.25,4.65,5.19,5.2-6.79-5.77-6.88-6.69,1.45-1.94,3.33-1,7.75,6.07,10.36,7.4,3.18.63,3.1.25-3-4.23-2.51-5.59,2.73-2.09,3.58-2,2.31,2,.6,2.89-2.82-1.56-4.36-2-2.09,2.84-3.64,1.66,1.72-5,3.62-5.13,2.32,2.14,1.56,2.08-3.59-2.68-5.45-2.5-2.76,3.54-3.94,3.46-2.32-1.21-2-1.93,4-.5,4.09,1.22.14,2.86,1.28,3.61,4.64,3.36,5,3-2.32-2.77-.91-3.61,1.11,1.1,3.85,1.49,3.3,5.8,3.3,8-.2,5.77,3,7.21,10.75,7.39,17.23,8.55,10.61,2.83,9.85,5.26-3.82-2,2.21-9.31,14.73-20.07,15.45-18-15.07,20.54-17.83,20,10.06-16.77,9.34-18.29-7.47,8.06-11.76,8.36-26.23-5.31-26.23-3.82,9,3.21,12.21,3.82c18.89,3.54,18.82-.94,30-14.14s11.59-14.77,17.24-18.63,9.72-4.27,9.83-5-.54-2.63-1.38-2.63-17.45,9.66-19.38,11-1.51-1.5-4.33-1.8-4.78,1.53-6.05-1.59-.89-7.75-3-8.66-3.94-1.21-4-3.27,2.69-4.8,2-7.17a16.45,16.45,0,0,1,1.93-11.21c2.23-3.59,6-4.87,6.42-3.08s-3.48,5.8-3,8.85,4.47,2.66,5.09,4.45-1.1,5,.66,4.55,3.84-7.33,7.72-6.22.71,12.11-2,11.15-1.69-9.88.88-10.11,3.79,5.21,4.5,8.83,9.17,4.08,10.05,2.66,6.14-13.07,1.78-21.62-10.84-9.22-10.78-8.09,2.54.31,2-1.16-9.85-4.13-15.23-1.13-9.56,2.2-9.59,3.25.42,2.86,3.2,2.77,6.48-1.35,6.85.51-1.42,5.32-1.5,7.87,7.16-.08,13.18.76.68,7.93,1.59,10.73,8.23,2.72,8.43.25-2-1-2.26,2.27,1.84,4.47,1.07,5.49-14,7.72-18,12.93-1.81,10.61-3.16,10.36-1-6.26,1.86-6.54,3.17,5.86,2.1,7.67-3,2.6-2.83,1.61,7.35-3.48,8.71-5.29-1.37-3.78.46-4,2.92,2.08,4.24,1,.43-5.69,9.38-7.64,4.59-7.6,3.95-6.92,8.49,12.57,11.12,30-2.46,36.22-2.21,45.9,9,23.94,6.29,29.46-30,4-26.49,1.44,42.36,6.8,44.4,4-14.6-4.07-11.12-6.36,22.16,5.35,32.22-2.42" />
        <path className="cls-3"
            d="M291.53,585.42a88.32,88.32,0,0,1-27.25,63.92c-1.95-1.65-3.91-4.93-5.86-6.56-2.88-2.4-13.44-1-19.2.48s-12,3.36-13.68,2.88,3.36-2.4,5.52-3.84,3.12-3.6,4.8-6.66,1-4.14,0-10.62-5-23-7.68-31.2a15.28,15.28,0,0,0-15.84-10.32c-4.8.72-6.48,2.88-7.68,3.6s-3.36-1.44-4.8-2.64-3.6-1-1.92-1.68,5,.72,6.24,1,1.92-1.68,2.16-5.76,1.44-4.56,1.92-5.76,3.12-.24,4.08-1.68-1-2.4-1.68-5.76.79-4.43.79-4.43c1.28-2.5,1.37-7.34,1.28-8.55s-.15-1.67,1.81-2.72,2.38-2.94,2.36-5.91-6-8.88-10.56-6.24c-1.79,1-2.4.24-4.32-2.4s-6.72-2.4-8.88-.24c-1.68,1.68-1.35-.24-5.28-.24-3.6,0-9.66,2.77-12.49,12s1.21,17.29,2.84,20.44,1.73,9.09-1.38,13.68-5.07,5-11.32,10.53S158.32,603.9,157,606s-3.51,2.25-7.33,4.08-5.54,8-6.43,11.89c-.72,3.13,2.35,24,3.58,32a88.57,88.57,0,1,1,144.68-68.53Z" />
        <path className="cls-4"
            d="M290.56,1210.55q0,3-.19,5.91c-2.49-5.92-7-15.87-7.57-17.15-.7-1.62-2.55-3-3.24-4.4s-2.09-2.08-2.79-2.78,1.16-4.17,1.86-6.26.69-3.71.69-9.73-5.56-11.59-7.18-12.28a8.46,8.46,0,0,1-3-2.09c-.7-.7-1.39-1.16-3.71-1.85a32,32,0,0,0-9-.7c-1.39.23-4.64,2.32-6.72,2.78a37.52,37.52,0,0,0-5.1,1.39c-1.16.47-.46,1.62,1.16,3s4.4,1.16,2.78,1.86-2.78,2.32-3.94,5.1-.93,7-.93,7.88.47,2.08.23,3.24-1.85,2.78-1.85,5.33,1.85,2.32,2.78,2.55a3.41,3.41,0,0,1,2.32,2.09c.46,1.16,1.39,6.26,2.32,7.88s2.55.92,3.94.69a5.59,5.59,0,0,1,4.17,1.63c.92.92.46.46.23,1.15s-1.62,1.86-2.32,3.71-1.62,2.32-2.08,4.17a6.06,6.06,0,0,0,.46,4.64c.7,1.16-1.16,2.32-2.55,3.94a139.12,139.12,0,0,1-10.2,9.73c-2.31,1.86-3.24,2.09-5.1,2.32s-17.38-3-22-3.71-4.41-1.39-4.64-2.78a13.69,13.69,0,0,0-1.62-4.63c-.7-.93,0-1.86.23-2.79s-1.16-2.31-2.08-2.08a1,1,0,0,1-1.39-.93,1.84,1.84,0,0,0-.93-1.85c-.93-.47-1.16.23-1.51.44s-1.5-.44-2.43-.67-1.39.23-2.09.69a2.13,2.13,0,0,1-2.32.23,1.87,1.87,0,0,0-2.31.7c-.47.69,0,1.16-.47,1.16s-2.08-.47-3,0-.46,1.62-.69,1.62-.7.46-.7,1.39a5.12,5.12,0,0,1-.7,2.32c-.46,1.16.47,2.08.47,3.24s-.23.93-.93,1.62a8.54,8.54,0,0,0-1.62,2.32c-.46.93-4.4,1.16-6.95,1.62s-3-1.15-3.48-.92-8.81-6-11.36-8.58-3-2.55-5.33-7.65-5.1-7.41-6.49-7.88-3.24-3-3.94-4.4a1.9,1.9,0,0,1,.47-2.32s3.71,1.16,4.86.93,1.51-1,2.21-2.2.69-5.8.92-7.65,1.39-1.85,2.78-2.09.7-.92.7-1.85-1.62-4.87-1.85-6,.69-2.78.23-5.56a21,21,0,0,0-3.25-7.18c-.69-.93.7-1.16,1.39-1.86s-1.62-4.63-4.63-6.25-9-3.48-10.43-3.48-.46.93-2.78,1.62-5.1.93-9.74,4.19-3.7,10.65-3.47,14.59,3.47,10.66,3.47,12.74-1.85,3.94-2.78,4.87-1.39.46-1.62-.23-2.55,1.62-3.71,3.47-.69,1.86-.69,3-2.32,3-5.1,5.56a13.44,13.44,0,0,0-1.13,1.2,88.53,88.53,0,0,1,177,2.27Z" />
        <path className="cls-5"
            d="M243.86,1273.48c-.19,2.45-.78,12.15-1,15.64a88.7,88.7,0,0,1-68.14,5.67,4.82,4.82,0,0,0,.3-.69c3.25-9.73,1.39-13.44.47-16.91s-4.41-11.59-5.57-14.14-.69-2.09.47-2.55,23.17-10.43,25.72-11.59.47-4.17-.69-7-.93-3-.47-2.78,5.57,3.47,5.57,3.47,0,2.32,1.15,3a3.33,3.33,0,0,1,1.16,4.17c-.69,1.85,1.39,3.71,3.25,4.63s12,5.8,20.62,10,13.21,2.32,15.76,1.62S244.1,1270.46,243.86,1273.48Z" />
        <path className="cls-6"
            d="M115.79.65c12.09,0,14.5,4.35,14.5,14.82v4c0,10.33-2.41,14.82-14.43,14.82h-1.69V52.65h-6.5V.65Zm-1.62,6.5V27.76h1.69c7,0,7.93-1.82,7.93-8.32v-4c0-6.56-1-8.32-7.93-8.32Z" />
        <path className="cls-7"
            d="M152.78.65h6.5V38.81c0,10.46-3.71,14.49-11.25,14.49s-11.24-4-11.24-14.49V.65h6.5V38.81c0,6,1,8,4.74,8s4.75-1.95,4.75-8Z" />
        <path className="cls-8"
            d="M188.4,48c0,2,.06,3.83.71,4.61h-6.5c-.65-.78-.71-2.66-.71-4.61V38.68c0-6.7-3.9-7-7.87-7h-1.75v21h-6.5V.65h8.12c11.77,0,14.56,4.35,14.56,14.17v2.34c0,6-1.43,10.21-5.78,12.35,3.7,1.24,5.72,4.1,5.72,10.14ZM182,14.82c0-5.91-1.36-7.67-8-7.67h-1.69v18H174c6.63,0,8-2.47,8-8Z" />
        <path className="cls-9"
            d="M203.09.65c12.09,0,14.49,4.35,14.49,14.82v4c0,10.33-2.4,14.82-14.43,14.82h-1.69V52.65H195V.65Zm-1.63,6.5V27.76h1.69c7,0,7.93-1.82,7.93-8.32v-4c0-6.56-1-8.32-7.93-8.32Z" />
        <path className="cls-10"
            d="M246.25,14.5V38.81c0,10.46-3.71,14.49-11.25,14.49s-11.24-4-11.24-14.49V14.5C223.76,4,227.46,0,235,0S246.25,4,246.25,14.5Zm-6.5,0c0-6.05-1-8-4.75-8s-4.74,1.95-4.74,8V38.81c0,6,1,8,4.74,8s4.75-1.95,4.75-8Z" />
        <path className="cls-11"
            d="M274.91,39.78c0,8.58-3.12,13.52-10.72,13.52-8.45,0-11.77-4.35-11.77-18.39h6.5c0,9.94,1.43,11.89,5.27,11.89,3.05,0,4.22-1.56,4.22-7,0-5.65-1.82-7.8-6.63-11.57-4.61-3.57-9-7.15-9-15.66C252.75,4.88,256,0,263.54,0s11,4.88,11,15.8h-6.5c0-7.8-1.76-9.3-4.55-9.3s-4.29,1.5-4.29,6.05c0,4.74,2.27,7,6.11,9.94C270.88,26.72,274.91,30.36,274.91,39.78Z" />
        <path className="cls-12" d="M298,.65v6.5H287.91V23.4H298v6.5H287.91V46.15H298v6.5H281.41V.65Z" />
        <path className="cls-13"
            d="M78.68,423.65c12.09,0,14.49,4.35,14.49,14.82v4c0,10.33-2.4,14.82-14.43,14.82H77.05v18.39h-6.5v-52Zm-1.63,6.5v20.61h1.69c7,0,7.93-1.82,7.93-8.32v-4c0-6.56-1-8.32-7.93-8.32Z" />
        <path className="cls-14" d="M116.83,446.4V423.65h6.5v52h-6.5V452.9H106.17v22.75h-6.5v-52h6.5V446.4Z" />
        <path className="cls-15" d="M129.83,475.65v-52h6.5v52Z" />
        <path className="cls-16" d="M149.33,423.65v45.5h10.08v6.5H142.83v-52Z" />
        <path className="cls-17"
            d="M186.77,437.5v24.31c0,10.46-3.7,14.49-11.24,14.49s-11.25-4-11.25-14.49V437.5c0-10.47,3.71-14.5,11.25-14.5S186.77,427,186.77,437.5Zm-6.5,0c0-6.05-1-8-4.74-8s-4.75,1.95-4.75,8v24.31c0,6,1,8,4.75,8s4.74-1.95,4.74-8Z" />
        <path className="cls-18"
            d="M215.44,462.78c0,8.58-3.12,13.52-10.73,13.52-8.45,0-11.76-4.35-11.76-18.39h6.5c0,9.94,1.43,11.89,5.26,11.89,3.06,0,4.23-1.56,4.23-7,0-5.65-1.82-7.8-6.63-11.57-4.62-3.57-9-7.15-9-15.66,0-7.67,3.25-12.55,10.79-12.55s11.05,4.88,11.05,15.8h-6.5c0-7.8-1.75-9.3-4.55-9.3s-4.29,1.5-4.29,6.05c0,4.74,2.28,7,6.11,9.94C211.41,449.72,215.44,453.36,215.44,462.78Z" />
        <path className="cls-19"
            d="M244.1,437.5v24.31c0,10.46-3.7,14.49-11.24,14.49s-11.25-4-11.25-14.49V437.5c0-10.47,3.71-14.5,11.25-14.5S244.1,427,244.1,437.5Zm-6.5,0c0-6.05-1-8-4.74-8s-4.75,1.95-4.75,8v24.31c0,6,1,8,4.75,8s4.74-1.95,4.74-8Z" />
        <path className="cls-20"
            d="M258.73,423.65c12.09,0,14.49,4.35,14.49,14.82v4c0,10.33-2.4,14.82-14.43,14.82H257.1v18.39h-6.5v-52Zm-1.63,6.5v20.61h1.69c7,0,7.93-1.82,7.93-8.32v-4c0-6.56-1-8.32-7.93-8.32Z" />
        <path className="cls-21" d="M296.88,446.4V423.65h6.5v52h-6.5V452.9H286.22v22.75h-6.5v-52h6.5V446.4Z" />
        <path className="cls-22" d="M318.59,475.65v-18.2l-10-33.8h6.89l6.37,25.48,6.37-25.48h6.89l-10,33.8v18.2Z" />
        <path className="cls-23"
            d="M136.14,1051.65c12.09,0,14.49,4.35,14.49,14.82v4c0,10.33-2.4,14.82-14.43,14.82h-1.69v18.39H128v-52Zm-1.63,6.5v20.61h1.69c7,0,7.93-1.82,7.93-8.32v-4c0-6.56-1-8.32-7.93-8.32Z" />
        <path className="cls-24" d="M163.63,1051.65v45.5h10.08v6.5H157.13v-52Z" />
        <path className="cls-25" d="M196.46,1051.65v6.5H186.38v16.25h10.08v6.5H186.38v16.25h10.08v6.5H179.88v-52Z" />
        <path className="cls-26"
            d="M210.76,1051.65c10.46,0,14.82,2.47,14.82,13.85v24.31c0,11.24-4.36,13.84-14.82,13.84H203v-52Zm-1.3,6.5v39h1.36c6.31,0,8.26-1,8.26-7.34V1065.5c0-6.38-2-7.35-8.26-7.35Z" />
        <path className="cls-27"
            d="M254.57,1071.28h-6.5v-5.78c0-6-1-8-4.75-8s-4.74,2-4.74,8v24.31c0,6,1,8,4.74,8s4.75-2,4.75-8v-6.18h-4.75v-6.5h11.25v26.52h-3.19l-.91-4a9.16,9.16,0,0,1-8.19,4.61c-6.82,0-10.2-4.35-10.2-14.49V1065.5c0-10.15,3.7-14.5,11.24-14.5s11.25,4.35,11.25,14.5Z" />
        <path className="cls-28" d="M277.64,1051.65v6.5H267.57v16.25h10.07v6.5H267.57v16.25h10.07v6.5H261.07v-52Z" />
    </svg>

  ) : (
    

      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1724.29 4798.45">
        <defs>
            <style>
                {`
                .cls-1 {
                    fill: url(#linear-gradient);
                }
    
                .cls-2 {
                    fill: url(#linear-gradient-2);
                }
    
                .cls-3 {
                    fill: url(#linear-gradient-3);
                }
    
                .cls-4 {
                    fill: url(#linear-gradient-4);
                }
    
                .cls-5 {
                    fill: url(#linear-gradient-5);
                }
    
                .cls-6 {
                    fill: url(#linear-gradient-6);
                }
    
                .cls-7 {
                    fill: url(#linear-gradient-7);
                }
    
                .cls-8 {
                    fill: url(#linear-gradient-8);
                }
    
                .cls-9 {
                    fill: url(#linear-gradient-9);
                }
    
                .cls-10 {
                    fill: url(#linear-gradient-10);
                }
    
                .cls-11,
                .cls-13,
                .cls-14,
                .cls-15 {
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 4px;
                }
    
                .cls-11 {
                    stroke: url(#linear-gradient-11);
                }
    
                .cls-12 {
                    fill: url(#linear-gradient-12);
                }
    
                .cls-13 {
                    stroke: url(#linear-gradient-13);
                }
    
                .cls-14 {
                    stroke: url(#linear-gradient-14);
                }
    
                .cls-15 {
                    stroke: url(#linear-gradient-15);
                }
    
                .cls-16 {
                    fill: url(#linear-gradient-16);
                }
    
                .cls-17 {
                    fill: url(#linear-gradient-17);
                }
    
                .cls-18 {
                    fill: url(#linear-gradient-18);
                }
    
                .cls-19 {
                    fill: url(#linear-gradient-19);
                }
    
                .cls-20 {
                    fill: url(#linear-gradient-20);
                }
    
                .cls-21 {
                    fill: url(#linear-gradient-21);
                }
    
                .cls-22 {
                    fill: url(#linear-gradient-22);
                }
    
                .cls-23 {
                    fill: url(#linear-gradient-23);
                }
    
                .cls-24 {
                    fill: url(#linear-gradient-24);
                }
    
                .cls-25 {
                    fill: url(#linear-gradient-25);
                }
    
                .cls-26 {
                    fill: url(#linear-gradient-26);
                }
    
                .cls-27 {
                    fill: url(#linear-gradient-27);
                }
    
                .cls-28 {
                    fill: url(#linear-gradient-28);
                }
    
                .cls-29 {
                    fill: url(#linear-gradient-29);
                }
    
                .cls-30 {
                    fill: url(#linear-gradient-30);
                }
    
                .cls-31 {
                    fill: url(#linear-gradient-31);
                }
                `}
            </style>
            <linearGradient id="linear-gradient" x1="407.13" y1="94.3" x2="1258.08" y2="71.53"
                gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#faa951" />
                <stop offset="1" stop-color="#dd6a38" />
            </linearGradient>
            <linearGradient id="linear-gradient-2" x1="407.24" y1="98.26" x2="1258.19" y2="75.49"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-3" x1="407.29" y1="100.32" x2="1258.24" y2="77.55"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-4" x1="407.34" y1="102.2" x2="1258.29" y2="79.43"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-5" x1="407.43" y1="105.53" x2="1258.38" y2="82.76"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-6" x1="407.5" y1="108.14" x2="1258.45" y2="85.37"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-7" x1="407.56" y1="110.47" x2="1258.51" y2="87.71"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-8" x1="748.41" y1="-9849.92" x2="1071.83" y2="-9849.92"
                gradientTransform="matrix(1, 0, 0, -1, 0, -5250.21)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-9" x1="507.9" y1="-9457.58" x2="1271.78" y2="-9457.58"
                gradientTransform="matrix(1, 0, 0, -1, 0, -5250.21)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-10" x1="519.13" y1="-1511.63" x2="1257.13" y2="-1511.63"
                gradientTransform="translate(0 3572.58)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-11" x1="0" y1="-7861.89" x2="1724.29" y2="-7861.89"
                gradientTransform="matrix(1, 0, 0, -1, 0, -5250.21)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-12" x1="517.32" y1="-2987.44" x2="1255.32" y2="-2987.44"
                gradientTransform="translate(0 3572.58)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-13" x1="567.83" y1="-5913.02" x2="1214.4" y2="-5913.02"
                gradientTransform="matrix(1, 0, 0, -1, 0, -5250.21)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-14" x1="637.21" y1="-7494.14" x2="1431.74" y2="-7494.14"
                gradientTransform="matrix(1, 0, 0, -1, 0, -5250.21)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-15" x1="456.58" y1="-9698.86" x2="1468.63" y2="-9698.86"
                gradientTransform="matrix(1, 0, 0, -1, 0, -5250.21)" href="#linear-gradient" />
            <linearGradient id="linear-gradient-16" x1="472.25" y1="1544.78" x2="1323.2" y2="1522.01"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-17" x1="472.34" y1="1548.19" x2="1323.3" y2="1525.43"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-18" x1="472.4" y1="1550.15" x2="1323.35" y2="1527.38"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-19" x1="472.44" y1="1551.78" x2="1323.39" y2="1529.01"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-20" x1="472.5" y1="1553.99" x2="1323.45" y2="1531.22"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-21" x1="472.57" y1="1556.6" x2="1323.52" y2="1533.83"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-22" x1="472.64" y1="1559.17" x2="1323.59" y2="1536.41"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-23" x1="472.69" y1="1561.07" x2="1323.64" y2="1538.31"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-24" x1="472.78" y1="1564.49" x2="1323.73" y2="1541.72"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-25" x1="472.84" y1="1566.77" x2="1323.79" y2="1544.01"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-26" x1="508.23" y1="3779.42" x2="1359.18" y2="3756.65"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-27" x1="508.31" y1="3782.51" x2="1359.26" y2="3759.74"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-28" x1="508.37" y1="3784.57" x2="1359.32" y2="3761.8"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-29" x1="508.41" y1="3786.3" x2="1359.37" y2="3763.53"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-30" x1="508.5" y1="3789.51" x2="1359.45" y2="3766.74"
                href="#linear-gradient" />
            <linearGradient id="linear-gradient-31" x1="508.57" y1="3791.92" x2="1359.52" y2="3769.15"
                href="#linear-gradient" />
        </defs>
        <path className="cls-1"
            d="M576.7,2.2c40.92,0,49.06,14.74,49.06,50.16V65.78c0,35-8.14,50.16-48.84,50.16H571.2V178.2h-22V2.2Zm-5.5,22V93.94h5.72c23.54,0,26.84-6.16,26.84-28.16V52.36c0-22.22-3.3-28.16-26.84-28.16Z" />
        <path className="cls-2"
            d="M701.88,2.2h22V131.34c0,35.42-12.54,49.06-38.06,49.06s-38.06-13.64-38.06-49.06V2.2h22V131.34c0,20.46,3.3,27.06,16.06,27.06s16.06-6.6,16.06-27.06Z" />
        <path className="cls-3"
            d="M822.44,162.58c0,6.6.22,13,2.42,15.62h-22c-2.2-2.64-2.42-9-2.42-15.62V130.9c0-22.66-13.2-23.76-26.62-23.76h-5.94V178.2h-22V2.2h27.5c39.82,0,49.28,14.74,49.28,48v7.92c0,20.24-4.84,34.54-19.58,41.8,12.54,4.18,19.36,13.86,19.36,34.32ZM800.66,50.16c0-20-4.62-26-27.06-26h-5.72V85.14h5.72c22.44,0,27.06-8.36,27.06-27.06Z" />
        <path className="cls-4"
            d="M872.16,2.2c40.92,0,49.06,14.74,49.06,50.16V65.78c0,35-8.14,50.16-48.84,50.16h-5.72V178.2h-22V2.2Zm-5.5,22V93.94h5.72c23.54,0,26.84-6.16,26.84-28.16V52.36c0-22.22-3.3-28.16-26.84-28.16Z" />
        <path className="cls-5"
            d="M1018.24,49.06v82.28c0,35.42-12.54,49.06-38.06,49.06s-38.06-13.64-38.06-49.06V49.06C942.12,13.64,954.66,0,980.18,0S1018.24,13.64,1018.24,49.06Zm-22,0c0-20.46-3.3-27.06-16.06-27.06s-16.06,6.6-16.06,27.06v82.28c0,20.46,3.3,27.06,16.06,27.06s16.06-6.6,16.06-27.06Z" />
        <path className="cls-6"
            d="M1115.26,134.64c0,29-10.56,45.76-36.3,45.76-28.6,0-39.82-14.74-39.82-62.26h22c0,33.66,4.84,40.26,17.82,40.26,10.34,0,14.3-5.28,14.3-23.76,0-19.14-6.16-26.4-22.44-39.16-15.62-12.1-30.58-24.2-30.58-53,0-26,11-42.46,36.52-42.46s37.4,16.5,37.4,53.46h-22c0-26.4-5.94-31.46-15.4-31.46s-14.52,5.06-14.52,20.46c0,16.06,7.7,23.76,20.68,33.66C1101.62,90.42,1115.26,102.74,1115.26,134.64Z" />
        <path className="cls-7" d="M1193.36,2.2v22h-34.1v55h34.1v22h-34.1v55h34.1v22h-56.1V2.2Z" />
        <path className="cls-8"
            d="M1070.28,4618.61c-.82,10.6-3.38,52.42-4.3,67.51a383.16,383.16,0,0,1-294,24.49,21,21,0,0,0,1.31-3c14-42,6-58,2-73s-19-50-24-61-3-9,2-11,100-45,111-50,2-18-3-30-4-13-2-12,24,15,24,15,0,10,5,13,8,10,5,18,6,16,14,20,52,25,89,43,57,10,68,7S1071.28,4605.61,1070.28,4618.61Z" />
        <path className="cls-9"
            d="M1271.78,4347.11q0,12.86-.85,25.49c-10.74-25.54-30.3-68.5-32.65-74-3-7-11-13-14-19s-9-9-12-12,5-18,8-27,3-16,3-42-24-50-31-53a36.33,36.33,0,0,1-13-9c-3-3-6-5-16-8s-33-4-39-3-20,10-29,12-17,4-22,6-2,7,5,13,19,5,12,8-12,10-17,22-4,30-4,34,2,9,1,14-8,12-8,23,8,10,12,11a14.71,14.71,0,0,1,10,9c2,5,6,27,10,34s11,4,17,3,14,3,18,7,2,2,1,5-7,8-10,16-7,10-9,18-1,15,2,20-5,10-11,17-34,34-44,42-14,9-22,10-75-13-95-16-19-6-20-12-4-16-7-20,0-8,1-12-5-10-9-9-6-2-6-4,0-6-4-8-5,1-6.5,1.9-6.5-1.9-10.5-2.9-6,1-9,3-7,3-10,1-8,0-10,3,0,5-2,5-9-2-13,0-2,7-3,7-3,2-3,6-1,5-3,10,2,9,2,14-1,4-4,7a35.92,35.92,0,0,0-7,10c-2,4-19,5-30,7s-13-5-15-4-38-26-49-37-13-11-23-33-22-32-28-34-14-13-17-19a8.17,8.17,0,0,1,2-10s16,5,21,4,6.5-4.5,9.5-9.5,3-25,4-33,6-8,12-9,3-4,3-8-7-21-8-26,3-12,1-24-11-27-14-31,3-5,6-8-7-20-20-27-39-15-45-15-2,4-12,7-22,4-42,18.07-16,45.93-15,62.93,15,46,15,55-8,17-12,21-6,2-7-1-11,7-16,15-3,8-3,13-10,13-22,24a58.15,58.15,0,0,0-4.88,5.17c5.22-206.43,174.2-372.17,381.88-372.17C1100.75,3965.11,1271.78,4136.14,1271.78,4347.11Z" />
        <path className="cls-10"
            d="M1257.13,2102.69A367.86,367.86,0,0,1,1143.59,2369c-8.14-6.86-16.28-20.53-24.41-27.31-12-10-56-4-80,2s-50,14-57,12,14-10,23-16,13-15,20-27.77,4-17.23,0-44.23-21-96-32-130-46-46-66-43-27,12-32,15-14-6-20-11-15-4-8-7,21,3,26,4,8-7,9-24,6-19,8-24,13-1,17-7-4-10-7-24,3.31-18.42,3.31-18.42c5.32-10.42,5.69-30.58,5.34-35.63s-.65-7,7.51-11.35,9.93-12.23,9.84-24.6-25-37-44-26c-7.44,4.31-10,1-18-10s-28-10-37-1c-7,7-5.62-1-22-1-15,0-40.21,11.51-52,50s5,72,11.81,85.14,7.19,37.86-5.75,57-21.11,20.86-47.17,43.86-29.94,55-35.31,63.65-14.63,9.36-30.57,17-23.06,33.41-26.78,49.54c-3,13,9.82,100,14.91,133.34-82.53-67.72-135.19-170.48-135.19-285.53,0-203.79,165.21-369,369-369S1257.13,1898.9,1257.13,2102.69Z" />
        <path className="cls-11"
            ref={pathRef}
            d="M422.78,1020.11V750s-13-18.87-9-39.87,15-13,16-6,1,21-3,37-9-12-9-22,2.79-24.6,3.9-38.8.89-55,0-56.61-99.9,3.41-83.9,11.41,115,7,134,5,49-4,32-11S451,623.7,429.39,623.4,334.28,633.86,336,628s32.75-124.87,35.75-127.87,52-5,72-4,30,0,33,14,27,103,27,111,4,12-7,12-32-6-32,4,24,35,19,55-10,95,6,108,45,49,33,65,15,62,27,60,12-9.77,12-9.77,37.21-78.81,58.5-106.62,44.37-27.34,49.94-27.34,35.3,3,48.29,32.85,22.66,31.94,28.62,34.71,30.65,11.67,43.35,19.43,46.12,18.16,44,21S808,888,796.88,875.44s-39-22.28-43.18-24.37-19.49-8.36-22.28-25.77-9-18.8-13.93-20.89-11.11-10.49-9.71-14.67,6.06-3.64,10.69-.08,26.92,15.4,29.7,14-9-4.18-4.87-6.27,29,1.59,36.78,8.8,21.38,26.24,31.3,29.61,58.92,16,85.25,18,36.07,3.43,38.16-11.2-12.51-107.83-6.61-135,17.49-56.57,10-53-9.45,29.23-18.94,47-15.89,30.45-38.46,28.65c-22.3-1.78-19.87-30.32-15.11-38.41,0,0,35.16-64.74,17.16-68.74s-27,33-29,44-6,38-20,57-11,43-9,56,9,27,0,24-34-29-39-25.5-22,19.5-15,15.5,26-21,20-23-33-19-73-60-66-75-70-69-31,60-28,62,90,79,91,79,1,8-5,4-92-70-91-73,12-10,15-7,86,75,91,79a68.1,68.1,0,0,0,16,9c3,1,14-6,21-3s12,6,22,0,7-12,13-7,32,27,36,22-13-49,1-73c0,0,20-23,21-40s13-70,28-69,9-5,3-7a19.34,19.34,0,0,0-11.71.13c-6.35,3.68-23.76,8.55-27.94.89s-3.48-10.44-3.48-10.44-7.66,0-9.75-4.88-4.18-6.26-6.27-7-4.18-2.78-3.48-4.87,2.09-3.49-1.39-4.18-15.33,2.86-15.33-4.14,4.18-23.68,2.09-29.94S792,538.35,790.64,526.51s-13.24-45.43,6.26-69.72,56.94-34.1,93.58-28.18,60.73,54.68,84.84,96c25.41,43.49,59.37,122.55,60.6,138.13s3.36,27.79-2.23,21-22.61-44.21-27.33-46.39,34.89,51.94,38.06,79.19c1.39,12-6.28-1.59-17.45-20.62-14.27-24.32-34.25-57.58-48.32-58-25.06-.7-74.32,24-81.72,1.57s14.67-52.12,11.64-75.94-13.09-59.15-22.69-50.89-16.34,25.91-37.34,15-59-25.48-57.4-38.39,15.52,18.43,48.24,23.3,14.63,20.89,32.73,4.88,44.57-2.09,40.39,48.74c0,0-11.13,40.71-11.48,49.25s-7.32,28.74,8,30.83,62-16.71,73.12-11.14,26.46,23,36.9,41.08,21.86,38.69,22.77,62.17-17.39,84.43-28.81,108.23-10.39,41.55,11.39,43.14,86.61,5,99.63-14.2c.15-.22-14.84-51.87,18.07-90.46,13.71-16.08,33.65-27.32,54.92-34.6,37.6-12.87,78.46-12.5,116.21-.06,15.84,5.22,349.54,62.64,370.54,275.64,23.64,239.54-192.76,192.54-173,496,14,213.75,139.67,243.29,198,180,47-51-37.79-141.93-114-122-65,17-73.86,78.15-63.22,153.53l6.22,34.47c26.49,148.42,101.26,329.14-9,353-208,45-202.19,82.08-199.19,88.08s43.14-13,38.57,0-71.57,175-79.57,182,11-11,60-14,73,32,60,58-14,38-60,67-75,44-75,47,40-35,92-43,71,19,62,29-89,66-101,69-197-3-203-3,31-43,54-46,204-8,217-6,24,19,22,30-3,7-6-8-17-20-29-19-109,7-113,3,8-8-6-16-84-18-104-36-61-56-95-55-140,28-176,49-67,52-34,89,164.68-5,183.84-11.5,25.5-6.5,32.33,0,37.83,22.5,46.83,21.5,23.6-7,36.3-21.5,19.7-23.5,34.7-25.5,74,4,77-1-4-17-46-26-79-27-72-36,163-77,171-81-10-20-35-5-56,27-61,26,103-216,102-211-90,201-96,206-22,3-44,5-185-12-185-12c-9-1-14-6,0-13s16-7,24-4,22,7,35,1,9-10,26-2,30,17,36,12c3.73-3.11.89-12-7.08-19.75a46,46,0,0,0-19.92-11.25c-22-6-26-5-28-4s35,4,45,17,13,20,18,14c2.72-3.27,1.89-15.42-6.53-26.31-6.86-8.86-18.75-16.87-37.84-18.56l-1.63-.13s28,4,35,17,15,29,21,27,7-4,1-17-17-29-23-29,29,43,33,44,9-2,4-13-22-48-49-50-49.91,2.32-93,14c-46,12.48-47,8-30,3s15-15,18-19-33-8-30-56,7-72,5-85-7-18-19-23-25-3.72-25-11c.1-41.25,6.82-40.63,17-12,4,11.35,17,3,19-5s-10-12-24-6-21,20-27,26-11,3-8-7,14-24,21-28-20,25-24,20,5-24,16-29-16,21-22,21-15-7-3-15,32.19-20.9,31-19c-5,8-41,24-38,16s15-24,38-27,50,8,61,30,49,154,41,179-34,66.11-154.5,58.06c0,0-21.5-15.06-45.5-13.06s-51,41-38,41,26-11,33-24,6-45,2-74-20-97-21-83,17,73,18,100-2,48,12,45,41,1.26,39.5,20.13-5.5,64.87-17.5,70.87-2,4.11,17.5-.44,53.5-9.56,87.5-29.56,33-26,41-23-99,53-123,57-93,27-118-15-71-134-66-207,25-96,40-108,19-22,37-20,52,14,67,45,24,32,25,12-11-44-7-55,39.43,8.73,37.72,10.36-21.72-19.36-30.72-17.36,2-7,14-4,17,8,22-2,1-40,15-43,13-7,10-17-8-19-3-27,8-35,7-41-11-1-19-5-15-13-26-9-9,4.8-10.5,12.9-.5,13.1-11.5,16.1-12,2-16,9-5,18-9,14,1-22-10-26-29-9-29,17,10,37,17,36,8-4,8-4,0,6-5,8-11,12-11,12-14-5-14,0-6-18-13-29c-4.81-7.56-13.88-28.37-11.6-53a81.75,81.75,0,0,1,11.6-35c23-38,51-38,57-34s8,4,11,1,14-11,28-3,18,18,24,15,27-6,37,7,7,30,1,35-15,12-8,9,22-13,16-34-26-27-47-20c-4-1-5-1-11-8s-24-15-35-7-9,8-13,4-28-4-37,6-34,16-38,59,31,76,25,100-23,47-33,51-52,34-61,88c0,0-28,3-40,22s-18,33-16,48,21,196,29,196-33-196-23-194,23,47,30,92,8,93,26,102,16,25,0,41-42.81,18.92-129.81-5.08-209-9-293,17l-24.1,7.24c-82.81,24.71-170.22,23.16-189.9-13.24-20-37-2-80,62-79s81.73,41.84,89,76c0,0,31.28,184.64-115,365-64.41,79.42-87.6,192-87.58,296.07,0,102.9,39.89,201.64,110.51,276.49,66.76,70.77,153.75,189.33,164.07,334.44,17,239-354.16,197.42-274.58,44.21,61.41-118.22,218.32-32.69,256,120,15.21,61.66,5.09,126.76-26.68,181.75-34.53,59.75-86.19,181.14-24.76,299,86,165,65,242,47,294s17.84,93.89,47.42,78c0,0,79.63-57.88,182.2-27.48s234.07,7.33,242.13-7.69,3.42-153.49.49-169.6-8.3-15.15-7.57-6.35,14.65,53.72,20.27,89.38-3.42,68.62-2.2,80.83,34-43.22,33.46-81.57-26.87-100.24-36.76-104.09-38.46,15.75-67.77,11.36-162.64-105.14-158.79-97.08,80.78,67.21,90.12,72.34,51.64,39.21,95.23,28,156.79-64.29,164.66-69.78-18.5-55.31-28.75-59-50.37,17-98.73,27.84-67.4,14.47-64.1,20.52,14.47-4.4,11.35-15-102.36-116-103.28-110.56,28.39,45.42,63,64.29,43.22,44.51,45.79,41.67,10,6.22,14.19,1.37-10.71-48.17-57.6-81.32-59.52-37.49-59.64-41.88,7.45-8.43,2.44-9.53-11.6,2.69-15.63-2.07-42.24-37.61-42.24-45.55,19.65-23.57,21-21.49-3.3,4.52-.37,9.65S664,4382.42,678.41,4398.05s31.87,73,35.41,77.78,32.33-4.77,35.62-3,67.5-22.34,73.08-26.37-15.75-5.22-12.82-12.27,14.38-6,12.55-3.67-27.11,11-41.12,11-16.21,2.29-12.73,3.85,9.43-2,7.23-6.78-53-34.52-64.19-51-18.5-39.56-31.32-50-17.46-7.51-16.85-5.55,22,16.72,31.13,39.07,26.6,98.5,20.76,96.29-14.41-46.28-29.06-75.46-126-102.45-126.62-106.23,15-14.65,14.41-23.81-22.23-51.41-15.39-93.9,65-43.47,69.23-45.67-13.73-2.2-10.62-4.76,29.67,2.07,44.45,9,26.86,14.17,30,29.8-31.51,6.59-40.91,16.12-.61,11.35-2.93,21.85-17.46,3.79-21.74,12.95,3.42,24.54-6.1,25.27-17.58-29.55-35.17-25.15,1.59,42.49,14.66,40.78-1.1-37.5-11.24-35.65-1,39.93-7.57,39.93-15.87-39.44-12-62.4,41.63-33,42.85-29.06-18.56,15.87-14.65,16.36,29.14-22.76,36.84-20.76-13.68,29.43-8.8,28.45,18.69-27.47,42.86-27S701,4200,701,4206.71s-3.79,12-2.81,17.58,9.52,21.73,9.4,28-9,2.44-13.55,7.69,0,40.05-13.68,47-56.29-20.88-57.51-25.76,19.81,10.84,28.69,15.6-2.65,32.05-5.4,33.61-67.31-50.19-76.47-50.37-72.47,61.85-89.07,98.48-11,78.15,1.95,118.93,33.64,101.65,34.19,154.95-20.88,102.2-12.45,105.5S528,4737.28,560.45,4739s-20.51,28.58,3.18,30.77,118.93-11.23,161.42-11.72,49.33,24.42,102.57,10.5,78.7-77.11,176.5-34.8,166.13,34.8,164.91,20.15-96.71,6.35-101.59-12.7.61-140.79,5-149.21,155-110.26,153.67-100S1105.23,4574,1069,4585.76s-53.3,7-78.39-7.87-89-39-96-51.65,12-51.29,23.9-60.54,16.39-3.66,17.12-6.68-7.14-8.7-14.65-9.44-33.79,25.65-36.26,38.83,8.42,15.11,8.42,8.61-19.41-14.83-31-24.54-9.89-15.85-21.25-25.74-20.33-20.88-15.2-25.55,24,14.56,18.22,16.3-19-20.78-18.13-30.31,7-4.58,10.59,0,20.76,15.45,13.86,17.77-22.59-20.7-22.34-29.8,7.75-7,11.66-3.6,27,20.09,22.4,22.47-29.3-24.91-29.67-28.88,6.23-8.36,14.35-4.33,33.46,26.19,44.69,31.93,13.74,2.75,13.37,1.1-13.06-18.26-10.81-24.12,11.76-9,15.47-8.78,9.93,8.52,2.56,12.51-12.18-6.74-18.82-8.8-9,12.28-15.71,7.19,7.42-21.66,15.62-22.16,10,9.25,6.73,9-15.48-11.54-23.49-10.77-11.91,15.27-17,14.9-10-5.22-8.58-8.3,17.43-2.15,17.61,5.26.64,12.35,5.53,15.59,20,14.47,21.49,12.88-10-12-3.91-15.57,4.76,4.76,16.61,6.41,14.22,25,14.22,34.31-.85,24.91,12.82,31.14,46.4,31.87,74.37,36.88,45.79,12.21,42.49,22.71-16.49-8.85,9.52-40.17,63.56-86.64,66.67-77.48-65,88.65-76.92,86.27,43.4-72.35,40.29-78.94-32.23,34.8-50.73,36.08-113.2-22.9-113.2-16.49,38.62,13.85,52.69,16.49c81.53,15.29,81.2-4,129.56-61s50-63.74,74.36-80.41,41.94-18.41,42.4-21.52-2.29-11.36-6-11.36-75.28,41.67-83.61,47.53-6.51-6.5-18.69-7.78-20.6,6.59-26.1-6.87-3.84-33.43-13.09-37.36-17-5.22-17.31-14.11,11.6-20.69,8.67-31-1.34-32.85,8.3-48.36,26.13-21,27.72-13.3-15,25-12.94,38.21,19.29,11.48,22,19.18-4.77,21.49,2.8,19.65,16.61-31.62,33.34-26.86,3,52.26-8.79,48.11-7.33-42.61,3.78-43.59,16.37,22.47,19.42,38.1,39.56,17.58,43.35,11.47,26.49-56.41,7.69-93.29-46.77-39.8-46.52-34.92,11,1.35,8.54-5-42.49-17.83-65.69-4.89-41.27,9.53-41.39,14,1.83,12.34,13.79,12,28-5.86,29.55,2.2-6.1,22.95-6.47,33.94,30.89-.36,56.9,3.3,2.93,34.19,6.84,46.28,35.53,11.72,36.39,1.1-8.67-4.52-9.77,9.77,7.94,19.29,4.64,23.68-60.44,33.34-77.66,55.81-7.81,45.79-13.67,44.69-4.28-27,8-28.21,13.68,25.28,9,33.09-12.94,11.24-12.21,7,31.75-15,37.61-22.83-5.92-16.3,2-17,12.64,9,18.32,4.22,1.83-24.55,40.48-33,19.78-32.79,17-29.86,36.63,54.25,48,129.6-10.63,156.31-9.53,198.07,38.83,103.31,27.11,127.12-129.31,17.21-114.29,6.22,182.79,29.31,191.58,17.22-63-17.58-48-27.47,95.6,23.07,139-10.44" />
        <path className="cls-12"
            d="M1255.32,648.61a368.8,368.8,0,0,1-11.25,90.75c-30.52.61-57.94,14-88.71,33.11-53,32.86-30,86.14-31.32,103.14s-64.72,15-86.68,15-32,0-31.4-21.32,17.36-48.68,25.45-74.68,9.91-49,12.91-58,5-21-3.44-33.67-7.56-19.33-9.2-53.91-65.36-139.42-80.83-167.77-29.53-45.65-72-54-73.53,15.35-84.53,30.35-8,33-6.17,55.72,10.17,25.28,15.17,35.28-1,27-.84,35,6.84,4,13,4.11,4.83.88,4,2.93-2.2,5,1.63,5.43,4.17,2.52,7.06,6.17,6.11,5.35,10.48,6.43,1.63,11.92,8.78,14.07,14.85-3.15,24.64-5.06,13.21,1.91,14.21,5.13-1,2.78-8.82.29-17.14,10.5-25.3,53.12-14.84,43.38-25.32,61,1.48,55.36.48,64.36-26-15-34.5-16.5,5.5-7.5-3.62-14.67-68.88-55.81-79.42-67.65-53.46-57.16-58.53-60.68-26.93,46.52-29.65,54.29-2.28,8.23.8,9.85-7.62,7.88-7.62,7.88,70.5,58.5,82.94,67,13.56,19.46-3.82,6.65-34.62-5.19-60,6.65c-20,9.34-39.34,51.33-47.28,69.57a367.25,367.25,0,0,1-69.3-215.37c0-203.79,165.21-369,369-369S1255.32,444.82,1255.32,648.61Z" />
        <path className="cls-13"
        ref={svg1}
            d="M569.83,898.7c12.14-24.68,35.32-70.22,50.45-90,21.29-27.81,44.37-27.34,49.94-27.34s35.3,3,48.29,32.85,22.66,31.94,28.62,34.71,30.65,11.67,43.35,19.43,46.12,18.16,44,21S808,888,796.88,875.44s-39-22.28-43.18-24.37-19.49-8.36-22.28-25.77-9-18.8-13.93-20.89-11.11-10.49-9.71-14.67,6.06-3.64,10.69-.08,26.92,15.4,29.7,14-9-4.18-4.87-6.27,29,1.59,36.78,8.8,21.38,26.24,31.3,29.61,58.92,16,85.25,18,36.07,3.43,38.16-11.2-12.51-107.83-6.61-135,17.49-56.57,10-53-9.45,29.23-18.94,47-15.89,30.45-38.46,28.65c-22.3-1.78-19.87-30.32-15.11-38.41,0,0,35.16-64.74,17.16-68.74s-27,33-29,44-6,38-20,57-11,43-9,56,9,27,0,24-34-29-39-25.5-22,19.5-15,15.5,26-21,20-23-33-19-73-60-66-75-70-69-31,60-28,62,90,79,91,79,1,8-5,4-92-70-91-73,12-10,15-7,86,75,91,79a68.1,68.1,0,0,0,16,9c3,1,14-6,21-3s12,6,22,0,7-12,13-7,32,27,36,22-13-49,1-73c0,0,20-23,21-40s13-70,28-69,9-5,3-7a19.34,19.34,0,0,0-11.71.13c-6.35,3.68-23.76,8.55-27.94.89s-3.48-10.44-3.48-10.44-7.66,0-9.75-4.88-4.18-6.26-6.27-7-4.18-2.78-3.48-4.87,2.09-3.49-1.39-4.18-15.33,2.86-15.33-4.14,4.18-23.68,2.09-29.94S792,538.35,790.64,526.51s-13.24-45.43,6.26-69.72,56.94-34.1,93.58-28.18,60.73,54.68,84.84,96c25.41,43.49,59.37,122.55,60.6,138.13s3.36,27.79-2.23,21-22.61-44.21-27.33-46.39,34.89,51.94,38.06,79.19c1.39,12-6.28-1.59-17.45-20.62-14.27-24.32-34.25-57.58-48.32-58-25.06-.7-74.32,24-81.72,1.57s14.67-52.12,11.64-75.94-13.09-59.15-22.69-50.89-16.34,25.91-37.34,15-59-25.48-57.4-38.39,15.52,18.43,48.24,23.3,14.63,20.89,32.73,4.88,44.57-2.09,40.39,48.74c0,0-11.13,40.71-11.48,49.25s-7.32,28.74,8,30.83,62-16.71,73.12-11.14,26.46,23,36.9,41.08,21.86,38.69,22.77,62.17-17.39,84.43-28.81,108.23-10.39,41.55,11.39,43.14,86.61,5,99.63-14.2c.15-.22-14.84-51.87,18.07-90.46,13.71-16.08,33.65-27.32,54.92-34.6q7.62-2.61,15.39-4.5" />
        <path className="cls-14"
         ref={svg2}
            d="M1357.93,2205.2c7-1.29,12-1.09,10.23,4-4.57,13-71.57,175-79.57,182s11-11,60-14,73,32,60,58-14,38-60,67-75,44-75,47,40-35,92-43,71,19,62,29-89,66-101,69-197-3-203-3,31-43,54-46,204-8,217-6,24,19,22,30-3,7-6-8-17-20-29-19-109,7-113,3,8-8-6-16-84-18-104-36-61-56-95-55-140,28-176,49-67,52-34,89,164.68-5,183.84-11.5,25.5-6.5,32.33,0,37.83,22.5,46.83,21.5,23.6-7,36.3-21.5,19.7-23.5,34.7-25.5,74,4,77-1-4-17-46-26-79-27-72-36,163-77,171-81-10-20-35-5-56,27-61,26,103-216,102-211-90,201-96,206-22,3-44,5-185-12-185-12c-9-1-14-6,0-13s16-7,24-4,22,7,35,1,9-10,26-2,30,17,36,12c3.73-3.11.89-12-7.08-19.75a46,46,0,0,0-19.92-11.25c-22-6-26-5-28-4s35,4,45,17,13,20,18,14c2.72-3.27,1.89-15.42-6.53-26.31-6.86-8.86-18.75-16.87-37.84-18.56l-1.63-.13s28,4,35,17,15,29,21,27,7-4,1-17-17-29-23-29,29,43,33,44,9-2,4-13-22-48-49-50-49.91,2.32-93,14c-46,12.48-47,8-30,3s15-15,18-19-33-8-30-56,7-72,5-85-7-18-19-23-25-3.72-25-11c.1-41.25,6.82-40.63,17-12,4,11.35,17,3,19-5s-10-12-24-6-21,20-27,26-11,3-8-7,14-24,21-28-20,25-24,20,5-24,16-29-16,21-22,21-15-7-3-15,32.19-20.9,31-19c-5,8-41,24-38,16s15-24,38-27,50,8,61,30,49,154,41,179-34,66.11-154.5,58.06c0,0-21.5-15.06-45.5-13.06s-51,41-38,41,26-11,33-24,6-45,2-74-20-97-21-83,17,73,18,100-2,48,12,45,41,1.26,39.5,20.13-5.5,64.87-17.5,70.87-2,4.11,17.5-.44,53.5-9.56,87.5-29.56,33-26,41-23-99,53-123,57-93,27-118-15-71-134-66-207,25-96,40-108,19-22,37-20,52,14,67,45,24,32,25,12-11-44-7-55,39.43,8.73,37.72,10.36-21.72-19.36-30.72-17.36,2-7,14-4,17,8,22-2,1-40,15-43,13-7,10-17-8-19-3-27,8-35,7-41-11-1-19-5-15-13-26-9-9,4.8-10.5,12.9-.5,13.1-11.5,16.1-12,2-16,9-5,18-9,14,1-22-10-26-29-9-29,17,10,37,17,36,8-4,8-4,0,6-5,8-11,12-11,12-14-5-14,0-6-18-13-29c-4.81-7.56-13.88-28.37-11.6-53a81.75,81.75,0,0,1,11.6-35c23-38,51-38,57-34s8,4,11,1,14-11,28-3,18,18,24,15,27-6,37,7,7,30,1,35-15,12-8,9,22-13,16-34-26-27-47-20c-4-1-5-1-11-8s-24-15-35-7-9,8-13,4-28-4-37,6-34,16-38,59,31,76,25,100-23,47-33,51-52,34-61,88c0,0-28,3-40,22s-18,33-16,48,21,196,29,196-33-196-23-194,23,47,30,92,8,93,26,102l.31.16" />
        <path className="cls-15"
         ref={svg3}
            d="M458.58,4758.16a213.42,213.42,0,0,1,35.8,7.38c102.57,30.4,234.07,7.33,242.13-7.69s3.42-153.49.49-169.6-8.3-15.15-7.57-6.35,14.65,53.72,20.27,89.38-3.42,68.62-2.2,80.83,34-43.22,33.46-81.57-26.87-100.24-36.76-104.09-38.46,15.75-67.77,11.36-162.64-105.14-158.79-97.08,80.78,67.21,90.12,72.34,51.64,39.21,95.23,28,156.79-64.29,164.66-69.78-18.5-55.31-28.75-59-50.37,17-98.73,27.84-67.4,14.47-64.1,20.52,14.47-4.4,11.35-15-102.36-116-103.28-110.56,28.39,45.42,63,64.29,43.22,44.51,45.79,41.67,10,6.22,14.19,1.37-10.71-48.17-57.6-81.32-59.52-37.49-59.64-41.88,7.45-8.43,2.44-9.53-11.6,2.69-15.63-2.07-42.24-37.61-42.24-45.55,19.65-23.57,21-21.49-3.3,4.52-.37,9.65S664,4382.42,678.41,4398.05s31.87,73,35.41,77.78,32.33-4.77,35.62-3,67.5-22.34,73.08-26.37-15.75-5.22-12.82-12.27,14.38-6,12.55-3.67-27.11,11-41.12,11-16.21,2.29-12.73,3.85,9.43-2,7.23-6.78-53-34.52-64.19-51-18.5-39.56-31.32-50-17.46-7.51-16.85-5.55,22,16.72,31.13,39.07,26.6,98.5,20.76,96.29-14.41-46.28-29.06-75.46-126-102.45-126.62-106.23,15-14.65,14.41-23.81-22.23-51.41-15.39-93.9,65-43.47,69.23-45.67-13.73-2.2-10.62-4.76,29.67,2.07,44.45,9,26.86,14.17,30,29.8-31.51,6.59-40.91,16.12-.61,11.35-2.93,21.85-17.46,3.79-21.74,12.95,3.42,24.54-6.1,25.27-17.58-29.55-35.17-25.15,1.59,42.49,14.66,40.78-1.1-37.5-11.24-35.65-1,39.93-7.57,39.93-15.87-39.44-12-62.4,41.63-33,42.85-29.06-18.56,15.87-14.65,16.36,29.14-22.76,36.84-20.76-13.68,29.43-8.8,28.45,18.69-27.47,42.86-27S701,4200,701,4206.71s-3.79,12-2.81,17.58,9.52,21.73,9.4,28-9,2.44-13.55,7.69,0,40.05-13.68,47-56.29-20.88-57.51-25.76,19.81,10.84,28.69,15.6-2.65,32.05-5.4,33.61-67.31-50.19-76.47-50.37-72.47,61.85-89.07,98.48-11,78.15,1.95,118.93,33.64,101.65,34.19,154.95-20.88,102.2-12.45,105.5S528,4737.28,560.45,4739s-20.51,28.58,3.18,30.77,118.93-11.23,161.42-11.72,49.33,24.42,102.57,10.5,78.7-77.11,176.5-34.8,166.13,34.8,164.91,20.15-96.71,6.35-101.59-12.7.61-140.79,5-149.21,155-110.26,153.67-100S1105.23,4574,1069,4585.76s-53.3,7-78.39-7.87-89-39-96-51.65,12-51.29,23.9-60.54,16.39-3.66,17.12-6.68-7.14-8.7-14.65-9.44-33.79,25.65-36.26,38.83,8.42,15.11,8.42,8.61-19.41-14.83-31-24.54-9.89-15.85-21.25-25.74-20.33-20.88-15.2-25.55,24,14.56,18.22,16.3-19-20.78-18.13-30.31,7-4.58,10.59,0,20.76,15.45,13.86,17.77-22.59-20.7-22.34-29.8,7.75-7,11.66-3.6,27,20.09,22.4,22.47-29.3-24.91-29.67-28.88,6.23-8.36,14.35-4.33,33.46,26.19,44.69,31.93,13.74,2.75,13.37,1.1-13.06-18.26-10.81-24.12,11.76-9,15.47-8.78,9.93,8.52,2.56,12.51-12.18-6.74-18.82-8.8-9,12.28-15.71,7.19,7.42-21.66,15.62-22.16,10,9.25,6.73,9-15.48-11.54-23.49-10.77-11.91,15.27-17,14.9-10-5.22-8.58-8.3,17.43-2.15,17.61,5.26.64,12.35,5.53,15.59,20,14.47,21.49,12.88-10-12-3.91-15.57,4.76,4.76,16.61,6.41,14.22,25,14.22,34.31-.85,24.91,12.82,31.14,46.4,31.87,74.37,36.88,45.79,12.21,42.49,22.71-16.49-8.85,9.52-40.17,63.56-86.64,66.67-77.48-65,88.65-76.92,86.27,43.4-72.35,40.29-78.94-32.23,34.8-50.73,36.08-113.2-22.9-113.2-16.49,38.62,13.85,52.69,16.49c81.53,15.29,81.2-4,129.56-61s50-63.74,74.36-80.41,41.94-18.41,42.4-21.52-2.29-11.36-6-11.36-75.28,41.67-83.61,47.53-6.51-6.5-18.69-7.78-20.6,6.59-26.1-6.87-3.84-33.43-13.09-37.36-17-5.22-17.31-14.11,11.6-20.69,8.67-31-1.34-32.85,8.3-48.36,26.13-21,27.72-13.3-15,25-12.94,38.21,19.29,11.48,22,19.18-4.77,21.49,2.8,19.65,16.61-31.62,33.34-26.86,3,52.26-8.79,48.11-7.33-42.61,3.78-43.59,16.37,22.47,19.42,38.1,39.56,17.58,43.35,11.47,26.49-56.41,7.69-93.29-46.77-39.8-46.52-34.92,11,1.35,8.54-5-42.49-17.83-65.69-4.89-41.27,9.53-41.39,14,1.83,12.34,13.79,12,28-5.86,29.55,2.2-6.1,22.95-6.47,33.94,30.89-.36,56.9,3.3,2.93,34.19,6.84,46.28,35.53,11.72,36.39,1.1-8.67-4.52-9.77,9.77,7.94,19.29,4.64,23.68-60.44,33.34-77.66,55.81-7.81,45.79-13.67,44.69-4.28-27,8-28.21,13.68,25.28,9,33.09-12.94,11.24-12.21,7,31.75-15,37.61-22.83-5.92-16.3,2-17,12.64,9,18.32,4.22,1.83-24.55,40.48-33,19.78-32.79,17-29.86,36.63,54.25,48,129.6-10.63,156.31-9.53,198.07,38.83,103.31,27.11,127.12-129.31,17.21-114.29,6.22,182.79,29.31,191.58,17.22-63-17.58-48-27.47,95.6,23.07,139-10.44" />
        <path className="cls-16"
            d="M473.08,1457.2c40.92,0,49.06,14.74,49.06,50.16v13.42c0,35-8.14,50.16-48.84,50.16h-5.72v62.26h-22v-176Zm-5.5,22v69.74h5.72c23.54,0,26.84-6.16,26.84-28.16v-13.42c0-22.22-3.3-28.16-26.84-28.16Z" />
        <path className="cls-17" d="M602.22,1534.2v-77h22v176h-22v-77H566.14v77h-22v-176h22v77Z" />
        <path className="cls-18" d="M646.22,1633.2v-176h22v176Z" />
        <path className="cls-19" d="M712.22,1457.2v154h34.1v22h-56.1v-176Z" />
        <path className="cls-20"
            d="M838.94,1504.06v82.28c0,35.42-12.54,49.06-38.06,49.06s-38.06-13.64-38.06-49.06v-82.28c0-35.42,12.54-49.06,38.06-49.06S838.94,1468.64,838.94,1504.06Zm-22,0c0-20.46-3.3-27.06-16.06-27.06s-16.06,6.6-16.06,27.06v82.28c0,20.46,3.3,27.06,16.06,27.06s16.06-6.6,16.06-27.06Z" />
        <path className="cls-21"
            d="M936,1589.64c0,29-10.56,45.76-36.3,45.76-28.6,0-39.82-14.74-39.82-62.26h22c0,33.66,4.84,40.26,17.82,40.26,10.34,0,14.3-5.28,14.3-23.76,0-19.14-6.16-26.4-22.44-39.16-15.62-12.1-30.58-24.2-30.58-53,0-26,11-42.46,36.52-42.46s37.4,16.5,37.4,53.46h-22c0-26.4-5.94-31.46-15.4-31.46s-14.52,5.06-14.52,20.46c0,16.06,7.7,23.76,20.68,33.66C922.32,1545.42,936,1557.74,936,1589.64Z" />
        <path className="cls-22"
            d="M1033,1504.06v82.28c0,35.42-12.54,49.06-38.06,49.06s-38.06-13.64-38.06-49.06v-82.28c0-35.42,12.54-49.06,38.06-49.06S1033,1468.64,1033,1504.06Zm-22,0c0-20.46-3.3-27.06-16.06-27.06s-16.06,6.6-16.06,27.06v82.28c0,20.46,3.3,27.06,16.06,27.06s16.06-6.6,16.06-27.06Z" />
        <path className="cls-23"
            d="M1082.48,1457.2c40.92,0,49.06,14.74,49.06,50.16v13.42c0,35-8.14,50.16-48.84,50.16H1077v62.26h-22v-176Zm-5.5,22v69.74h5.72c23.54,0,26.84-6.16,26.84-28.16v-13.42c0-22.22-3.3-28.16-26.84-28.16Z" />
        <path className="cls-24" d="M1211.62,1534.2v-77h22v176h-22v-77h-36.08v77h-22v-176h22v77Z" />
        <path className="cls-25" d="M1285.1,1633.2v-61.6l-33.88-114.4h23.32l21.56,86.24,21.56-86.24H1341l-33.88,114.4v61.6Z" />
        <path className="cls-26"
            d="M645.06,3688.2c40.92,0,49.06,14.74,49.06,50.16v13.42c0,35-8.14,50.16-48.84,50.16h-5.72v62.26h-22v-176Zm-5.5,22v69.74h5.72c23.54,0,26.84-6.16,26.84-28.16v-13.42c0-22.22-3.3-28.16-26.84-28.16Z" />
        <path className="cls-27" d="M738.12,3688.2v154h34.1v22h-56.1v-176Z" />
        <path className="cls-28" d="M849.22,3688.2v22h-34.1v55h34.1v22h-34.1v55h34.1v22h-56.1v-176Z" />
        <path className="cls-29"
            d="M897.62,3688.2c35.42,0,50.16,8.36,50.16,46.86v82.28c0,38.06-14.74,46.86-50.16,46.86h-26.4v-176Zm-4.4,22v132h4.62c21.34,0,27.94-3.3,27.94-24.86v-82.28c0-21.56-6.6-24.86-27.94-24.86Z" />
        <path className="cls-30"
            d="M1045.9,3754.64h-22v-19.58c0-20.46-3.3-27.06-16.06-27.06s-16.06,6.6-16.06,27.06v82.28c0,20.46,3.3,27.06,16.06,27.06s16.06-6.6,16.06-27.06v-20.9h-16.06v-22h38.06v89.76h-10.78l-3.08-13.42c-5.94,9.46-14.74,15.62-27.72,15.62-23.1,0-34.54-14.74-34.54-49.06v-82.28c0-34.32,12.54-49.06,38.06-49.06s38.06,14.74,38.06,49.06Z" />
        <path className="cls-31" d="M1124,3688.2v22h-34.1v55H1124v22h-34.1v55H1124v22h-56.1v-176Z" />
    </svg>


  )}
    
       
      
     
       
      
 
    </div>
</section>
        </>
    )
}