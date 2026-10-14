"use client";
import { useEffect } from "react";
export function Motion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (!preference.matches)
            entry.target.animate(
              [
                { opacity: 0.7, transform: "translateY(12px)" },
                { opacity: 1, transform: "none" },
              ],
              { duration: 400, easing: "ease-out" },
            );
        });
      },
      { threshold: 0.15 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (preference.matches)
        document.getAnimations().forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
    };
  }, []);
  return null;
}
