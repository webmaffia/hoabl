"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { killAllGSAP } from "./gsapCleanup";

export default function Header() {
 const pathname = usePathname();
  const [showHeader, setShowHeader] = useState(true);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [shouldShowBlackHeader, setShouldShowBlackHeader] = useState(false);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const lastScrollY = useRef(0);

  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const bannerAnimationEnd = 4000; // Banner ScrollTrigger end value
      
      setCurrentScrollY(scrollY);
      
      // Show/hide header based on scroll direction
      if (scrollY > lastScrollY.current && scrollY > 50) {
        setShowHeader(true); 
      } else {
        setShowHeader(true); 
      }
      
      // Don't apply black header when still within banner animation area
      if (scrollY <= 100) {
        setShouldShowBlackHeader(false);
      } else if (scrollY > 100 && hasBeenShown && scrollY > bannerAnimationEnd) {
        // Only apply black header when we've scrolled past the banner animation
        setShouldShowBlackHeader(true);
      } else if (scrollY <= bannerAnimationEnd) {
        // Ensure black header is not applied when within banner animation area
        setShouldShowBlackHeader(false);
      }
      
      lastScrollY.current = scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasBeenShown]);

  // Track if header has been shown at least once
  useEffect(() => {
    if (showHeader && !hasBeenShown) {
      setHasBeenShown(true);
    }
  }, [showHeader, hasBeenShown]);

  // Handle body overflow when menu is active
  useEffect(() => {
    if (isMenuActive) {
      document.body.classList.add('overflow');
    } else {
      document.body.classList.remove('overflow');
    }
  }, [isMenuActive]);

  const handleMenuClick = (e) => {
    e.preventDefault();
    setIsMenuActive(true);
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    setIsMenuActive(false);
  };

  // Build className conditionally
  const isHomepage = pathname === "/";
  const headerClassName = `header ${showHeader ? (currentScrollY > 100 && currentScrollY <= 8000 ? `active ${isHomepage ? 'whiteheader' : ''}` : (shouldShowBlackHeader ? 'active' : '')) : 'header--hidden'}`;



  // fallback handlers for back/forward and full reloads
  useEffect(() => {
    const onPop = () => killAllGSAP();
    const onBefore = () => killAllGSAP();

    window.addEventListener("popstate", onPop);
    window.addEventListener("beforeunload", onBefore);

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("beforeunload", onBefore);
    };
  }, [pathname]);

  // Synchronous NavLink wrapper: runs killAllGSAP() before Next does client navigation.
  const NavLink = ({ href, children, className = "", ...props }) => (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        try {
          setIsMenuActive(false);
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
    <header className={headerClassName}>
      <NavLink href="/" className={`logo_img ${isMenuActive ? "active" : ""}`} >
        <img src="/images/logo.webp" alt="logo" width="357" height="194" />
      </NavLink>

      <div className={`header_nav ${isMenuActive ? "active" : ""}`}>
        <div className="subtitle_18 close_btn" onClick={handleCloseClick}>Close</div>
        <ul className="header_navigation">
          <li className="header_list">
            <NavLink href="/about" className="subtitle_22 header_link view_white text_bg2" >ABOUT US</NavLink>
            <ul className="inner_header">
              <li className="header_sub_list">
                <NavLink href="/about#company" className="subtitle_18 header_sub_link view_white text_bg2" >The Company</NavLink>
              </li>
              <li className="header_sub_list">
                <NavLink href="/about#Visionary" className="subtitle_18 header_sub_link view_white text_bg2" >The Visionary</NavLink>
              </li>
            </ul>
          </li>

          <li className="header_list">
            <NavLink href="/manifesto" className="subtitle_22 header_link view_white text_bg2" >MANIFESTO</NavLink>
            <ul className="inner_header">
              <li className="header_sub_list">
                <NavLink href="/manifesto#purpose" className="subtitle_18 header_sub_link view_white text_bg2" >Purpose</NavLink>
              </li>
              <li className="header_sub_list">
                <NavLink href="/manifesto#philosophy" className="subtitle_18 header_sub_link view_white text_bg2" >Philosophy</NavLink>
              </li>
              <li className="header_sub_list">
                <NavLink href="/manifesto#pledge" className="subtitle_18 header_sub_link view_white text_bg2" >Pledge</NavLink>
              </li>
            </ul>
          </li>
<li className="header_list">
            <NavLink href="/#promises" className="subtitle_22 header_link view_white text_bg2" >PROMISES</NavLink>
          </li>
          <li className="header_list">
            <NavLink href="/#growth" className="subtitle_22 header_link view_white text_bg2" >GROWTH CORRIDORS</NavLink>
          </li>

          <li className="header_list">
            <NavLink href="/contact" className="subtitle_22 header_link view_white text_bg2" >CONTACT</NavLink>
          </li>
        </ul>
      </div>

      <div className="menu_btn" onClick={() => setIsMenuActive(true)}>
        <img src="/images/menu.webp" alt="menu" className="menu_img" width="56" height="36" />
      </div>
    </header>
  );
}