"use client";
import { useRef, useEffect,useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterForm from "../FooterForm"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { killAllGSAP } from "../gsapCleanup";


gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const pathname = usePathname();
  const textRef = useRef(null);
  const imgRef = useRef(null);
   const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
      checkIsMobile();
      window.addEventListener("resize", checkIsMobile);
      return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

  useEffect(() => {
  // Delay to ensure DOM is updated before running GSAP
  const timeout = setTimeout(() => {
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
    ScrollTrigger.refresh();
  }, 0);

  return () => {
    clearTimeout(timeout);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, [isMobile, pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onPop = () => killAllGSAP();
    const onBefore = () => killAllGSAP();

    window.addEventListener("popstate", onPop);
    window.addEventListener("beforeunload", onBefore);

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("beforeunload", onBefore);
    };
  }, [pathname,isMobile]);

  // Synchronous NavLink wrapper: runs killAllGSAP() before Next does client navigation.
  const NavLink = ({ href, children, className = "", ...props }) => (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        try {
          // Only kill GSAP when navigating to a different pathname (not just a hash change)
          const hrefString = typeof href === 'string' ? href : String(href);
          let targetPathname = pathname;
          try {
            const url = new URL(hrefString, window.location.origin);
            targetPathname = url.pathname || '/';
          } catch (_) {
            const [pathPart] = hrefString.split('#');
            if (pathPart) targetPathname = pathPart;
          }
          if (targetPathname !== pathname) {
            // must be synchronous before Next.js client nav
            killAllGSAP();
          }
        } catch (err) {
          console.warn("killAllGSAP failed:", err);
        }
        if (props.onClick) props.onClick(e);
      }}
      {...props}
    >
      {children}
    </Link>
  );

  return (
  <footer>
   <div className="footer_wrapper">
        <div className="footer_left">
            <a href="" className="logo_img">
                <img src="/images/green/logo.webp" alt="logo" width="2320" height="524" />
            </a>
            <address>
                <div className="subtitle_30">
                    Corporate office -
                </div>
                <div className="subtitle_22">
                    3rd Floor, Lodha Excelus, Apollo Mills
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
            <div className="subtitle_13343">GET IN TOUCH</div>
            <FooterForm />
        </div>
    </div>
    {/* <div className="footer_wrapper">
        <div className="footer_left">
        </div>
        <div className="footer_container">
          
        </div>
    </div> */}

            <div className="form_navigation">
                <ul>
                    <li>
                        <NavLink href="/about" className="subtitle_24 textAni">About us</NavLink>
                        <ul className="inner_nav">
                            <li className="textAni">
                                <NavLink href="/about#company" className="subtitle_24">The Company</NavLink>
                            </li>
                            <li className="textAni">
                                <NavLink href="/about#Visionary" className="subtitle_24">The Visionary</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li className="textAni">
                        <NavLink href="/manifesto" className="subtitle_24 ">Manifesto</NavLink>
                        <ul className="inner_nav">
                            <li className="textAni">
                                <NavLink href="/manifesto#purpose" className="subtitle_24 ">Purpose</NavLink>
                            </li>
                            <li className="textAni">
                                <NavLink href="/manifesto#philosophy" className="subtitle_24 ">Philosophy</NavLink>
                            </li>
                            <li className="textAni">
                                <NavLink href="/manifesto#pledge" className="subtitle_24 ">Pledge</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li className="textAni">
                        <NavLink href="/promises" className="subtitle_24 ">Promises</NavLink>
                    </li>
                </ul>
                <ul>
                    <li className="textAni">
                        <NavLink href="/#growth" className="subtitle_24 ">Growth Corridor</NavLink>
                        <ul className="inner_nav">
                            <li className="textAni">
                                <NavLink href="" className="subtitle_24 ">Mumbai</NavLink>
                            </li>
                            <li className="textAni">
                                <NavLink href="" className="subtitle_24 ">Nashik <sup>Coming Soon</sup></NavLink>
                            </li>
                            <li className="textAni">
                                <NavLink href="" className="subtitle_24 ">Delhi <sup>Coming Soon</sup></NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li className="textAni">
                        <NavLink href="/contact" className="subtitle_24 ">Contact Us</NavLink>
                    </li>
                    <li className="textAni">
                        <NavLink href="/privacy-policy" className="subtitle_24 ">Privacy Policy</NavLink>
                    </li>
                    <li className="textAni">
                        <NavLink href="/disclaimer" className="subtitle_24 ">Disclaimer</NavLink>
                    </li>
                </ul>
                {/* <ul>
                    <li className="textAni">
                        <NavLink href="" className="subtitle_24 ">FAQs</NavLink>
                    </li>
                    <li className="textAni">
                        <NavLink href="" className="subtitle_24 ">Collaborators</NavLink>
                    </li>
                    <li className="textAni">
                        <NavLink href="" className="subtitle_24 ">Privacy</NavLink>
                    </li>
                    <li className="textAni">
                        <NavLink href="" className="subtitle_24 ">Terms and Conditions</NavLink>
                    </li>
                </ul> */}
            </div>
    
    <div className="footer_para_wrapper textAni">
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