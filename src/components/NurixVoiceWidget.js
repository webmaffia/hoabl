'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export default function NurixVoiceWidget() {

  const generateSessionId = () => {
    const now = new Date();
    const pad = (n, width = 2) => String(n).padStart(width, '0');
    return (
      now.getFullYear() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds()) +
      pad(now.getMilliseconds(), 3)
    );
  };


  useEffect(() => {
    const storageKey = 'NurixSessionData';
    const nowTime = Date.now();
    const expiryMs = 60 * 24 * 60 * 60 * 1000; 

    let sessionId;
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      const parsed = JSON.parse(stored);
      if (nowTime - parsed.timestamp < expiryMs) {
        sessionId = parsed.sessionId;
        console.log(`Existing session reused: ${sessionId}`);
      } else {
        sessionId = generateSessionId();
        localStorage.setItem(storageKey, JSON.stringify({ sessionId, timestamp: nowTime }));
        console.log(`Session expired, new session created: ${sessionId}`);
      }
    } else {
      sessionId = generateSessionId();
      localStorage.setItem(storageKey, JSON.stringify({ sessionId, timestamp: nowTime }));
      console.log(`No session found, new session created: ${sessionId}`);
    }

    const chatDiv = document.getElementById('chat-demo-nurix');
    if (chatDiv) {
      chatDiv.addEventListener('click', () => {
        if (window.nurixVoiceWidget) {
          window.nurixVoiceWidget("OPEN", { sessionId, userId: "xxxx" });
        }
      });
    }
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
