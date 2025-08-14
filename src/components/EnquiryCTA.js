"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePopup } from "./PopupContext";

const EnquiryCTA = () => {
  const { handleStickyTagClick } = usePopup();
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const stickyRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isHomepage = window.location.pathname === "/";
      const scrollY = window.scrollY;
      if (isHomepage && scrollY > 1500 && scrollY <= 3000) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Check intersection with footer
      const stickyEl = stickyRef.current;
      const footerEl = document.querySelector("footer");
      if (stickyEl && footerEl) {
        const stickyRect = stickyEl.getBoundingClientRect();
        const footerRect = footerEl.getBoundingClientRect();
        // Check if sticky tag bottom is below footer top (touching or overlapping)
        if (stickyRect.bottom > footerRect.top) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="sticky">
      <div
        className={`sticky_tag${isActive ? " active_white" : ""}`}
        onClick={handleStickyTagClick}
        ref={stickyRef}
      >
        <span>ENQUIRE NOW</span>
      </div>
    </div>
  );
};

export default EnquiryCTA; 