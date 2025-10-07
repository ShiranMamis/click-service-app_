import { QrCode, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DeletePopup from "./DeletePopup";
import Circle from "./Circle";
import CancelAnimation from "./CancelAnimation";
import Header from "@/app/components/global/Header";
import { QRCodeSVG } from "qrcode.react";
import axios from "@/app/lib/axios";
import { toast } from "react-toastify";

export default function FullOrder(props) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const url = `https://localhost:8000/order/${props.order.serial_number}`;
  console.log(QRCodeSVG);

  function handleDelete() {
    axios
      .put("/bookings/change-status", {
        booking_uuid: props.order?.uuid,
        action: "cancel",
      })
      .then(() => {
        setIsDeleted(false);
        setShowAnimation(true);
      })
      .catch((err) => toast.error("התרחשה שגיאת שרת, נא לנסות מאוחר יותר"));
  }
  function handleAnimationEnd() {
    props.close();
    setShowAnimation(false);
  }

  useEffect(() => {
    if (bookingDetails.length === 0) {
      axios
        .get(`bookings/${props.order.serial_number}`)
        .then((res) => {
          setBookingDetails(res.data.data.booking_values);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <div className="fixed inset-[0] z-30 flex flex-col items-center bg-custom-ombre backdrop:blur-md ">
        <Header
          title={showQR ? "ברקוד לאיסוף הזמנה" : "מעקב אחר הזמנה"}
          isArrow={true}
          handleClick={showQR ? () => setShowQR(false) : () => props.close()}
        />
        <h1 className="mt-4 text-xl font-semibold">
          {props.order.booking_type?.display_name} מספר{" "}
          {props.order.serial_number}
        </h1>
        <p className="font-medium text-lg mt-2">פרטי הזמנה</p>
        <div className="flex relative flex-1 w-full">
          <div className="flex-1 p-2 mr-3">
            {bookingDetails?.map((field) => {
              return (
                <p className=" text-[rgba(145,145,145,1)]">
                  {field.field_display_name}: <span>{field.value}</span>
                </p>
              );
            })}
          </div>
          {!showQR && props.order.status === "הזמנה אושרה" && (
            <div
              onClick={() => setShowQR(true)}
              className="absolute -top-10 left-0 text-medium-blue bg-[rgba(5,84,126,0.05)] bg text-lg gap-2 flex items-center rounded-t-2xl px-2 py-3 transform rotate-90 origin-bottom-left"
            >
              <QrCode /> לחץ להצגת ברקוד
            </div>
          )}
        </div>
        {!showQR ? (
          <>
            <p className="font-medium text-lg mb-4">סטטוס הזמנה</p>
            <Circle
              status={props.order.status}
              icon={props.order.booking_type?.icon}
            />
          </>
        ) : (
          <div className="bg-white rounded-lg p-2 ">
            <QRCodeSVG value={url} width={200} height={200} />
          </div>
        )}

        <div className="mb-[22%] px-5 mt-10 flex items-center w-full justify-between">
          <div className="">
            תאריך ההזמנה:
            <span className="text-[#7E7E7E] mr-1">12/09/2024</span>
          </div>
          {props.order.status === "הזמנה התקבלה" ||
            (props.order.status === "הזמנה בטיפול" && (
              <button
                onClick={() => setIsDeleted(true)}
                className=" border border-[#C62D00] text-[#C62D00] text-lg items-center flex p-1 px-2 rounded-md gap-1.5"
              >
                <Trash2 />
                ביטול הזמנה
              </button>
            ))}
        </div>
        {showAnimation && (
          <CancelAnimation onAnimationEnd={handleAnimationEnd} />
        )}
        {isDeleted && (
          <DeletePopup
            close={() => setIsDeleted(false)}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}
