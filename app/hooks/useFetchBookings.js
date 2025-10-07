"use client";
import { useEffect, useState } from "react";
import axios from "../lib/axios";

const useFetchBookings = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  function getBooking() {
    setIsLoading(true);

    axios
      .get("/bookings/my-bookings")
      .then((res) => {
        let arr = Object.entries(res.data.data).map(([key, object]) => ({
          id: key,
          ...object,
          icon: "/Car.png",
          date: "2024-10-20",
        }));
        setData(arr);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getBooking();
  }, []);

  return { data, getBooking, isLoading };
};

export default useFetchBookings;
