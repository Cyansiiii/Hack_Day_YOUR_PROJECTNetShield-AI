import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      duration: 1.1,
      anchors: {
        offset: 120
      }
    });

    const handleScroll = (instance) => {
      const velocity = Number.isFinite(instance.velocity) ? instance.velocity : 0;
      const clampedVelocity = Math.max(-1.5, Math.min(1.5, velocity));
      document.documentElement.style.setProperty("--scroll-velocity", `${clampedVelocity}`);
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      document.documentElement.style.removeProperty("--scroll-velocity");
    };
  }, []);
}
