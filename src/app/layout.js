
import "./style.css";
import "./jash.css";
import "./suraj.css";
import "./lenis.css";
import Header from "../components/Header";
import Script from "next/script";

import EnquiryCTA from "@/components/EnquiryCTA";
import Footer from "@/components/Layout/Footer";
import PopupForm from "@/components/PopupForm";
import { PopupProvider } from "@/components/PopupContext";
import LenisProvider from "@/components/LenisProvider";
import WhatsappChat from "@/components/Whatsapp";
import NurixWidget from "@/components/NurixWidget";
import NurixVoiceWidget from "@/components/NurixVoiceWidget";

export const metadata = {
  title: "The House of Abhinandan Lodha | India&#x27;s Largest Branded Land Developer",
  description: "The House of Abhinandan Lodha: democratizing land through technology, creating secure investment opportunities for intergenerational wealth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
    
        {/* End Google Tag Manager */}
      </head>
    
      <body>
        {/* Google Tag Manager (noscript) */}
     
        {/* End Google Tag Manager (noscript) */}
          <LenisProvider>
    
        <PopupProvider>
          <Header />
          <main className="wrapper">
            {children}
            <PopupForm/>
          </main>
          <Footer/>
          <EnquiryCTA /> 
       <WhatsappChat/>
        <NurixVoiceWidget />
          <NurixWidget/>
        </PopupProvider>
       </LenisProvider>
      </body>
    </html>
   
  );
}
