'use client';

import Script from 'next/script';

export default function NurixVoiceWidget() {
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
