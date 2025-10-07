// import useFetchCarBookings from "@/app/hooks/useFethCarBookings";
import { AlertTriangle, X } from "lucide-react";
import React, { useState } from "react";
import Request from "../history/Request";

export default function CountWarning(props) {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);
  // const { data, getCars } = useFetchCarBookings();

  function fetchBookings() {
    //send axios request to fetch all the bookings in the current dates
    setBookings(data);
  }
  function handleSubmit() { }
  console.log(bookings);

  return (
    <div className="bg-modal">
      <div className="w-[90%]  bg-white rounded-lg shadow-lg relative flex flex-col justify-between items-center p-5">
        <button onClick={props.close} className="absolute right-4 top-4">
          <X className=" text-gray-300 text-sm" />
        </button>
        {openMessage ? (
          <div className="text-center">
            <h1 className="text-2xl font-semibold">אישור החלפת הזמנות</h1>
            <p className="text-gray-600 m-3">
              שים לב! בלחיצה על אישור, הזמנה מס' {booking.order_number} תבוטל
              ובמקומה תאושר הזמנה מס' {props.booking.order_number}.
            </p>
            <p className="text-gray-600">האם ברצונך להמשיך עם החלפת ההזמנות?</p>
            <button
              onClick={handleSubmit}
              className="bg-medium-blue w-full text-white p-2 mb-2 mt-4 rounded-lg"
            >
              אישור פעולה
            </button>
            <button
              onClick={props.close}
              className="bg-[rgba(238,238,238,1)] rounded-lg text-gray-600 w-full p-2 "
            >
              בטל
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <>
            <div className=" rounded-full p-3 mt-5">
              <AlertTriangle className=" flex items-center text-[#C61100] h-16 w-16" />
            </div>

            <h1 className="text-[#3B445C] font-bold text-2xl">
              חריגה במספר הרכבים
            </h1>
            <div className="font-light text-lg text-[#888888] text-center">
              <p> שים לב! כי חרגת מסה"כ הרכבים הזמינים.</p>
            </div>
            <div className="flex flex-col w-full gap-1 mt-4">
              <button
                onClick={fetchBookings}
                className="w-full flex py-2 rounded-md  text-white h-9 justify-center items-center bg-medium-blue"
              >
                אשר והחלף עם הזמנה אחרת
              </button>
              <button className="w-full flex py-2 rounded-md text-medium-blue h-9 justify-center items-center bg-[rgba(0,119,182,0.15)]">
                אישור רכב מחוץ למערכת
              </button>
              <button
                onClick={props.cancel}
                className="w-full flex py-2 rounded-md text-white h-9 justify-center items-center bg-[#C61100]"
              >
                ביטול הזמנה
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-[20px] font-semibold"> אישור בקשה מספר 1234</h1>
            <p className="text-gray-500 text-center">
              הזמנת הרכב של
              <span className="text-medium-blue">
                {" "}
                {props.booking?.booked_by?.name}
              </span>
              <ul className="max-h-[60vh] overflow-rtl w-full p-2">
                {bookings?.map((order) => {
                  return (
                    <div
                      onClick={() => setBooking(order)}
                      key={order.id}
                      className={`${booking?.id === order.id &&
                        "border-2 border-medium-blue"
                        } rounded-md mb-2 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]`}
                    >
                      <Request disabled={true} order={order} />
                    </div>
                  );
                })}
              </ul>
              <button
                onClick={booking && (() => setOpenMessage(true))}
                className={`bg-medium-blue rounded-lg w-full p-2 text-white mt-3 ${!booking && "opacity-30"
                  }`}
              >
                אשר והחלף
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
