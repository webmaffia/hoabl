"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { killAllGSAP } from "./gsapCleanup";

export default function Promises() {
 
  const sectionRef = useRef(null);
  const paragraphRef = useRef(null);
  const manSvgRef = useRef(null);
  const ladySvgRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Text animation
      if (paragraphRef.current) {
        const el = paragraphRef.current;
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
            trigger: ".promisesTrigger",
            start: "top 90%",
            end: "bottom 20%",
            scrub: 1,
          }
        });
      }

      // SVG Drawing Animation
      if (manSvgRef.current && ladySvgRef.current) {
        const manPath = manSvgRef.current.querySelector('path');
        const ladyPath = ladySvgRef.current.querySelector('path');

        if (manPath && ladyPath) {
          gsap.set([manPath, ladyPath], {
            strokeDasharray: (i, target) => target.getTotalLength(),
            strokeDashoffset: (i, target) => target.getTotalLength(),
          });

          gsap.to(manPath, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: '.developing_svg_container',
              start: "top 85%",
              end: "bottom top",
              scrub: 1,
            }
          });

          gsap.to(ladyPath, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: '.developing_svg_container',
              start: "top 85%",
              end: "bottom top",
              scrub: 1
            }
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: '.developing_svg_container',
              start: isMobile ? 'top 30%' : 'top top',
              end: '+=1000',
              scrub: 1,
              pin: true,
            }
          });
        }
      }
    }, sectionRef);

    return () => {
      try { ctx.revert(); } catch (e) {}
      if (paragraphRef.current) {
        const el = paragraphRef.current;
        let original = '';
        try { original = el.dataset?.originalText || ''; } catch (e) {}
        if (!original) {
          const spans = Array.from(el.querySelectorAll(':scope > span'));
          original = spans.length > 0 ? spans.map(s => s.textContent || '').join(' ') : (el.textContent || '');
        }
        el.textContent = original;
      }
      killAllGSAP();
    };

  }, []);

  return (
    <section ref={sectionRef} data-section="developing_section" className="developing_section" id="promises">
      <div className="developing_svg_container">

        <div className="developing_svg man_svg" ref={manSvgRef}>
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1190.33 904.46">
                         <defs>
               <style>{`.cls-1{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;stroke:url(#linear-gradient);}`}</style>
               <linearGradient id="linear-gradient" y1="581.59" x2="1190.33" y2="581.59" gradientTransform="matrix(1, 0, 0, -1, 0, 1033.82)" gradientUnits="userSpaceOnUse">
                 <stop offset="0" stopColor="#faa950"/>
                 <stop offset="1" stopColor="#dd6938"/>
               </linearGradient>
             </defs>
             <path className="cls-1" d="M743.71,333s62.65-23,66.48-18.33,24.48,62,82.11,69.06c3,.38,6,.68,8.77.92,50.66,4.32,66.76-12,77.08-30.18,0,0-20.64,28.54-65,28s-67.35-20-80.89-36.1S814,316.54,815.73,314.05A15.35,15.35,0,0,1,821,310s25-6.35,32.06-33.7,4.22-40.55,3.43-51.53.21-15.49-5.29-20.82-11.08-10.5-12.37-29.65.06-30.72,1.3-35.86,4.36-7.23,8.91-5a19.21,19.21,0,0,1,10.53,16.79c.27,9-1.25,16.18,1.16,16.61s2.42-3.29,1.75-9.81-5.28-27.94-2.38-28.89,25.78,26.44,67.52,44.61,78.13,24.38,97.12,18.2,30.6-15.15,22.1-21-36.56,3.65-100-13.61-64.5-34.6-60.2-31.39,20.2,18.68,54.72,28.35,56.8,10.69,63.41,9.27,9.26-4.23,10.28-13.18,6.21-34-2.33-41.22-15.86-9.81-16-23,4.5-13.21-4.78-42.74S976.11,17.91,973.65,20.1s3.84,9,6,29.44,3,30.86-6.14,34.13-21.4-1.83-25.56,5S938.08,132,935,136s-6.11,5.09-12.21,2.1-17.85-5.17-16.34-9.29,8-11.46,10.18-22.53-.71-16.75-10.21-18-19,21.39-22.11,25-4.73,8.41-12,2a36.45,36.45,0,0,1-11.37-18.19,54,54,0,0,0-5.27-12.16c-1.37-2.24-3.5-8.5-.26-10.11s8.61-.91,9.48-4.14A94.79,94.79,0,0,1,909,13c35.6-21,96.59-14.49,119.66,20.1s30.23,59,31.9,99.89-.45,40.23-7.12,45.86-28.52,10.92-29.88,16.15-.28,16.63-6.28,25.85-8.47,6.85-14.5,18.62-30.32,53.47-38.47,65-25.69,22-44.24,18.9-45.58-25.71-50.14-39.22c-.31-2.82-.09-3.74,7.43,4.13s31.28,38.51,54.09,36.19,38.2-28.84,39-30.67-3.51,9.42-3,24.27,17.35,33.59,45.18,46.83,88,43.22,100.82,80.08,25.93,125.24,21.06,169.83,10.69,79.43,21.46,102.92,47.59,81.46,27.51,99.92-70.31,21.54-84.94,15.72-51.93-130.74-61.88-149.21-10.35-27.28-.93-30.76,69.06-19,82.72-24.46,19.5-14.42,10.77-1.13-88.49,23.85-101.78,22.79-10.77-31.67-10.61-46,9.65-28.82,9.2-11.87-8.83,19.56-15.41,93.62-9.34,130.15,4.34,133.3,87.57,10.47,74.41,12.92-101.88-16.76-150.17-34.7S569.94,647.39,509.07,610.69s-68.18-39.24-79.43-60.08-1.7-31.35-15.86-16.24-21.33,47.35-11,78c2.74,10.86,7.8,19.63,2.66,22.52s-20.86,14.91-23.33,47.24,14.8,42.84,24.76,53.61,18.69,17.17,17.07,32.35-14.62,48.24.25,60.45,81.11-5,148.86,12.76S716,894,744.39,897.13s58.31,2.46,69.3-4.69,15.51-6.77,9.37.26S767.77,911.38,720,895.52s-124.54-65.17-309.74-59.45-221-13-268.09-27.88S10,828.35,1,844.78c0,0,.4-8.76,26.18-21.23s75.94-32.64,110.59-19.11,102.68,35.82,202,36.3,97.42-6.69,89.31-12.89-10.16-14.89-8-32.76,8-38.44-1-48.13-28-23.16-18.87-19.94,32.8,10.74,49.73,6,16.46-10.93,5.62-12.58-41.48-4.55-51.18-19.25-8,7.5,18.06,16.28,38.16,4,36.31-2.32-1.57-9.57-19.39-14.77-28.32-8.3-32.47-18.9,4.54,6.26,13.05,7.62,11.23-1.34,8.25-9.51-15.81-38.42-19.22-42S397.47,606.4,399.4,575s23.3-52.18,24.49-46.84a73.24,73.24,0,0,0,30.71,47.44c25.44,17.68,153,93.84,161,83.23s66.53-95.24,67.62-97.42-.12,24.29-1.55,41.71-6.4,79-5.77,81.23-5.7-2.43-2-21.66,6.34-100.78,12.63-108,2.88-40.61-43.86-56.93-46.12-18.87-55.88-8.6S514.69,612,518,611.26,600.42,447.12,656.08,393c19.26-18.73,18.6-17.55,18.6-17.55s37.39-31.67,56.39-36.88"/>
          </svg>
        </div>

        <div className="developing_svg lady_svg" ref={ladySvgRef}>
          <svg id="Layer_2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 745.8 784.53">
                         <defs>
               <style>{`.cls-1{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;stroke:url(#linear-gradient);}`}</style>
               <linearGradient id="linear-gradient" y1="301.05" x2="745.8" y2="301.05" gradientTransform="matrix(1, 0, 0, -1, 0, 693.32)" gradientUnits="userSpaceOnUse">
                 <stop offset="0" stopColor="#faa950"/>
                 <stop offset="1" stopColor="#dd6938"/>
               </linearGradient>
             </defs>
             <path className="cls-1" d="M1,475.42s16.69-8.74,39.26-4.41,94.46,15,144.16,4.41,68.12-17.73,61.62-14.15-63.6,26.56-117.43,23.42S22.07,479.22,27.93,460,45.41,383.62,77.47,367s37.55-20.29,53.35-23.4c0,0,19.74,5.75,22.08-8s6.69-33.57,2.22-42.25-30.62-32.54-33.48-69,6.84-55.72,2.61-56.37-31.86-2-40.71-18.16,4.13-24.68,9.66-29.57,7.47,2.44,19.61-39.48S168.18,4,205.66,1.34s58.62,11,76.47,29.5,18,18.78,31.17,46.29,12.92,32.79,10.85,43.75-1.73,16.1-2.2,21.74,3.54,14.64-14.26,17.15-33.57-2.85-54.39,0-111.54,18.87-124.13,8-21.94-22.05-12.49-42.9,33-69.12,51-87.61,30.86-19.38,41.5-13.19,18,10.67,11.79,17.86-14.46,13.35-15.05,28.25,8.36,37,6.87,51.92-3,21.76,10,24.67,42,1.85,53,.27,19.76-10.83,28.32-4.54,14.59,8.29,10.13,12.42-18.3,2.7-27.78,3.06-45.06,1.85-40.65,4.74,13.91,2.29,13.92,13.48-1.59,19.71,3.47,22.48,9.49-2.38,15.58-7.5S291,180.56,296.45,185s1.47,14-.9,19.72-6.29,16.09-16.5,20.59-10.7,10.5-15,17.86-27.36,47.6-50.7,58.17-33.44,12.15-41.73,6S158.76,296.6,156.51,293s-.88,10.07-1.86,14,1.61,28.91-2.18,33.42,2.4,2.44,4.55,7.89,6.74,28.75,26.07,36.85,45.91,13.34,64.85-9,27.19-38,38.53-42.69,19.71-6.34,15.68-8.65-16.82-5.31-26.86-15.26-16-35.79-9.87-48.22,21.46-7.49,29.28-.54,18.44,17.69,23.48,29.59,9,23.77,13.16,18.12,3.41-17.42,1.46-23.89-9.36-27.41-7.69-41.1,3-49.51.18-64.21-12.2-21.29-9.24-20.6,14.3,15.58,12.17,44-7.47,72.13,9.53,87.85,33.42,13,43.41,22.69,7.53,21.67,15,29.13,27.55,13.67,41.26,12,21.25-4.5,18.89,0-14.19,9.24-30.31,7a364.42,364.42,0,0,1-68.87-17.13c-28.64-10-52.65-16-48.81-16.93s30,10.42,41.42,12.9,45.86,19.31,54,39.29,12.87,36.84,7.45,79.61-9,63.17-9,81.2,2.67,42.9-9.49,53.55-31.86,12.39-29.59,5.59,12.35-21.38,13.27-41.88-12.42-43.69-46.51-51.4-55.06,17.25-63.69,27.68-10.83,16.85-3,16.08,29.18-9.51,22.64-4.89-57.31,20-76.63,26.25-42.46,13.42-51.14,15.88C150.6,589.26,105,602,82.29,604.71a49.16,49.16,0,0,1-8.91.45C57.44,604,50,591.09,47.81,575.79s-1.71-42.82,4-54.48,16-5.88,15.67.7-9.31,28.25-2.72,30.11,10,1.58,25.38-8.33,15.92-14.75,30.31-15.71,14.68,7.82,8.79,14.57-24.68,21.26-23.45,19.47,19.4-20,31.12-23.51,13.3,6.3,7.34,11.28S120.63,568.54,115,573.54s-1.57,7.07,4.84,2.11,18.32-18.88,25.42-21.84,11-4.19,10.1,5.76-14.31,17.71-16.89,23.9,5.86-3.13,15.86-3.81,7.14,9.38-6.25,13.14S92.94,608.72,82.88,609,72,603,62.82,609,50.08,625,55,621.91s18.26-12.62,23.56.6-1.62,37,27.8,39.41S277,655,294.73,648.48s35.82-17.08,42.58-33.9,7.07-24,9.84-19.2S332.71,633.11,325.56,639,227.93,656.18,204.67,656,95.15,661.29,98,666.66s32.85,64.45,47.84,85.49,18.86,40.11,61.54,27.16,123.14-57.06,182.66-68.25,91.67-.38,147.74,16.17,135.42,41.94,207,6.5"/>
          </svg>
        </div>
    
      </div>

      <div className="developing_wrapper" >
        <h2 className="subtitle_17532"><span className="text_bg textAni promisesTrigger">Promises</span></h2>
        <p className="para subtitle_3808 promisetxt" ref={paragraphRef}>
          
           We are committed to thoughtful design, enduring quality, effortless living, and spaces that inspire growth—both in life and in community.
            
          
        </p>
        {/* <a href="promises" className="subtitle_48 textAni"><span className="link">KNOW MORE</span></a> */}
      </div>
    </section>
  );
} 