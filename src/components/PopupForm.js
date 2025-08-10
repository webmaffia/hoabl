"use client";
import React from "react";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { usePopup } from "./PopupContext";

const PopupForm = () => {
  const { isActive, handleClose } = usePopup();

  return (
    <>
      <div 
        className={`overlay ${isActive ? 'active' : ''}`} 
        onClick={handleClose}
      ></div>
      <div className={`popup_form ${isActive ? 'active' : ''}`}>
        <div
        
          className="close_text view_link text_bg subtitle_24"
          onClick={handleClose}
        >
          Close
        </div>
        <ContactForm/>
      </div>
    </>
  );
};

export default PopupForm; 