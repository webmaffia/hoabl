'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function NurixVoiceWidget() {
  const [sessionId, setSessionId] = useState(null);

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
    const newSessionId = now.toString();
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
