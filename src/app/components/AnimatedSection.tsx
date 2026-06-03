import { CSSProperties, ReactNode, ElementType } from "react";
import { useInView } from "../hooks/useInView";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  distance?: number;
  threshold?: number;
  style?: CSSProperties;
  className?: string;
  as?: ElementType;
}

export function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
  distance = 50,
  threshold = 0.1,
  style,
  className,
  as: Tag = "div" as ElementType,
}: AnimatedSectionProps) {
  const [ref, isInView] = useInView(threshold);

  const getTransform = () => {
    if (direction === "up") return `translateY(${distance}px)`;
    if (direction === "left") return `translateX(-${distance}px)`;
    if (direction === "right") return `translateX(${distance}px)`;
    return "none";
  };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : getTransform(),
        transition: `opacity 1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

export function AnimatedImage({
  src,
  alt,
  style,
  delay = 0,
}: {
  src: string;
  alt: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const [ref, isInView] = useInView(0.08);

  return (
    <div
      style={{
        overflow: "hidden",
        ...style,
      }}
    >
      <img
        ref={ref as React.RefObject<HTMLImageElement>}
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: isInView ? "scale(1)" : "scale(1.08)",
          transition: `transform 1.4s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        }}
      />
    </div>
  );
}

export function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return null;
}
