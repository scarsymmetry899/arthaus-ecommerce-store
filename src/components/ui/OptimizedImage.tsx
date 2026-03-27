"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  dominantColor?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}

function hexToBlurDataURL(hex: string): string {
  // Create a 1x1 pixel SVG with the dominant color
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'><rect width='1' height='1' fill='${hex}'/></svg>`;
  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className = "",
  dominantColor = "#E8E4DF",
  priority = false,
  style,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const blurDataURL = hexToBlurDataURL(dominantColor);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        placeholder="blur"
        blurDataURL={blurDataURL}
        priority={priority}
        onLoad={() => setLoaded(true)}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 1000}
      sizes={sizes}
      className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      placeholder="blur"
      blurDataURL={blurDataURL}
      priority={priority}
      onLoad={() => setLoaded(true)}
      style={style}
    />
  );
}
