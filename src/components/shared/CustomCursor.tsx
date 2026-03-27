"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Raw cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Lagged spring position for the outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Derived positions — center each element on the cursor point
  const dotLeft  = useTransform(cursorX, (x) => x - 3);   // half of 6px dot
  const dotTop   = useTransform(cursorY, (y) => y - 3);
  const ringLeft = useTransform(springX, (x) => x - 16);  // half of 32px ring
  const ringTop  = useTransform(springY, (y) => y - 16);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsPointerDevice(mq.matches);
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as Element;
      setIsHovering(
        !!target.closest('a, button, [role="button"], label, select, input, textarea')
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* Inner dot — tracks cursor exactly */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#C5A572",
          pointerEvents: "none",
          zIndex: 9999,
          left: dotLeft,
          top: dotTop,
        }}
      />

      {/* Outer ring — spring lag behind cursor */}
      <motion.div
        aria-hidden="true"
        animate={{
          width:           isHovering ? 48 : 32,
          height:          isHovering ? 48 : 32,
          backgroundColor: isHovering ? "rgba(197,165,114,0.12)" : "transparent",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position:    "fixed",
          borderRadius: "50%",
          border:       "1px solid rgba(197,165,114,0.7)",
          pointerEvents: "none",
          zIndex:        9998,
          left: ringLeft,
          top:  ringTop,
        }}
      />
    </>
  );
}
