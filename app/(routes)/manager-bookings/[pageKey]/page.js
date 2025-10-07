"use client";
import Header from "@/app/components/global/Header";
import ManagerOrder from "@/app/components/setting/ManagerOrder";
import { Calendar, EllipsisVertical, ScanLine, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import BookingsCalendar from "@/app/components/setting/BookingsCalendar";
import Filter from "@/app/components/setting/Filter";
import useFetchBookings from "@/app/hooks/useFetchBookings";
import axios from "@/app/lib/axios";

export default function page() {
  const [bookings, setBookings] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const router = useRouter();
  let pathname = usePathname();
  pathname = pathname.split("/")[2];
  console.log(pathname);

  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState({});
  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState("");
  const [bookingType, setBookingType] = useState({});
  const [dashboard, setDashboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      // .get(
      //   "bookings-approver-management/dashboard/car_booking?filter_1=string&filter_2=string&filter_3=string"
      // )
      .get(`bookings-approver-management/dashboard/car_booking`)
      .then((res) => {
        const transformed = {
          total_bookings: res.data.data.dashboard.total_bookings,
          statuses: Object.values(res.data.data.dashboard)
            .filter((item) => typeof item === "object" && item.status)
            .map((item) => ({
              id: item.status_id,
              status: item.status,
              count: item.count,
            })),
        };
        setDashboard(transformed);
        setBookingType(res.data.data.booking_type);
      });
  }, []);

  function fetchBookingsByStatus(status) {
    axios
      .get(`bookings-approver-management/get-bookings/${bookingType.id}`, {
        params: { status_id: status },
      })
      .then((res) => {
        setBookings(res.data.data);
      });
  }

  return (
    <div className="w-full h-full flex flex-col max-h-screen overflow-hidden bg-custom-ombre">
      <Header
        title={"ניהול הזמנות רכב"}
        isArrow={true}
        handleClick={
          openCalendar
            ? () => setOpenCalendar(false)
            : bookings.length
            ? () => setBookings([])
            : () => router.back()
        }
      />
      {!openCalendar && (bookings.length === 0 || value) && (
        <div className="flex gap-3 items-center p-3 px-4">
          <p className="flex-1 text-lg">
            סה"כ {dashboard.total_bookings} הזמנות
          </p>
          <Image
            onClick={() => setOpenFilter(true)}
            src={"/filter.png"}
            width={25}
            height={25}
            alt="calender"
          />
          <div onClick={() => setOpenMenu(true)} className="relative">
            <EllipsisVertical />
            {openMenu && (
              <div className="absolute z-50 bg-white left-[50%] p-2 rounded-lg whitespace-nowrap w-auto inline-block">
                <Link
                  href={`/manager-bookings/${pathname}/setting`}
                  className="pl-10 p-1"
                >
                  הגדרות הזמנות רכב
                </Link>
              </div>
            )}
          </div>
          {openMenu && (
            <div onClick={() => setOpenMenu(false)} className="bg-modal"></div>
          )}
        </div>
      )}
      {bookings.length === 0 && !openCalendar && (
        <div className="flex flex-col px-5 flex-1 pb-5">
          <div className="flex flex-col flex-1 gap-2.5 mt-2 overflow-rtl">
            {dashboard.statuses?.map((item) => {
              return (
                <div
                  onClick={() => fetchBookingsByStatus(item.id)}
                  className="flex w-full items-center rounded-lg px-6 gap-2 py-4 text-lg bg-white shadow-[0px_0px_5.33px_0px_rgba(0,0,0,0.1)]"
                >
                  <Image
                    src={`/statuses/${item.id}.png`}
                    width={32}
                    height={32}
                    alt="status-icon"
                  />
                  <p className="flex-1">{item.status} </p>
                  <p>{item.count}</p>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => router.push("/manager-bookings/qr-scanner")}
            className="flex w-full justify-center text-white items-center bg-medium-blue rounded-lg gap-2 py-3 text-lg"
          >
            <ScanLine />
            סריקת ברקוד
          </button>
        </div>
      )}
      {bookings.length > 0 && (
        <div className="overflow-rtl pb-24  mt-2 px-4">
          {isLoading ? (
            <Skeleton height={700} />
          ) : (
            bookings?.map((order) => (
              <ManagerOrder key={order.id} order={order} />
            ))
          )}
        </div>
      )}
      {openCalendar && !value && <BookingsCalendar />}
      {openFilter && (
        <Filter
          close={() => setOpenFilter(false)}
          isOpen={openFilter}
          bookingType={bookingType}
        />
      )}
    </div>
  );
}
