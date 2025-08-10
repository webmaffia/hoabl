"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterForm from "../FooterForm"


gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {

const textAni = gsap.utils.toArray('.textAni');

textAni.forEach(Ani => {
 gsap.fromTo(
      Ani,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: Ani,
          start: "top 80%",
          end: "top 60%",
          scrub: true,
        },
      }
    );
});

   
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
  <footer>
   <div className="footer_wrapper">
        <div className="footer_left">
            <a href="" className="logo_img">
                <img src="/images/logo.webp" alt="Logo" width="357" height="194" />
            </a>
        </div>
        <div className="footer_container">
            <div className="subtitle_13343">GET IN TOUCH</div>
        </div>
    </div>
    <div className="footer_wrapper">
        <div className="footer_left">
            <address>
                <div className="subtitle_30">
                    Corporate office -
                </div>
                <div className="subtitle_22">
                    3<sup>rd</sup> Floor, Lodha Excelus, Apollo Mills
                    Compound, NM Joshi Marg, Mahalakshmi,
                    Mumbai - 488811
                </div>
            </address>
            <div className="footer_social_icons">
                <a href="https://www.instagram.com/growwithhoabl?igsh=MTIzenN4c3I4azhudA%3D%3D&utm_source=qr" className="textAni" target="_blank"><img src="/images/social/insta.webp" alt="" width="85" height="85" /></a>
                <a href="https://youtube.com/@growwithhoabl?si=hVaf0oANjOP9ladQ" className="textAni" target="_blank"><img src="/images/social/yt.webp" alt="" width="85" height="85" /></a>
                <a href="https://www.linkedin.com/company/growwithhoabl" className="textAni" target="_blank"><img src="/images/social/in.webp" alt="" width="85" height="85" /></a>
                <a href="https://www.facebook.com/share/19mvZLbk2f/?mibextid=wwXIfr" className="textAni" target="_blank"><img src="/images/social/fb.webp" alt="" width="85" height="85" /></a>
                <a href="https://wa.me/917300022934?text=Hi" className="textAni" target="_blank"><img src="/images/social/whatsapp.webp" alt="" width="85" height="85" /></a>
            </div>
        </div>
        <div className="footer_container">
            <FooterForm />
            <div className="form_navigation">
                <ul>
                    <li>
                        <a href="/about" className="subtitle_24 textAni">About us</a>
                        <ul className="inner_nav">
                            <li className="textAni">
                                <a href="/about#company" className="subtitle_24">The Company</a>
                            </li>
                            <li className="textAni">
                                <a href="/about#Visionary" className="subtitle_24">The Visionary</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                {/* <ul>
                    <li className="textAni">
                        <a href="/manifesto" className="subtitle_24 ">Manifesto</a>
                        <ul className="inner_nav">
                            <li className="textAni">
                                <a href="/manifesto#purpose" className="subtitle_24 ">Purpose</a>
                            </li>
                            <li className="textAni">
                                <a href="/manifesto#philosophy" className="subtitle_24 ">Philosophy</a>
                            </li>
                            <li className="textAni">
                                <a href="/manifesto#pledge" className="subtitle_24 ">Pledge</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li className="textAni">
                        <a href="#promises" className="subtitle_24 ">Promises</a>
                    </li>
                </ul>     */}
                <ul>
                    <li className="textAni">
                        <a href="/#growth" className="subtitle_24 ">Growth Corridor</a>
                        <ul className="inner_nav">
                            <li className="textAni">
                                <a href="" className="subtitle_24 ">Mumbai</a>
                            </li>
                            <li className="textAni">
                                <a href="" className="subtitle_24 ">Nashik <sup>Coming Soon</sup></a>
                            </li>
                            <li className="textAni">
                                <a href="" className="subtitle_24 ">Delhi <sup>Coming Soon</sup></a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li className="textAni">
                        <a href="/contact" className="subtitle_24 ">Contact Us</a>
                    </li>
                    <li className="textAni">
                        <a href="/privacy-policy" className="subtitle_24 ">Privacy Policy</a>
                    </li>
                    <li className="textAni">
                        <a href="/disclaimer" className="subtitle_24 ">Disclaimer</a>
                    </li>
                 
                </ul>
                {/* <ul>
                    <li className="textAni">
                        <a href="" className="subtitle_24 ">FAQs</a>
                    </li>
                    <li className="textAni">
                        <a href="" className="subtitle_24 ">Collaborators</a>
                    </li>
                    <li className="textAni">
                        <a href="" className="subtitle_24 ">Privacy</a>
                    </li>
                    <li className="textAni">
                        <a href="" className="subtitle_24 ">Terms and Conditions</a>
                    </li>
                </ul> */}
            </div>
          
        </div>
    </div>

    
    <div className="footer_para_wrapper">
        <p className="disclaimer_text">
            The House of Abhinandan Lodha has been established in 2020 and is not, in any manner, associated with 'Lodha' or 'Lodha Group'.
        </p>
        <p className="footer_para">
            This document / material / prospectus / website and any related communication is a conceptual representation intended solely for general awareness and does not purport to constitute and shall not be construed as an offer, invitation to offer, advertisement, solicitation, marketing of any real estate project or binding agreement of any kind all of which are subject to the provisions of the Real Estate (Regulation and Development) Act, 2016 or any other applicable law in force and the rules made 
        </p>
        <p className="footer_para">
            The information contained herein, including but not limited to images, illustrations, plans, and descriptions, is merely indicative and provided for representational and informational purposes only. In no event shall ‘The House of Abhinandan Lodha’ and/or its group companies and entities be liable to any third party for any loss or damage arising from use of or reference to any information provided in this document / material / prospectus / website. All content in this document / material / prospectus / website is subject to modification-
        </p>
    </div>

    <div className="copyright">
        2025 - &copy; HoABL
    </div>
</footer>

  );
} 