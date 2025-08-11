'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function NurixVoiceWidget() {
  const [sessionId, setSessionId] = useState(null);

  const generateSessionId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  useEffect(() => {
    const storedData = localStorage.getItem('nurixSessionData');
    const now = Date.now();
    const expiryTime = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

    if (storedData) {
      const parsed = JSON.parse(storedData);
      if (now - parsed.timestamp < expiryTime) {
        setSessionId(parsed.sessionId);
        return;
      }
    }

    const declineBtn = document.querySelector('.decline-btn');
    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        if (window.nurixVoiceWidget) {
          window.nurixVoiceWidget('CLOSE');
        }
      });
    }

    const newSessionId = generateSessionId();
    localStorage.setItem(
      'nurixSessionData',
      JSON.stringify({ sessionId: newSessionId, timestamp: now })
    );
    setSessionId(newSessionId);
  }, []);

  const handleClick = () => {
    const openWidget = () => {
      if (window.nurixVoiceWidget) {
        window.nurixVoiceWidget('OPEN', {
          sessionId: sessionId,
          userId: 'xxxx',
        });
      } else {
        setTimeout(openWidget, 300);
      }
    };
    openWidget();
  };

  

  return (
    <>
      <div
        id="chat-demo-nurix"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      ></div>

      <Script
        src="https://d3udl6i7sipqjw.cloudfront.net/voice-demo-hoabl/bundle.js"
        strategy="afterInteractive"
        async
      />
    </>
  );
}

