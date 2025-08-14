"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const manifestoRef = useRef(null);
  const manifestoWrapperRef = useRef(null);
  const firstImgRef = useRef(null);
  const secondImgRef = useRef(null);
  const manifestoContainerRef = useRef(null);
const paragraphRef = useRef(null);
  // Add slider refs
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  // Slider settings
  const profileSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: nav2,
    centerMode: true,
    speed: 4000,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const profileTextSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    speed: 2500,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  useEffect(() => {

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
      const wordSpans = words.map((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.color = '#a1a1a1ff'; 
        span.style.transition = 'all 0.3s ease';
        span.style.marginRight = '0.3em'; 
        return span;
      });
      
      wordSpans.forEach(span => paragraphRef.current.appendChild(span));

      gsap.to(wordSpans, {
        color: 'transparent',
        background: 'linear-gradient(145deg, #ffb454 0%, #d75c33 100%)',
        backgroundClip: 'text',
        webkitBackgroundClip: 'text',
        webkitTextFillColor: 'transparent',
        duration: 0.4,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1.5,
        }
      });
    }

    if (!manifestoRef.current || !manifestoWrapperRef.current || !firstImgRef.current || !secondImgRef.current || !manifestoContainerRef.current) return;

    let tl = null;

    try {
     
      gsap.set('.profile_img_1', { opacity: 1 });
      gsap.set('.profile_img_2', { opacity: 0 });
      gsap.set('.profile_img_3', { opacity: 0 });
      gsap.set('.manifesto_section .profile_img', { margin: '0 auto 0' });

    
   
    
      
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: isMobile ? "top 5%" : "top -20%",
          end:isMobile ? 3000 : 6000,
          scrub: true, 
          pin: true,
        
        }
      });

  
      tl
      
        .to('.manifesto_section .profile_img', { 
          height: isMobile ? '87.922705314vw' : "37.1354vw",
          margin: '-5.16666666667vw auto -5.16666666667vw',
           
          duration:8,
          ease: "power3.out",
        }) 
          .to('.manifesto_section .profile_img', { 
         
            overflow:'visible',
          duration: 1,
          ease: "power3.out",
        }) 

        .to('.manifesto_container',{
        opacity:1
      }, "-=4")
        
        .to('.border_img',{
          opacity:1,
          duration: 2,
          ease: "power2.out"
        },"<")
      
       

        .to('.manifesto_container', { 
          opacity: 1, 
          duration: 8,
          ease: "power3.out"
        }, "<+=1.5")

        
        .to({}, { duration: 8 }) 

        
    } catch (error) {
      console.error('Error creating Manifesto timeline:', error);
    }

    return () => {
      try {
        if (tl && tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
      } catch (error) {
        console.error('Error during Manifesto cleanup:', error);
      }
    };
  }, [isMobile]);

  return (
    <section ref={manifestoRef} data-section="manifesto_section" className="manifesto_section">
      <div class="manifesto_title">
          <img src="/images/manifest/the.webp" alt="" width="129" height="85" />
      </div>
      <div ref={manifestoWrapperRef} className="manifesto_wrapper">
        <div ref={firstImgRef} className="first_img">
          <picture>
              <source media="(max-width: 540px)" srcSet="/images/manifest/mob_first_img.webp" />
              <img src="/images/manifest/first_img.webp" alt="" width="1800" height="146" />
          </picture>
          <img src="/images/border.webp" className="border_img" />
        </div>
        <div className="manifesto_main_container">
          <div className="profile_img">
            <Slider
              {...profileSettings}
              ref={slider => setNav1(slider)}
              className="slider slider_profile"
            >
              <div>
                <img src="/images/manifest/profile-1.webp" alt="" className="profile_img_1" width="713" height="713" />
              </div>
              <div>
                <img src="/images/manifest/profile-2.webp" alt="" className="profile_img_2" width="713" height="713" />
              </div>
              <div>
                <img src="/images/manifest/profile-3.webp" alt="" className="profile_img_3" width="713" height="713" />
              </div>
              <div>
                <img src="/images/manifest/profile-1.webp" alt="" className="profile_img_1" width="713" height="713" />
              </div>
              <div>
                <img src="/images/manifest/profile-2.webp" alt="" className="profile_img_2" width="713" height="713" />
              </div>
              <div>
                <img src="/images/manifest/profile-3.webp" alt="" className="profile_img_3" width="713" height="713" />
              </div>
              <div>
                <img src="/images/manifest/profile-1.webp" alt="" className="profile_img_1" width="713" height="713" />
              </div>
              <div>
                <img src="/images/manifest/profile-2.webp" alt="" className="profile_img_2" width="713" height="713" />
              </div>
              <div>
                <img src="/images/manifest/profile-3.webp" alt="" className="profile_img_3" width="713" height="713" />
              </div>
              <div>
                <img src="/images/manifest/profile-1.webp" alt="" className="profile_img_1" width="713" height="713" />
              </div>
              <div>
                <img src="/images/manifest/profile-2.webp" alt="" className="profile_img_2" width="713" height="713" />
              </div>
              <div>
                <img src="/images/manifest/profile-3.webp" alt="" className="profile_img_3" width="713" height="713" />
              </div>
            </Slider>
          </div>
          <div ref={manifestoContainerRef} className="manifesto_container">
            <Slider
              {...profileTextSettings}
              ref={slider => setNav2(slider)}
              className="slider slider_profile_text"
            >
              <div>
                <div className="manifesto_text c1_t1_philosophy subtitle_5347">Philosophy</div>
              </div>
          
              <div>
                <div className="manifesto_text c1_t3_pledge subtitle_5347">Pledge</div>
              </div>
                  <div>
                <div className="manifesto_text c1_t2_purpose subtitle_5347 active">Purpose</div>
              </div>
              <div>
                <div className="manifesto_text c1_t1_philosophy subtitle_5347">Philosophy</div>
              </div>
              
              <div>
                <div className="manifesto_text c1_t3_pledge subtitle_5347">Pledge</div>
              </div>
              <div>
                <div className="manifesto_text c1_t2_purpose subtitle_5347 active">Purpose</div>
              </div>
               <div>
                <div className="manifesto_text c1_t1_philosophy subtitle_5347">Philosophy</div>
              </div>
              
              <div>
                <div className="manifesto_text c1_t3_pledge subtitle_5347">Pledge</div>
              </div>
              <div>
                <div className="manifesto_text c1_t2_purpose subtitle_5347 active">Purpose</div>
              </div>
               <div>
                <div className="manifesto_text c1_t1_philosophy subtitle_5347">Philosophy</div>
              </div>
              
              <div>
                <div className="manifesto_text c1_t3_pledge subtitle_5347">Pledge</div>
              </div>
              <div>
                <div className="manifesto_text c1_t2_purpose subtitle_5347 active">Purpose</div>
              </div>
            </Slider>
            


          </div>
        </div>
        <div ref={secondImgRef} className="second_img">
          <picture>
              <source media="(max-width: 540px)" srcSet="/images/manifest/mob_second_img.webp" />
              <img src="/images/manifest/second_img.webp" alt="" width="1800" height="146" />
          </picture>
          <img src="/images/border.webp" className="border_img" />
        </div>
      </div>

<div className="manifesto-wrapper-content">
        <div className="menifesto_content">
        <p className="para manifestoTxt" ref={paragraphRef}>
          
                A place, not to contain you — but to launch you. 
                Where ambition finds space. And growth finds roots. 
                Built not for the past, but for your becoming. 
                This is where India lives forward.
        </p>
      </div>
      <a href="/manifesto" className="subtitle_48 view_link textAni"><span className="link">KNOW MORE</span></a>
</div>
    </section>
  );
} 