"use client";
import { useEffect, useState } from "react";
import axios from "../lib/axios";

const useFetchUnits = (typeId) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  function getUnits() {
    setIsLoading(true);
    axios
      .get(`/initial-screen/units/${typeId}`)
      .then((res) => {
        let array = res.data.data.map((unit) => {
          return { value: unit.id, label: unit.name };
        });
        setData(array);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getUnits();
  }, []);

  return { data, getUnits, isLoading };
};

export default useFetchUnits;
