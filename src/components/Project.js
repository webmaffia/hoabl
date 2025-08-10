"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { killAllGSAP } from "./gsapCleanup";


gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const imageRef = useRef(null);
  const projectNumRef = useRef(null);
  const growthRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, { x: "-100%" });
      gsap.set(projectNumRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse"
        }
      });

      tl.to(imageRef.current, {
        x: "0%",
        duration: 1.2,
        ease: "power2.out"
      })
      .to(projectNumRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

      if (growthRef.current) {
        const el = growthRef.current;
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
      }
    }, sectionRef);

    return () => {
      try { ctx.revert(); } catch (e) {}
      if (growthRef.current) {
        const el = growthRef.current;
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

        <section ref={sectionRef} data-section="project_section" className="project_section">
    <div className="project_wrapper">
        <div className="project_img_container">
            <div className="project_box_img active" id="project-1">
                <img ref={imageRef} src="/images/img_1.webp" alt="" width="1107" height="1091" />
                <div ref={projectNumRef} className="project_num subtitle_1727 italic">01</div>
            </div>
       
        </div>
        <div className="project_container" id="growth">
            <div className="project_text_container">
                <h2 className="subtitle_36 text_bg textAni">
                    GROWTH CORRIDORS
                </h2>
                <div className="subtitle_60 textAni growthPara" ref={growthRef}>
                    Where infrastructure leads, opportunity rises, and growth takes root.
                </div>
            </div>
            <div className="project_tab_container">
                <div className="project_tab active textAni hovermumbai" data-id="1">
                    <sup>01</sup> MUMBAI
                </div>
                <div className="project_tab textAni disabled_cursor" data-id="2">
                    <sup>02</sup> NASHIK <sup className="project_sup">COMING SOON</sup>
                </div>
                <div className="project_tab textAni disabled_cursor" data-id="3">
                    <sup>03</sup> DELHI <sup className="project_sup">COMING SOON</sup>
                </div>
            </div>
            <div className="project_name_container">
                <div className="project_name_detail active project-1">
                    <div className="subtitle_36 text_bg textAni">The Great Western Mumbai</div>
                    <div className="subtitle_24 textAni">
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Quis ipsum
                    </div>
                    {/* <a href="" className="subtitle_48 textAni"><span className="link view_link">KNOW MORE</span></a> */}
                </div>
                <div className="project_name_detail project-2">
                    <div className="subtitle_36 text_bg">Nashik Project</div>
                    <div className="subtitle_24">
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Quis ipsum
                    </div>
                    {/* <a href="" className="subtitle_48 textAni"><span className="link view_link">KNOW MORE</span></a> */}
                </div>
                <div className="project_name_detail project-3">
                    <div className="subtitle_36 text_bg">Delhi Project</div>
                    <div className="subtitle_24">
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Quis ipsum
                    </div>
                    {/* <a href="" className="subtitle_48 textAni"><span className="link view_link">KNOW MORE</span></a> */}
                </div>
            </div>
        </div>
    </div>
</section>

  );
} 