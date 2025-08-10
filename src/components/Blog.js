"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const blogSection = useRef(null)


   
  useEffect(() => {
const isMobile = window.innerWidth <= 768;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: blogSection.current,
        start: "top 80%",
        end: "bottom 10%",
       toggleActions: "play reverse play reverse"
     
      }
    });

  
     tl.to('.blog_section .grid_item:nth-child(1)',{left:0, ...(isMobile && {bottom: 0}), duration:1, opacity:1})

    .to( '.blog_section .grid_item:nth-child(2)',{top:0,...(isMobile && {left: 0}),duration:1,opacity:1}, "<+=0.1")

    .to( '.blog_section .grid_item:nth-child(3)',{top:0,...(isMobile && {right: 0}),duration:1,opacity:1}, "<+=0.1")

    .to( '.blog_section .grid_item:nth-child(4)',{bottom:0,...(isMobile && {left: 0}),duration:1,opacity:1}, "<+=0.1")

    .to( '.blog_section .grid_item:nth-child(5)',{bottom:0,...(isMobile && {right: 0}),duration:1,opacity:1}, "<+=0.1")

    .to( '.blog_section .grid_item:nth-child(6)',{right:0,...(isMobile && {bottom: 0}),duration:1,opacity:1}, "<+=0.1")


    return () => {
     
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);



  return (
<section data-section="blog_section" className="blog_section" ref={blogSection}>
    <h2 className="subtitle_11238 text_bg textAni">Blog</h2>
    <div className="blogs_grid">
        <div className="grid_item">
            <img src="/images/blog/img_1.webp" alt="" className="grid_img" width="894" height="447" />
            <div className="grid_content">
                <div className="subtitle_3258">RETHINKING HOMES</div>
                <div className="subtitle_1629">How Growth Homes are shaping a new future of living.</div>
            </div>
            <a href="" className="text_bg">Know More</a>
        </div>
        <div className="grid_item">
            <img src="/images/blog/img_2.webp" alt="" className="grid_img" width="427" height="604" />
            <div className="grid_content">
                <div className="subtitle_3258">LAND MEETS LIFESTYLE</div>
                <div className="subtitle_1629">From plot ownership to futurea•eadu communities.</div>
            </div>
            <a href="" className="text_bg">Know More</a>
        </div>
        <div className="grid_item">
            <img src="/images/blog/img_3.webp" alt="" className="grid_img" width="427" height="604" />
            <div className="grid_content">
                <div className="subtitle_3258">POWERED BY PROGRESS</div>
                <div className="subtitle_1629">Why we build homes that reflect who you are</div>
            </div>
            <a href="" className="text_bg">Know More</a>
        </div>
        <div className="grid_item">
            <img src="/images/blog/img_4.webp" alt="" className="grid_img" width="427" height="604" />
            <div className="grid_content">
                <div className="subtitle_3258">TRANSPARENCY AT THE CORE</div>
                <div className="subtitle_1629">Whu we build homes that reflect who you are</div>
            </div>
            <a href="" className="text_bg">Know More</a>
        </div>
        <div className="grid_item">
            <img src="/images/blog/img_5.webp" alt="" className="grid_img" width="427" height="604" />
            <div className="grid_content">
                <div className="subtitle_3258">DIGITAL FIRST, TRUST ALWAYS</div>
                <div className="subtitle_1629">Whu we build homes that reflect who you are</div>
            </div>
            <a href="" className="text_bg">Know More</a>
        </div>
        <div className="grid_item">
            <img src="/images/blog/img_6.webp" alt="" className="grid_img" width="894" height="447" />
            <div className="grid_content">
                <div className="subtitle_3258">INDIA&apos;S HOUSING REVOLUTION BEGINS HERE</div>
                <div className="subtitle_1629">HoABL&apos;s vision for tomorrow — accessible. aspirational, and growth-focused.</div>
            </div>
            <a href="" className="text_bg textAni">Know More</a>
        </div>
    </div>
</section>
  );
} 