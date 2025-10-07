import animationData from "@/public/No Result Search.json";
import Lottie from "lottie-web";
import React, { useEffect, useRef } from "react";

export default function NotFoundSearch() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const anim = Lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData, // Pass your animation data here
    });

    return () => {
      // Clean up animation when component unmounts
      anim.destroy();
    };
  }, []);
  return (
    <div className="w-full h-[90%] flex flex-col justify-center items-center text-lg ">
      <div ref={containerRef} />
      <p className="-mt-8">לא נמצאו תוצאות התואמות לחיפוש שלך</p>
    </div>
  );
}
