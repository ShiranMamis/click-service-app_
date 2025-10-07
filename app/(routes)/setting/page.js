"use client";
import Header from "@/app/components/global/Header";
import useAuth from "@/app/hooks/useAuth";
import useFetchBookingTypes from "@/app/hooks/UseFetchBookingTypes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Skeleton from "react-loading-skeleton";

export default function page() {
  const { user } = useAuth({ middleware: "auth" });
  const { data, isLoading } = useFetchBookingTypes({ middleware: "user" });
  console.log(user);
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col w-full pb-24">
      <Header title="הגדרות" />
      <ul className="p-3 w-full flex flex-col gap-2 overflow-rtl">
        {!isLoading &&
          (user?.role?.name === "admin" ||
            user?.role?.name === "super_admin") && (
            <Link
              href={"/setting/permissions"}
              className="w-full text-right p-5 text-xl bg-white rounded-2xl drop-shadow flex items-center gap-5"
            >
              <Image
                src={"/permission.png"}
                width={40}
                height={35}
                alt="permission"
              />
              ניהול הרשאות
            </Link>
          )}
        {isLoading && (
          <Skeleton count={10} height={80} className="rounded-2xl" />
        )}
        {data?.map((type) => {
          return (
            <Link
              href={
                user?.role?.name === "approver" ||
                  user?.role?.name === "vice_approver"
                  ? `setting/manager/${type.name}`
                  : `setting/${type.name}`
              }
              className="w-full text-right p-5 text-xl bg-white rounded-2xl drop-shadow flex items-center gap-5"
            >
              <Image
                src={`/TypesIcons/${type.icon}.png`}
                width={40}
                height={35}
                alt="permission"
              />
              הגדרות {type.display_name}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
