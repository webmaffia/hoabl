"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const PopupContext = createContext();

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

export const PopupProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  
  const handleStickyTagClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActive(true);
  };

  
  const handleClose = (e) => {
    
    setIsActive(false);
  };

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 180) {
        setIsActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
   
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const value = {
    isActive,
    handleStickyTagClick,
    handleClose
  };

  return (
    <PopupContext.Provider value={value}>
      {children}
    </PopupContext.Provider>
  );
}; 