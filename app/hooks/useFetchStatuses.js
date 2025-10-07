"use client";
import { useEffect, useState } from "react";
import axios from "../lib/axios";

const useFetchStatuses = (typeId) => {
  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  function getStatuses() {
    setIsLoading(true);
    axios
      .get(`/initial-screen/statuses`)
      .then((res) => {
        setStatuses(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getStatuses();
  }, []);

  return { statuses, getStatuses, isLoading };
};

export default useFetchStatuses;
