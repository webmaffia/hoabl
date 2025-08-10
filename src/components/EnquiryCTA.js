"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePopup } from "./PopupContext";

const EnquiryCTA = () => {
  const { handleStickyTagClick } = usePopup();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isHomepage = window.location.pathname === "/";
      const scrollY = window.scrollY;
      
      if (isHomepage && scrollY > 1000 && scrollY <= 8000) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
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
      <div className="sticky_tag" onClick={handleStickyTagClick}>
        <span>ENQUIRE NOW</span>
      </div>
    </div>
  );
};

export default EnquiryCTA; 