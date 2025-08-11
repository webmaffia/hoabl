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
    const stored = localStorage.getItem('NurixsessionData');
    const nowTime = Date.now();
    const expiryDays = 30 * 24 * 60 * 60 * 1000;

    if (!stored || nowTime - JSON.parse(stored).timestamp > expiryDays) {
      const sessionId = generateSessionId();
      localStorage.setItem(
        'NurixsessionData',
        JSON.stringify({ sessionId, timestamp: nowTime })
      );
    }

    // Add click listener to open widget on #chat-demo-nurix
    const chatDiv = document.getElementById('chat-demo-nurix');
    if (chatDiv) {
      chatDiv.addEventListener('click', () => {
        const sessionData = JSON.parse(localStorage.getItem('NurixsessionData'));
        if (window.nurixVoiceWidget) {
          window.nurixVoiceWidget('OPEN', {
            sessionId: sessionData.sessionId,
            userId: 'xxxx',
          });
        }
      });
    }

    // Add click listener to .decline-btn to close widget
    const declineBtn = document.querySelector('.decline-btn');
    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        if (window.nurixVoiceWidget) {
          window.nurixVoiceWidget('CLOSE');
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
