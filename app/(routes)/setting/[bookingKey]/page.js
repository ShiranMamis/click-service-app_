"use client";
import Header from "@/app/components/global/Header";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ChooseOption from "@/app/components/setting/ChooseOption";
import { EllipsisVertical } from "lucide-react";
import axios from "@/app/lib/axios";
import SelectBarComp from "@/app/components/global/SelectBarComp";
import { SelectBarItems } from "@/app/components/global/SelectBarItemsComp";
import useFetchUnits from "@/app/hooks/useFetchUnits";

export default function page() {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { data, isLoading } = useFetchUnits(1);
  useEffect(() => {
    axios
      .get("bookings-super-admin-management/index-selects/2/2")
      .then((res) => setSelectedOptions(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(selectedOptions.booking_type);

  const [openOption, setOpenOption] = useState(false);

  return (
    <div className="w-full h-full bg-custom-ombre ">
      <Header
        title={`הגדרות ${selectedOptions.booking_type?.display_name}`}
        isArrow={true}
        handleClick={
          openOption ? () => setOpenOption(false) : () => router.back()
        }
      />
      {!openOption && (
        <>
          <h1 className="text-lg font-semibold w-full text-center mt-3">
            עריכת אפשרויות בחירה
          </h1>
          <div className="p-3 px-6">
            {selectedOptions?.details?.map((select) => {
              return (
                <div
                  onClick={() => setOpenOption(select)}
                  className="bg-white flex p-5 mb-2 w-full rounded-2xl drop-shadow-md items-center text-lg justify-between"
                >
                  {select.value}
                  <EllipsisVertical />
                </div>
              );
            })}
          </div>
        </>
      )}
      {openOption && <ChooseOption value={openOption} />}
    </div>
  );
}
