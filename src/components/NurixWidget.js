'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export default function NurixWidget() {
    useEffect(() => {
    const openChatWidget = () => {
      if (window.nurixWidget) {
        window.nurixWidget('OPEN', { sessionId: '1234', userId: 'xxxx' });
      } else {
        setTimeout(openWidget, 300); 
      }
    };
    openChatWidget();
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
      />
    </>
  );
}