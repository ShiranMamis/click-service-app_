"use client";
import { useEffect, useState } from "react";
import axios from "../lib/axios";

const useFetchBookingTypes = ({ middleware }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url =
    middleware === "manager" ? "management-booking-types" : "booking-types";
  function getBooking() {
    setIsLoading(true);
    axios
      .get(`/initial-screen/${url}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getBooking();
  }, []);

  return { data, getBooking, isLoading };
};

export default useFetchBookingTypes;
