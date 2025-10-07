"use client";
import React, { useState } from "react";
import InputBoxComp from "../global/InputBoxComp";
import InputCalendar from "../global/InputCalendar";
import TimePicker from "../global/TimePicker";
import CountWarning from "./CountWarning";
import axios from "@/app/lib/axios";
import { toast } from "react-toastify";
import useAuth from "@/app/hooks/useAuth";

export default function ManagerOrder(props) {
  const [booking, setBooking] = useState(props.order);
  const [openWarning, setOpenWarning] = useState(false);
  const { user } = useAuth({ middleware: "auth" });
  const [editValues, setEditValues] = useState({});

  function changeStatus(action) {
    axios
      .put("bookings/change-status", {
        ...editValues,
        booking_uuid: props.order.uuid,
        action: action,
      })
      .then((res) => toast.success("סטטוס הבקשה שונה בהצלחה"));
  }
  console.log(booking.booking_owner.phone);

  return (
    <div className="bg-white p-5 rounded-lg flex flex-col items-center mb-2 shadow-[0px_0px_6.9px_0px_rgba(0,0,0,0.05)]">
      <h1 className="text-[20px] font-semibold">
        הזמנת רכב- מספר {booking.serial_number}
      </h1>
      <p className="text-gray-500">
        {booking.booking_type.display_name} של{" "}
        {booking.booking_owner?.full_name}
        <span className="text-medium-blue"> {booking?.booked_by?.name}</span>
      </p>
      <div className="flex flex-col w-full gap-1.5 mt-3">
        <InputBoxComp
          title={"תעודת זהות"}
          disabled={true}
          defaultValue={booking?.booking_owner?.personal_id}
        />
        <InputBoxComp
          title={"מספר טלפון"}
          disabled={true}
          defaultValue={booking.booking_owner.phone}
        />
        {booking.booking_values?.map((field) => {
          if (field.field_type == "date") {
            return (
              <InputCalendar
                title={field.field_display_name}
                date={field.value}
                setData={(date) =>
                  setBooking((prevState) => ({
                    ...prevState,
                    booking_details: prevState.booking_details.map((detail) =>
                      detail.field_name === field.field_name
                        ? { ...detail, value: date }
                        : detail
                    ),
                  }))
                }
                min={
                  booking.booking_details.find(
                    (item) => item.field_name === "תאריך התחלה"
                  )?.value
                }
              />
            );
          } else {
            return (
              <InputBoxComp
                title={field.field_display_name}
                disabled={!field.editable}
                defaultValue={field.value}
              />
            );
          }
        })}
        <button
          onClick={() => changeStatus("approve")}
          className="w-full bg-[rgba(38,150,7,1)] p-2 rounded-lg text-white font-Rubik"
        >
          {user.roles[0].name === "vice_approver"
            ? "סמן בקשה כבוצעה"
            : "אישור וסגירת הבקשה"}
        </button>
        {user.roles[0].name === "approver" && (
          <button className="w-full bg-[rgba(217,18,18,1)] p-2 rounded-lg text-white">
            דחיית הבקשה
          </button>
        )}
        <button className="w-full bg-[rgba(232,93,4,1)] p-2 rounded-lg text-white">
          {user.roles[0].name === "vice_approver" ? "העבר" : "החזר"} לסטטוס
          "בקשה בטיפול"
        </button>
        <InputBoxComp
          title={"פירוט"}
          value={props.order.comment}
          disabled={user.roles[0].name === "approver"}
        />
        {user.roles[0].name === "vice_approver" ? (
          <p className="text-red-600">נא לרשום מידע בסיווג בלמס!</p>
        ) : (
          <p className="text-gray-500">
            בקשה סומנה כ"בוצעה" על ידי
            <span className="text-medium-blue"> ישראל ישראלי</span>
          </p>
        )}
      </div>
      {openWarning && (
        <CountWarning
          close={() => setOpenWarning(false)}
          cancel={cancelBooking}
          booking={booking}
        />
      )}
    </div>
  );
}
