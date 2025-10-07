import Image from "next/image";
import React, { useState } from "react";
import FullOrder from "./FullOrder";

export default function Request(props) {
  const [isOpen, setIsOpen] = useState(false);
  const styles = [
    {
      status: "הזמנה התקבלה",
      style: "bg-[rgba(46,124,246,0.13)] text-[rgba(46,124,246,1)]",
    },
    {
      status: "הזמנה בטיפול",
      style: "bg-[rgba(250,163,7,0.23)] text-[rgba(232,93,4,1)]",
    },
    {
      status: "הזמנה אושרה",
      style: "bg-[rgba(223,245,225,1)] text-[rgba(63,117,48,1)]",
    },
    {
      status: "הזמנה הסתיימה",
      style: "bg-[rgba(172,162,246,0.19)] text-[rgba(113,97,239,1)]",
    },
    {
      status: 'נדחה ע"י גורם טכני',
      style: "bg-[rgba(250,234,234,1)] text-[rgba(211,61,61,1)]",
    },
    {
      status: 'בוטל ע"י" משתמש',
      style: "bg-[rgba(199,199,199,0.24)] text-[rgba(145,145,145,1)]",
    },
  ];

  function getStyleByStatus(status) {
    const found = styles.find((item) => item.status === status);
    return found ? found.style : null; // Return style if found, otherwise return null
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="w-full bg-white flex rounded-md  items-center shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]"
      >
        <div className="bg-[rgba(245,245,245,1)] h-full  rounded-r-md flex items-center px-3 border-l-[0.5px] border-l-[rgba(0,0,0,0.18)]">
          <Image
            src={`/TypesIcons/${props.order.booking_type?.icon}.png`}
            width={32}
            height={32}
            alt="car"
          />
        </div>
        <div className="flex flex-col px-3 py-2 justify-between w-full h-full">
          <div>
            <h1 className="font-medium text-lg ">
              בקשה מספר {props.order.serial_number}
            </h1>
            <p className="font-light text-lg -mt-1">
              {props.order?.booking_type?.display_name}
            </p>
            {/* <div>
              {props.order?.booking_details?.map((field) => {
                return (
                  <p className="-mb-1 text-[rgba(145,145,145,1)] -mt-1">
                    {field.field_name}: <span>{field.value}</span>
                  </p>
                );
              })}
            </div> */}
            {/* <p className="-mb-1 text-[rgba(145,145,145,1)] -mt-1">
              12/12/2024,8:00-30/12/2024,18:00
            </p>
            <p className="text-[rgba(145,145,145,1)]">3 נוסעים</p> */}
          </div>
          <div className="w-full flex justify-end">
            {props.order?.status && (
              <button
                className={` px-2 rounded-lg ${getStyleByStatus(
                  props.order.status
                )}`}
              >
                {props.order?.status}
              </button>
            )}
          </div>
        </div>
      </div>
      {isOpen && !props.disabled && (
        <FullOrder close={() => setIsOpen(false)} order={props.order} />
      )}
    </>
  );
}
