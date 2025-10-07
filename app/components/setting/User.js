
import { SquarePen } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import PermissionManager from "./PermissionManager";

export default function User(props) {
  return (
    <div className="w-full p-3 px-5 rounded-lg relative flex flex-col bg-white drop-shadow-md items-start">
      {props.user.role !== "מנהל מפקדת מחנה" &&
        props.user?.role !== "מנהל מערכת" && (
          <div
            onClick={props.setIsEdit}
            className="text-[#0077B6] absolute left-3 top-3 "
          >
            <SquarePen />
          </div>
        )}
      <div className="flex mb-2 gap-2 items-center">
        <Image src={"/User.png"} width={32} height={26} alt="user" />
        <div>
          <h1 className="text-lg">{props.user.name}</h1>
          <p className="text-[#0077B6]">{props.user.personal_number}</p>
        </div>
      </div>
      {props.user.role === "מנהל מפקדת מחנה" ||
        props.user?.role === "מנהל מערכת" ? (
        <div className="flex bg-[#F3F3F3] rounded-md text-base p-1 px-2 gap-1">
          <Image src={"/admin.png"} width={20} height={20} alt="admin-icon" />
          {props.user.role}
        </div>
      ) : (
        <div className="flex bg-[#F3F3F3] rounded-md text-base p-1 px-2 gap-1">
          <Image src={"/Car.png"} width={22} height={22} alt="car-icon" />
          ניהול הזמנות רכב
        </div>
      )}
    </div>
  );
}
