"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisProvider({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,
      smooth: true,
    });
    lenisRef.current = lenis;

    try {
      // Expose for pages/components that may want to use it directly
      window.__lenis = lenis;
    } catch (_) {}

    // GSAP + Lenis sync
    try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
    try { ScrollTrigger.defaults({ anticipatePin: 1 }); } catch (_) {}

    // Prefer the official Lenis + ScrollTrigger sync
    try { lenis.on('scroll', () => ScrollTrigger.update()); } catch (_) {}

    // Use window scrolling; no scrollerProxy required for Lenis v1
    try { ScrollTrigger.refresh(); } catch (_) {}

    const raf = (time) => {
      try { lenis.raf(time); } catch (_) {}
      try { ScrollTrigger.update(); } catch (_) {}
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const findTargetFromHash = () => {
      const { hash } = window.location;
      if (!hash || hash === "#") return null;
      const id = decodeURIComponent(hash.slice(1));
      return document.getElementById(id) || document.querySelector(hash);
    };

    const scrollToHash = (immediate = false) => {
      try {
        const target = findTargetFromHash();
        if (!target) return false;
        // Compute a safe Y that avoids being trapped mid pin
        const rect = target.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        let y = scrollY + rect.top;
        // Small offset so triggers starting near viewport top are inside start range
        const offset = 8;
        y = Math.max(0, y - offset);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(y, { duration: immediate ? 0 : 1 });
        } else {
          window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
        }
        return true;
      } catch (_) {
        return false;
      }
    };

    const scrollToHashWithRetries = (
      immediate = false,
      attempts = 30,
      delayMs = 100,
      keepTriesAfterSuccess = 5
    ) => {
      let tries = 0;
      let successRuns = 0;
      const id = setInterval(() => {
        tries += 1;
        const didScroll = scrollToHash(immediate);
        if (didScroll) {
          successRuns += 1;
          if (successRuns >= keepTriesAfterSuccess) {
            clearInterval(id);
            return;
          }
        }
        if (tries >= attempts) {
          clearInterval(id);
        }
      }, delayMs);
    };

    const onHashChange = () => {
      scrollToHashWithRetries(false, 40, 100, 5);
      try { ScrollTrigger.refresh(); } catch (_) {}
    };
    const onLoad = () => {
      scrollToHashWithRetries(true, 40, 100, 5);
      try { ScrollTrigger.refresh(); } catch (_) {}
    };

    const onStRefresh = () => {
      try { lenis.resize?.(); } catch (_) {}
      try { scrollToHashWithRetries(true); } catch (_) {}
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    window.addEventListener("load", onLoad);
    try { ScrollTrigger.addEventListener('refresh', onStRefresh); } catch (_) {}

    // Handle initial mount (SPA navigations or direct loads)
    requestAnimationFrame(() => {
      scrollToHashWithRetries(true, 40, 100, 5);
      try { ScrollTrigger.refresh(); } catch (_) {}
    });
    setTimeout(() => {
      scrollToHashWithRetries(true, 40, 100, 5);
      try { ScrollTrigger.refresh(); } catch (_) {}
    }, 300);

    return () => {
      try { window.removeEventListener("hashchange", onHashChange); } catch (_) {}
      try { window.removeEventListener("popstate", onHashChange); } catch (_) {}
      try { window.removeEventListener("load", onLoad); } catch (_) {}
      try { ScrollTrigger.removeEventListener('refresh', onStRefresh); } catch (_) {}
      try { lenis.destroy(); } catch (_) {}
      lenisRef.current = null;
    };
  }, []);

  // Re-run hash scroll when route path changes (SPA navigations)
  useEffect(() => {
    let attempts = 0;
    let intervalId;
    const tryScroll = () => {
      attempts += 1;
      try {
        const { hash } = window.location;
        if (hash) {
          const lenis = lenisRef.current;
          const target = document.getElementById(hash.slice(1)) || document.querySelector(hash);
          if (target && lenis) {
            lenis.scrollTo(target, { duration: 0.8 });
            try { ScrollTrigger.refresh(); } catch (_) {}
            clearInterval(intervalId);
          }
        } else {
          clearInterval(intervalId);
        }
      } catch (_) {}
      if (attempts >= 50) {
        clearInterval(intervalId);
      }
    };
    // Small initial delay to allow components to mount
    const startId = setTimeout(() => {
      try { ScrollTrigger.refresh(); } catch (_) {}
      tryScroll();
      intervalId = setInterval(tryScroll, 100);
    }, 50);
    return () => {
      clearTimeout(startId);
      clearInterval(intervalId);
    };
  }, [pathname]);

  return <>{children}</>;
}