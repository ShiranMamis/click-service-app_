"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "@/app/components/global/Header";
import axios from "@/app/lib/axios";
import { toast } from "react-toastify";
export default function page() {
  const path = usePathname();
  const router = useRouter();
  const orderKey = path.split("/")[2];
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`/bookings/${orderKey}`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  function changeStatus(action) {
    axios
      .put("/bookings/change-status", {
        booking_uuid: data.uuid,
        action: action,
      })
      .then((res) => {
        toast.success("הזמנה הושלמה בצלחה");
        router.push("/manager-bookings");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg-custom-ombre bg-screen">
      <Header title={"איסוף הזמנה"} isArrow={true} handleClick={router.back} />
      <div className="flex flex-col items-center p-5 gap-1">
        <h1 className="text-xl font-medium mb-3">
          הזמנת רכב לקצינים-הזמנה מס {orderKey}
        </h1>
        <h2 className="text-lg font-medium">פרטי הלקוח</h2>
        <p className="w-full text-right text-lg">
          שם מלא:{" "}
          <span className="text-gray-500">{data.booking_owner?.full_name}</span>
        </p>
        <p className="w-full text-right text-lg">
          תעודת זהות:{" "}
          <span className="text-gray-500">
            {data.booking_owner?.personal_id}
          </span>
        </p>
        <p className="w-full text-right text-lg">
          מספר טלפון:{" "}
          <span className="text-gray-500">{data.booking_owner?.phone}</span>
        </p>
        <h2 className="text-lg font-medium mt-3">פרטי הזמנה</h2>
        {data.booking_values?.map((value) => {
          return (
            <p className="w-full text-right text-lg">
              {value.field_display_name}:{" "}
              <span className="text-gray-500">{value.value}</span>
            </p>
          );
        })}
        <button
          onClick={() => changeStatus("complete")}
          className="w-[90%] mt-3 bg-medium-blue text-white text-xl rounded-lg py-3"
        >
          אישור אסיפת הזמנה
        </button>
        <button
          onClick={() => changeStatus("reject")}
          className="w-[90%] bg-transparent border-[1.5px] text-xl text-[rgba(217,18,18,1)] border-[rgba(217,18,18,1)] rounded-lg py-3"
        >
          ביטול וסגירת הבקשה
        </button>
        <p className="w-full text-right text-lg mt-3">
          תאריך אישור: <span className="text-gray-500">13/09/2024</span>
        </p>
        <p className="w-full text-right text-lg">
          תאריך הזמנה: <span className="text-gray-500">{data.created_at}</span>
        </p>
      </div>
    </div>
  );
}
