import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function formatNumber(value, decimals) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.75 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(
    shouldReduceMotion ? formatNumber(value, decimals) : formatNumber(0, decimals)
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(formatNumber(value, decimals));
      return undefined;
    }

    if (!isInView) {
      return undefined;
    }

    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayValue(formatNumber(latest, decimals));
      }
    });

    return () => controls.stop();
  }, [decimals, isInView, shouldReduceMotion, value]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18, rotateX: -78 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.75 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}
