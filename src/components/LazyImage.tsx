import { useEffect, useRef, useState } from "react";

const LazyImage = ({ className, src, alt, width, height }: { className: string, src: string, alt: string, width: string, height: string}) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${width} / ${height}`, // Maintains aspect ratio
        backgroundColor: "#f0f0f0",
      }}
    >
      {isVisible && (
        <img
          src={src}
          alt={alt}
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  );
};

export default LazyImage;
