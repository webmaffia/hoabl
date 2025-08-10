"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { killAllGSAP } from "./gsapCleanup";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const textRef = useRef(null);
  const leadershipRef = useRef(null);
  const imgRef = useRef(null);
  const subtitleRef = useRef(null);
  const subtitleRef1 = useRef(null);
  const subtitleRef2 = useRef(null);
  const subtitleRef3 = useRef(null);
  const subtitleRef4 = useRef(null);
  const paragraphRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
    // const textElements = gsap.utils.toArray('.text');

    // textElements.forEach(text => {
    //   gsap.to(text, {
    //     backgroundSize: '259%',
    //     ease: 'none',
    //     background:'linear-gradient(145deg, #ffb454 0%, #d75c33 100%)',
        
    //     scrollTrigger: {
    //       trigger: text,
    //       start: 'top 70%',
    //       end: 'center 40%',
    //       scrub: true,
    //     },
    //   });
    // });

 
    if (subtitleRef.current) {
      const el = subtitleRef.current;
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
      
      wordSpans.forEach(span => subtitleRef.current.appendChild(span));

 
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
          trigger: '.about_wrapper',
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
    }

    if (subtitleRef1.current) {
      const el = subtitleRef1.current;
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
      
      wordSpans.forEach(span => subtitleRef1.current.appendChild(span));

 
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
          trigger: '.about_wrapper',
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
    }

    if (subtitleRef2.current) {
      const el = subtitleRef2.current;
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
      
      wordSpans.forEach(span => subtitleRef2.current.appendChild(span));

 
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
          trigger: '.about_wrapper',
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
    }

    if (subtitleRef3.current) {
      const el = subtitleRef3.current;
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
      
      wordSpans.forEach(span => subtitleRef3.current.appendChild(span));

 
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
          trigger: '.about_wrapper',
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
    }

    if (subtitleRef4.current) {
      const el = subtitleRef4.current;
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
      
      wordSpans.forEach(span => subtitleRef4.current.appendChild(span));

 
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
          trigger: '.about_wrapper',
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
    }

    // Add word animation for paragraph
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
        duration: 0.2,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.leadership_section',
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
    }

      gsap.set('.leader_img', { x: "100%" });


     
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.about_section',
            start: "top 20%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
          }
        });
    
    
        tl.to('.leader_img', {
          x: "0%",
          duration: 1.2,
          ease: "power2.out"
        })
    }, sectionRef);


    const preNavCleanup = () => killAllGSAP();
    window.addEventListener("popstate", preNavCleanup);
    window.addEventListener("beforeunload", preNavCleanup);
    return () => {
      try { ctx.revert(); } catch (e) {}
      
      
      [subtitleRef, subtitleRef1, subtitleRef2, subtitleRef3, subtitleRef4, paragraphRef].forEach((ref) => {
        if (!ref.current) return;
        const el = ref.current;
        let original = '';
        try { original = el.dataset?.originalText || ''; } catch (e) { /* ignore */ }
        if (!original) {
          const directSpans = Array.from(el.querySelectorAll(':scope > span'));
          if (directSpans.length > 0) {
            original = directSpans.map(s => s.textContent || '').join(' ');
          } else {
            original = el.textContent || '';
          }
        }
        el.textContent = original;
      });
      killAllGSAP();
      window.removeEventListener("popstate", preNavCleanup);
      window.removeEventListener("beforeunload", preNavCleanup);
    };
  }, []);

  return (
   <section ref={sectionRef} data-section="about_section" className="about_section">
    <div className="about_wrapper" >
        <h2 className="subtitle_11232 text_bg">About HoABL</h2>
        <div ref={subtitleRef} className="subtitle_57 s1">
          The House of Abhinandan Lodha is leading the way in changing the course of how growth is found, owned, and experienced.
          We’re transforming the way India lives—
          with experiences that move with your ambition,
          spaces that evolve with your dreams,
          and journeys designed for the driven.
        </div>
        <div>
            <a href="/about" className="subtitle_48"><span className="link">KNOW MORE</span></a>
        </div>
    </div>
    <div data-section="leadership_section" className="leadership_section">
        <div className="leader_wrapper">
            <div className="leader_img">
                <img src="/images/profile.webp" alt="" width="827" height="1027" />
            </div>
            <div className="leader_container">
                <h2 className="subtitle_33356 textAni"><span className="text_bg">Leadership</span></h2>
                <div className="subtitle_48 textAni"><span className="text_bg">Mr. Abhinandan Lodha</span></div>
                <p ref={paragraphRef} className="para abouttxt" >
                    
                        He is a bold thinker with the ability to see the big picture. 
                        His leadership blends strategy with empathy, scale with precision. With deep 
                        conviction and sharp instinct, he has crafted businesses that are unique in 
                        the way they operate. He shapes organizations that inspire people to follow, 
                        setting new benchmarks for what Indian enterprises can become: fearless, 
                        future-ready, and built on trust that endures.
             
                </p>
                <a href="/about" className="subtitle_48"><span className="link">KNOW MORE</span></a>
            </div>
        </div>
    </div>
</section>
  );
} 