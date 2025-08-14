"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenisInstance } from "@/components/LenisProvider";

export default function ScrollToTop() {
  const pathname = usePathname();
  const lenisRef = useLenisInstance();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";

    requestAnimationFrame(() => {
      const lenis = lenisRef?.current;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    });
  }, [pathname, lenisRef]);

  return null;
}
