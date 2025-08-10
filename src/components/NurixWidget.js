'use client';

import Script from 'next/script';

export default function NurixWidget() {
  return (
    <>
      <div id="nurix-widget"></div>
      <Script
        id="nurix-widget"
        src="https://d3udl6i7sipqjw.cloudfront.net/prod/webwidget/chat.js"
        data-api-key="71bffb592ac644c2a443d1a7d6ba224e"
        data-widget-id="145"
        crossOrigin="anonymous"
      />
    </>
  );
}


