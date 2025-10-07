import Image from "next/image";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Circle = ({ status, icon }) => {
  const status_steps = [
    "הזמנה התקבלה",
    "הזמנה בטיפול",
    "הזמנה אושרה",
    'נדחה ע"י גורם טכני',
    "הזמנה הסתיימה",
    'בוטל ע"י" משתמש',
  ];
  const color =
    status_steps.indexOf(status) === 4
      ? "rgba(38, 150, 7, 1)"
      : status_steps.indexOf(status) === 3 || status_steps.indexOf(status) === 5
      ? "rgba(198, 17, 0, 1)"
      : "#0077B6";
  return (
    <div style={{ position: "relative", width: 240, height: 240, opacity: 10 }}>
      <CircularProgressbar
        value={
          status_steps.indexOf(status) < 3
            ? (100 / 4) * (status_steps.indexOf(status) + 1)
            : 100
        }
        styles={buildStyles({
          width: "3px",
          textColor: "blue",
          pathColor: color,
          trailColor: "rgb(235, 240, 242)",
        })}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <Image
          src={
            status_steps.indexOf(status) === 4
              ? "/check.png"
              : status_steps.indexOf(status) === 3 ||
                status_steps.indexOf(status) === 5
              ? "/cancel.png"
              : `/TypesIcons/${icon}.png`
          }
          width={50}
          height={50}
          alt="car-icon"
        />
        <h1 className="font-medium text-xl">{status}</h1>
        <p className="text-[#7E7E7E]">
          {status_steps.indexOf(status) < 3
            ? `שלב ${status_steps.indexOf(status) + 1}`
            : "הסתיים"}
        </p>
      </div>
    </div>
  );
};

export default Circle;
