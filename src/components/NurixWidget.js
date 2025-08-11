'use client';
import Script from 'next/script';

export default function NurixWidget() {
  return (
    <>
      <div id="nurix-widget"></div>
      <Script
        id="nurix-widget"
        src="https://d3udl6i7sipqjw.cloudfront.net/prod/webwidget/chat.js"
        data-api-key="877b2acef1e946a7af3bfbd109776bc7"
        data-widget-id="146"
        crossOrigin="anonymous"
        type="module"
        data-controller="client"
      />
    </>
  );
}



