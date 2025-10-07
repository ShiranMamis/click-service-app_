"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";

export default function Menu() {
  const pathname = usePathname();
  const { user } = useAuth({ middleware: "guest" });
  console.log(user);

  return (
    <div className="w-full text-center items-center z-30 sticky  bottom-0 flex bg-[rgba(255,255,255,1)] shadow-[0px_-1px_10.7px_0px_rgba(0,0,0,0.05)] py-3">
      <Link
        href={"/new-request"}
        className={`flex flex-col items-center ${
          pathname === "/new-request"
            ? "text-medium-blue"
            : "text-[rgba(0,0,0,0.22)]"
        } flex-1`}
      >
        {pathname === "/new-request" ? (
          <Image
            src={"/Vector (1).png"}
            width={35}
            height={35}
            alt="new request"
          />
        ) : (
          <Image
            src={"/Frame (1).png"}
            width={35}
            height={35}
            alt="new request"
          />
        )}
        <p>פתיחת קריאה </p>
      </Link>
      <Link
        href={"/history"}
        className={`flex flex-col items-center ${
          pathname === "/history"
            ? "text-medium-blue"
            : "text-[rgba(0,0,0,0.22)]"
        } flex-1`}
      >
        {pathname === "/history" ? (
          <Image src={"/Vector (2).png"} width={35} height={35} alt="history" />
        ) : (
          <Image src={"/Frame (2).png"} width={35} height={35} alt="history" />
        )}
        <p>היסטוריית בקשות</p>
      </Link>
      {(user?.roles[0]?.name === "approver" ||
        user?.roles[0]?.name === "admin" ||
        user?.roles[0]?.name === "vice_approver") && (
        <Link
          href={"/manager-bookings"}
          className={`flex flex-col items-center ${
            pathname === "/manager-bookings"
              ? "text-medium-blue"
              : "text-[rgba(0,0,0,0.22)]"
          }  flex-1`}
        >
          {pathname === "/manager-bookings" ? (
            <Image
              src={"/manager-bookings.png"}
              width={35}
              height={35}
              alt="setting"
            />
          ) : (
            <Image
              src={"/manager-booking-gray.png"}
              width={35}
              height={35}
              alt="setting"
            />
          )}
          <p> ניהול הזמנות </p>
        </Link>
      )}
      {user?.roles[0]?.name === "super_admin" && (
        <Link
          href={"/setting"}
          className={`flex flex-col items-center ${
            pathname === "/setting"
              ? "text-medium-blue"
              : "text-[rgba(0,0,0,0.22)]"
          }  flex-1`}
        >
          {pathname === "/setting" ? (
            <Image
              src={"/Vector (3).png"}
              width={35}
              height={35}
              alt="setting"
            />
          ) : (
            <Image
              src={"/Frame (3).png"}
              width={35}
              height={35}
              alt="setting"
            />
          )}
          <p> הגדרות </p>
        </Link>
      )}
    </div>
  );
}
