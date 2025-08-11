'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export default function NurixWidget() {
  useEffect(() => {
    let sessionId = localStorage.getItem('nurixChatSessionId');
    if (!sessionId) {
      const now = new Date();
      sessionId = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}${String(now.getMilliseconds()).padStart(3, '0')}`;
      localStorage.setItem('nurixChatSessionId', sessionId);
    }

    // Function to open widget
    const openWidget = () => {
      if (window.nurixWidget) {
        window.nurixWidget('OPEN', { sessionId, userId: 'xxxx' });
      } else {
        setTimeout(openWidget, 300);
      }
    };

    const widgetDiv = document.getElementById('nurix-widget');
    if (widgetDiv) {
      widgetDiv.addEventListener('click', openWidget);
    }

    return () => {
      if (widgetDiv) widgetDiv.removeEventListener('click', openWidget);
    };
  }, []);

  return (
    <>
      <div id="nurix-widget" style={{ cursor: 'pointer' }}></div>
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