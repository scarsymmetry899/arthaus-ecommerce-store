"use client";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = "", style }: SkeletonProps) {
  return (
    <div
      className={`rounded-[3px] ${className}`}
      style={{
        background: "linear-gradient(90deg, var(--cream) 25%, var(--border-color) 50%, var(--cream) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <Skeleton
        className="w-full rounded-[4px]"
        style={{ aspectRatio: "4/5" }}
      />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-2.5 w-20" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-14" />
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
      <Skeleton className="w-full mb-3" style={{ aspectRatio: "16/9" }} />
      <Skeleton className="h-2.5 w-16 mb-2" />
      <Skeleton className="h-5 w-48 mb-1.5" />
      <Skeleton className="h-3 w-full mb-1" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  );
}

export function ArtistCardSkeleton() {
  return (
    <div className="animate-pulse">
      <Skeleton className="w-full rounded-[8px] mb-3" style={{ aspectRatio: "1/1" }} />
      <Skeleton className="h-4 w-32 mb-1.5" />
      <Skeleton className="h-3 w-20 mb-2" />
      <div className="flex gap-1">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}
