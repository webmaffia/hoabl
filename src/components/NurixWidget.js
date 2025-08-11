'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export default function NurixWidget() {
   useEffect(() => {

    let sessionId = localStorage.getItem('nurixChatSessionId');
    if (!sessionId) {
      sessionId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      localStorage.setItem('nurixChatSessionId', sessionId);
    }
      const openWidget = () => {
        if (window.nurixVoiceWidget) {
          window.nurixWidget("OPEN", { sessionId: "123456", userId: "xxxx"} )
        } else {
          setTimeout(openWidget, 300);
        }
      };
  
      openWidget();
    }, []);

  return (
    <>
      <div id="nurix-widget"></div>
      <Script
        id="nurix-widget"
        src="https://d3udl6i7sipqjw.cloudfront.net/prod/webwidget/chat.js"
        data-api-key="c714d6ccc4d94cf682b3dee5c214736f"
        data-widget-id="138"
        crossOrigin="anonymous"
        type="module"
        data-controller="client"
      />
    </>
  );
}




