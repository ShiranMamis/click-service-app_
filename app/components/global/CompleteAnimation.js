import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "@/public/Complete.json";

export default function CompleteAnimation({ onAnimationEnd }) {
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
    <div className="fixed inset-0 bg-[rgb(250,250,250)] flex flex-col text-center items-center justify-center">
      <div className="w-[50%]" ref={containerRef} />
      <h1 className="mt-4 text-xl font-bold"> הבקשה התקבלה בהצלחה!</h1>
      <p>ניתן לעקוב אחר ההזמנה בעמוד היסטוריית ההזמנות</p>
    </div>
  );
}
