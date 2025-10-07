"use client";
import Header from "@/app/components/global/Header";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export default function page() {
  const router = useRouter();

  const handleScan = (data) => {
    if (data) {
      router.push(data); // Redirect to the URL in the QR code
    }
  };

  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="h-screen bg-custom-ombre text-center flex flex-col items-center">
      <Header title="סריקת ברקוד" isArrow={true} handleClick={router.back} />
      <h1 className="text-xl font-medium mt-8">סרקו את ברקוד ה-QR של ההזמנה</h1>
      <p>הברקוד נמצא במסך פרטי ההזמנה של הלקוח</p>
      <button onClick={() => handleScan("/order/103")}> qr scanner </button>
      {/* <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      /> */}
      {/* <div className="flex-1  pb-24 p-5 flex items-center w-full"> */}
      {/* {order ? (
        <div
          onClick={() => setOrder()}
          className="w-full rounded-lg h-full bg-black"
        ></div>
      ) : (
        <>
          <p>הזמנת רכב- הזמנה מספר 211</p>
        </>
      )} */}
    </div>
  );
}
