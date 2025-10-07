import React, { useEffect, useRef, useState } from "react";
import InputBoxComp from "../global/InputBoxComp";
import InputCalendar from "../global/InputCalendar";
import axios from "@/app/lib/axios";
import SelectBarComp from "../global/SelectBarComp";

export default function Filter(props) {
  const [data, setData] = useState([]);
  const [viceApprover, setViceApprover] = useState([]);

  function getViceApprover() {
    axios
      .get(
        `bookings-approver-management/get-vice-approvers/${props.bookingType.id}`
      )
      .then((res) => {
        let arr = res.data.data.map((item) => {
          return { label: item.full_name, value: item.uuid };
        });
        setViceApprover(arr);
      })
      .catch((err) => console.log(err));
  }

  function getFilters() {
    axios
      .get(`initial-screen/filters/${props.bookingType.id}`)
      .then((res) => {
        let arr = res.data.data.map((filter) => {
          return filter.form_field;
        });
        setData(arr);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(value) {}
  const filterRef = useRef(null);
  useEffect(() => {
    if (data.length === 0) {
      getFilters();
    }
    if (viceApprover.length === 0) {
      getViceApprover();
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        props.close();
      }
    };

    if (props.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.isOpen]);
  function handleSubmit() {}

  console.log(data);

  return (
    <div className="bg-modal">
      <div
        ref={filterRef}
        className="flex flex-col w-full fixed bottom-0 shadow-md items-center bg-white p-6  rounded-t-2xl"
      >
        <p
          onClick={props.close}
          className="text-[rgba(180,26,5,1)] w-full text-end mb-5"
        >
          סיום
        </p>
        <h1 className="font-semibold text-2xl mb-2">סינון</h1>
        <div className="flex flex-col w-full gap-3.5">
          {data.map((field) => {
            if (field.field_type == "date") {
              return (
                <InputCalendar
                  title={field.field_display_name}
                  date={field.value}
                  setData={(date) => handleChange(date)}
                  // min={
                  //   booking.booking_details.find(
                  //     (item) => item.field_name === "תאריך התחלה"
                  //   )?.value
                  // }
                />
              );
            } else {
              return (
                <InputBoxComp
                  title={field.field_name}
                  disabled={field.disabled}
                />
              );
            }
          })}
          {/* <InputCalendar
            title={"תאריך התחלה"}
            date={data?.start_date}
            setData={(date) =>
              setData((prev) => ({ ...prev, start_date: date }))
            }
          />
          <InputCalendar
            title={"תאריך סיום"}
            date={data?.end_date}
            setData={(date) => setData((prev) => ({ ...prev, end_date: date }))}
            min={data.start_date}
          /> */}
          <SelectBarComp title={"משק מטפל"} items={viceApprover} />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-medium-blue w-full mt-3 p-2 text-white rounded-lg"
        >
          שמור
        </button>
      </div>
    </div>
  );
}
