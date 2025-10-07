import useFetchBookingTypes from "@/app/hooks/UseFetchBookingTypes";
import useFetchStatuses from "@/app/hooks/useFetchStatuses";
import { RefreshCcw } from "lucide-react";
import React from "react";

export default function Filters(props) {
  const { statuses } = useFetchStatuses();
  const { data } = useFetchBookingTypes({ middleware: "user" });

  function isInArray(value, array) {
    console.log(value, array);

    return array.includes(value);
  }
  return (
    <div className="bg-modal">
      <div className="w-[90%] bg-white rounded-md p-5 flex flex-col items-center max-h-[90%]">
        <h1 className="font-bold text-2xl">פילטרים</h1>
        <p className="text-gray-300 text-lg">אנא בחר פילטרים ולחץ על החל</p>
        <div className="w-full flex justify-between mt-3 items-center">
          <h1 className="font-semibold text-xl">סטטוס הבקשה</h1>
          <button
            onClick={() => props.clear("status_id")}
            className="flex items-center gap-[2px] text-[16px] text-medium-blue"
          >
            <RefreshCcw className="h-[18px]" />
            <p>ניקוי סינון</p>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full mt-2">
          {statuses.map((option) => {
            return (
              <button
                key={option.id}
                onClick={() => props.setFilters("status_id", option.id)}
                className={`w-full py-4 rounded-md ${
                  isInArray(option.id, props.filters.status_id)
                    ? "text-white bg-medium-blue"
                    : "bg-[rgba(240,247,251,1)]"
                }`}
              >
                {option.display_name}
              </button>
            );
          })}
        </div>
        <div className="w-full flex justify-between mt-3 items-center">
          <h1 className="font-semibold text-xl">תחום הבקשה</h1>
          <button
            onClick={() => props.clear("booking_type_id")}
            className="flex items-center gap-[2px] text-[16px] text-medium-blue"
          >
            <RefreshCcw className="h-[18px]" />
            <p>ניקוי סינון</p>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full mt-2 overflow-auto">
          {data.map((option) => {
            return (
              <button
                key={option.display_name}
                onClick={() => props.setFilters("booking_type_id", option.id)}
                className={`w-full py-4 rounded-md ${
                  isInArray(option.id, props.filters.booking_type_id)
                    ? "text-white bg-medium-blue"
                    : "bg-[rgba(240,247,251,1)]"
                }`}
              >
                {option.display_name}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            props.close();
            props.getBooking();
          }}
          className="bg-medium-blue w-full text-white mt-3 p-2 rounded-md"
        >
          החל
        </button>
      </div>
    </div>
  );
}
