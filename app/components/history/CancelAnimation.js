import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "@/public/Delete.json";

export default function CancelAnimation({ onAnimationEnd }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationEnd(); // Call the callback after the animation duration
    }, 2000); // Adjust duration to match your animation time

    return () => clearTimeout(timer); // Clean up timer
  }, [onAnimationEnd]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const anim = lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: animationData, // Pass your animation data here
    });

    return () => {
      // Clean up animation when component unmounts
      anim.destroy();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[rgb(250,250,250)] flex flex-col items-center justify-center px-[25%]">
      <div ref={containerRef} />
      <h1 className="mt-4 text-2xl font-bold ">ההזמנה בוטלה</h1>
    </div>
  );
}
