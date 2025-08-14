"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect,useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BridgeSvg from "@/components/bridgeSvg";
import { killAllGSAP } from "@/components/gsapCleanup";


export default function  AboutPage() {

      const aboutRef = useRef(null);
      const aboutRef1 = useRef(null);
      const aboutRef2 = useRef(null);
      const aboutRef3 = useRef(null);
      const aboutRef4 = useRef(null);

   const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
      checkIsMobile();
      window.addEventListener("resize", checkIsMobile);
      return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

      useEffect(() => {
         gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          const refs = [aboutRef, aboutRef1, aboutRef2, aboutRef3, aboutRef4];

          // Will hold word span arrays for sequencing 2 -> 3 -> 4
          let words2 = null;
          let words3 = null;
          let words4 = null;

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

            // For aboutRef and aboutRef1 keep existing independent triggers
            if (r === aboutRef || r === aboutRef1) {
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
            } else {
              // Store for sequencing later
              if (r === aboutRef2) words2 = wordSpans;
              if (r === aboutRef3) words3 = wordSpans;
              if (r === aboutRef4) words4 = wordSpans;
            }
          });

          // Create one timeline that animates aboutRef2 -> aboutRef3 -> aboutRef4 sequentially
          if (aboutRef2.current && aboutRef3.current && aboutRef4.current && words2 && words3 && words4) {
            const visionContainer = aboutRef2.current.parentElement || aboutRef2.current;
            const sharedProps = {
              color: 'transparent',
              background: 'linear-gradient(145deg, #ffb454 0%, #d75c33 100%)',
              backgroundClip: 'text',
              webkitBackgroundClip: 'text',
              webkitTextFillColor: 'transparent',
              duration: 0.2,
              stagger: 0.04,
              ease: 'power2.out',
            };

            gsap.timeline({
              scrollTrigger: {
                trigger: visionContainer,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 1,
              }
            })
            .to(words2, sharedProps)
            .to(words3, sharedProps, '>')
            .to(words4, sharedProps, '>');
          }
        });

        // Cleanup
        return () => {
          try { ctx.revert(); } catch (e) {}
          const refs = [aboutRef, aboutRef1, aboutRef2, aboutRef3, aboutRef4];
          refs.forEach((r) => {
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
        <div>

<section data-section="about_banner" className="about_banner inner_banner">
    <div className="inner_banner_flex">
        <div className="inner_banner_box">
            <div className="inner_banner_clip"></div>
            <Image src="/images/about/banner.webp" alt="Banner1" className="banner_img" width="960" height="1080" />
        </div>
        <div className="inner_banner_box active">
            <div className="inner_banner_clip"></div>
            <Image src="/images/about/banner_2.webp" alt="Banner2" className="banner_img" width="960" height="1080" />
        </div>
    </div>
    <div className="inner_banner_container">
        {/* <h2 className="subtitle_473">About Us</h2> */}
        <div className="subtitle_10877">
            A launchpad for <br />Growth.
        </div>
    </div>
</section>

<section data-section="about_future" className="about_future" id="company">
    <div className="future_container">
        <div className="subtitle_8586">
            <span className="text_bg">Plotting Futures to</span>
        </div>
        <div className="subtitle_22544">
            <span className="text_bg">POWERING PROGRESS</span>
        </div>
        <div className="subtitle_3753 aboutPara" ref={aboutRef}>
            The House of Abhinandan Lodha (HoABL) has already redefined the way India buys 
            land — by making a traditionally offline category digital-first, transparent, 
            and accessible. Now, we are expanding that revolution.
        </div>
    </div>
    <div className="future_wrapper">
        <div className="future_wrapper_text">
            <div className="subtitle_721">
                <span className="text_bg">
                    With the launch of
                </span>
                <span className="text_bg">
                    Growth Housing,
                </span>
            </div>
            <div className="subtitle_2307 aboutPara1" ref={aboutRef1}>
                
                    HoABL enters a bold new territory — a future-facing
                    housing category created not just to provide shelter,
                    but to enable progress. We are not building homes the
                    typical way. 
                
                
                    We are creating Growth Homes — designed to reflect who 
                    you are, and accelerate who you&apos;re becoming. 
                
                
                    Built on the same foundation of
                    technology, trust, and transparency that made our land
                    business a national success, this new venture brings
                    our digitally powered platform and customer-first
                    thinking to the world of housing.
                
            </div>
        </div>
        <Image src="/images/about/future.webp" alt="Future" className="" width="1020" height="601" />
    </div>
</section>
<section data-section="about_vision" className="about_vision" id="Visionary">
    <div className="about_vision_wrapper">
        <BridgeSvg />
        <Image src="/images/about/profile.webp" className="vision_profile" alt="Vision Profile" width="893" height="1156" />
        <div className="about_vision_text subtitle_49645"><span className="text_bg">Visionary </span></div>
    </div>
    <div className="about_vision_container">
        <div className="subtitle_8156"><span className="text_bg">Mr. Abhinandan Lodha</span></div>
        <div className="subtitle_24 aboutPara2" ref={aboutRef2}>
            He is a bold thinker with the ability to see the big picture. His leadership blends strategy with empathy, scale with precision. With deep conviction and sharp instinct, he has crafted businesses that are unique in the way they operate. He shapes organizations that inspire people to follow, setting new benchmarks for what Indian enterprises can become: fearless, future-ready, and built on trust that endures.
        </div>
        <div className="subtitle_24 aboutPara3" ref={aboutRef3}>
            With his foray into growth housing development, he aims to usher in an area of growth powered by tech through multiple projects that prioritizes aspirational lifestyle, customer centricity, timely delivery, and modern infrastructure designed around the needs of today’s home buyers. Recognizing that India’s urban landscape is evolving rapidly, he envisions well-planned, integrated townships across India. Every project under this category of growth housing is being planned with a clear emphasis on executional excellence, community value, and seamless delivery.
        </div>
        <div className="subtitle_24 aboutPara4" ref={aboutRef4}>
            Design and Quality are central to everything done at HoABL, and this growth housing portfolio is no exception. Abhinandan Lodha believes each location has its own context and energy — and the design language is crafted to reflect that. His vision is to deliver inspiring environments that resonate deeply with future residents.
        </div>
    </div>
</section>
</div>
    )
}