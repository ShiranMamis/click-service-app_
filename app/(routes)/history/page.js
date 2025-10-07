"use client";
import Header from "@/app/components/global/Header";
import Filters from "@/app/components/history/Filters";
import Request from "@/app/components/history/Request";
import useFetchBookings from "@/app/hooks/useFetchBookings";
import axios from "@/app/lib/axios";
import qs from "qs";

import { Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NotFoundSearch from "@/app/components/global/NotFoundSearch";

export default function page() {
  const [isFilter, setIsFilter] = useState(false);
  const [filters, setFilters] = useState({
    status_id: [],
    booking_type_id: [],
    serial_number: "",
  });
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const debounceDelay = 500; // Delay in milliseconds
  let searchTimeout;

  function getBooking() {
    setIsLoading(true);

    axios
      .get("/bookings/my-bookings", {
        params: { ...filters },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      })
      .then((res) => {
        let arr = Object.entries(res.data.data).map(([key, object]) => ({
          id: key,
          ...object,
        }));
        setData(arr);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (
      data.length === 0 ||
      filters.status_id.length > 0 ||
      filters.booking_type_id.length > 0
    )
      getBooking();
  }, []);

  useEffect(() => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      getBooking();
    }, debounceDelay);

    // Cleanup function to clear the timeout
    return () => clearTimeout(searchTimeout);
  }, [filters.serial_number]);

  useEffect(() => {
    function groupOrdersByDate(data) {
      const grouped = { "בשבוע האחרון": [] };
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);

      data.forEach((order) => {
        // Split the date in DD/MM/YYYY format and create a Date object
        const [day, month, year] = order.created_at.split("/").map(Number);
        const orderDate = new Date(year, month - 1, day);

        const dateKey = orderDate
          .toLocaleDateString("en-GB") // Maintain the DD/MM/YYYY format
          .replace(/\./g, "/");

        if (orderDate >= oneWeekAgo && orderDate < today) {
          grouped["בשבוע האחרון"].push(order);
        } else {
          if (!grouped[dateKey]) {
            grouped[dateKey] = [];
          }
          grouped[dateKey].push(order);
        }
      });

      return grouped;
    }
    setGroupedOrders(groupOrdersByDate(data));
  }, [data]);

  console.log(filters);

  return (
    <div className="flex flex-col h-screen">
      <Header title="היסטוריית בקשות" />
      <>
        <div className="w-full flex justify-center items-center px-5 py-3 gap-4">
          <div className="flex-1 text-lg px-2 flex items-center bg-[rgba(255,255,255,1)] rounded-lg shadow-[0px_0px_4.7px_0px_rgba(0,0,0,0.1)]">
            <input
              type="search"
              value={filters.serial_number}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  serial_number: e.target.value,
                }));
                getBooking();
              }}
              placeholder="חיפוש לפי מספר בקשה"
              className="p-2 flex-1 focus:outline-none bg-transparent"
            />
            <Search className="ml-2 text-gray-600" />
          </div>
          <div className="relative " onClick={() => setIsFilter(true)}>
            <Image src={"/filter.png"} width={30} height={30} alt="filter" />
            {filters.status_id.length + filters.booking_type_id.length > 0 && (
              <div className="absolute -top-3 -right-3 bg-medium-blue text-center text-sm w-[22px] border-2 border-[rgb(250,250,250)] text-white rounded-[50%]">
                {filters.status_id.length + filters.booking_type_id.length}
              </div>
            )}
          </div>
          {isFilter && (
            <Filters
              getBooking={getBooking}
              close={() => setIsFilter(false)}
              filters={filters}
              clear={(property) => {
                setFilters((prevFilters) => {
                  if (
                    prevFilters[property] &&
                    Array.isArray(prevFilters[property])
                  ) {
                    return {
                      ...prevFilters,
                      [property]: [],
                    };
                  }
                });
              }}
              setFilters={(property, value) => {
                setFilters((prevFilters) => {
                  if (
                    prevFilters[property] &&
                    Array.isArray(prevFilters[property])
                  ) {
                    return {
                      ...prevFilters,
                      [property]: [...prevFilters[property], value],
                    };
                  }
                });
              }}
            />
          )}
        </div>
        {data.length === 0 && !isLoading && <NotFoundSearch />}
        <div className="w-full flex flex-col items-center px-5 gap-4 h-[76vh]  pb-2 overflow-rtl">
          {Object.entries(groupedOrders)?.map(([date, orders]) => {
            return (
              <div key={date} className="w-full flex flex-col gap-2">
                {orders.length > 0 && (
                  <h1 className="text-[rgba(0,0,0,0.5)]">{date}</h1>
                )}
                {orders?.map((order) => (
                  <Request key={order.id} order={order} />
                ))}
              </div>
            );
          })}
        </div>
      </>
    </div>
  );
}
