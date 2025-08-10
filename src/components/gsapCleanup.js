import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

try {
  gsap.registerPlugin(ScrollTrigger);
} catch (e) {
  // ignore if already registered or SSR
}

export function killAllGSAP() {
  try {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.getAll().forEach((t) => {
        try { t.kill(true); } catch (e) {  }
      });
    }
  } catch (e) {
    // ignore
  }

  try {
    if (gsap && gsap.globalTimeline) gsap.globalTimeline.clear();
  } catch (e) {}

  // normalize any split text elements by restoring original text
  try {
    document.querySelectorAll('[data-original-text]')
      .forEach((el) => {
        try {
          const original = el.getAttribute('data-original-text');
          if (original != null) {
            el.textContent = original;
            el.removeAttribute('data-original-text');
          }
        } catch (e) { /* ignore */ }
      });
  } catch (e) {}

  try {
    document.querySelectorAll(".pin-spacer, .gsap-pin-spacer, .scrolltrigger-pin-spacer")
      .forEach((sp) => {
        const parent = sp.parentNode;
        if (!parent) return;
        // move children out and remove spacer
        while (sp.firstChild) parent.insertBefore(sp.firstChild, sp);
        parent.removeChild(sp);
      });
  } catch (e) {}

  try {
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  } catch (e) {}
}
