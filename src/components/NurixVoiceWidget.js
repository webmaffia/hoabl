

'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export default function NurixVoiceWidget() {
  useEffect(() => {
    window.onload = () => {
      if (window.nurixVoiceWidget) {
        window.nurixVoiceWidget('OPEN',{ sessionId: "1234567", userId: "xxxx"});
      }
    };
  }, []);

  return (
    <>
      <div id="chat-demo-nurix"></div>
      <Script
        src="https://d3udl6i7sipqjw.cloudfront.net/voice-demo-hoabl/bundle.js"
        strategy="afterInteractive"
        async
      />
    </>
  );
}

