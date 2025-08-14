
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
import ScrollToTop from "@/components/ScrollTop";

export const metadata = {
  title: "The House of Abhinandan Lodha | India&#x27;s Largest Branded Land Developer",
  description: "The House of Abhinandan Lodha: democratizing land through technology, creating secure investment opportunities for intergenerational wealth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-56XSQJC6');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
    
      <body>    
 {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-56XSQJC6"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
          <LenisProvider>
      <ScrollToTop/>
        <PopupProvider>
          <Header />
          <main className="wrapper">
            {children}
            <PopupForm/>
          </main>
          <Footer/>
          <EnquiryCTA /> 
      {/* <WhatsappChat/> */}
         <NurixVoiceWidget />
         <NurixWidget/> 
        </PopupProvider>
  </LenisProvider>
      </body>
    </html>
   
  );
}
