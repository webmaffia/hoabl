'use client';
import Script from 'next/script';

export default function NurixWidget() {
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
        data-controller="client"
      />
    </>
  );
}




