"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import animationData from "@/public/Welcome Page.json";
import Lottie from "lottie-web";
import { useRouter } from "next/navigation";
import useAuth from "./hooks/useAuth";

export default function Home() {
  const containerRef = useRef(null);
  const { user, login } = useAuth({ middleware: "guest" });
  const [errors, setErrors] = useState(null);
  const router = useRouter();

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

  function handleLogin() {
    if (user) {
      router.push("/new-request");
    } else login({ setErrors });
  }

  return (
    <div className="fixed inset-0 flex flex-col justify-between bg-[rgb(250,250,250)] items-center p-4 z-50">
      <div className="flex w-full justify-between">
        <Image src={"/idf.png"} width={55} height={50} alt="idf" />
        <Image src={"/hatal.png"} width={50} height={50} alt="idf" />
      </div>
      <div className="flex flex-col items-center gap-7">
        <div className="text-center">
          <h1 className="text-[40px] font-medium">שירות בקליק</h1>
          <h2 className="text-[#0077B6] text-2xl">מערכת הקריאות של החט"ל</h2>
        </div>
        <div className="w-[150%]" ref={containerRef} />
        <button
          onClick={handleLogin}
          className="text-white rounded-lg w-[80%] p-2  bg-[#0077B6] text-center"
        >
          התחברות למערכת עם MY IDF
        </button>
      </div>
      <p className="w-full text-center text-[rgba(0,0,0,0.2)] p-2">
        פותח ע"י מסגרת אמת
      </p>
    </div>
  );
}
