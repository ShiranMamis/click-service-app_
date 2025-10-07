"use client";
import React, { useState } from "react";
import InputBoxComp from "../global/InputBoxComp";
import InputCalendar from "../global/InputCalendar";
import TimePicker from "../global/TimePicker";
import SelectBarComp from "../global/SelectBarComp";
import { SelectBarItems } from "../global/SelectBarItemsComp";
import DriveDescribe from "./DriveDescribe";

export default function InputBoxFileComp(props) {
  const [startTimeSelected, setStartTimeSelected] = useState(""); // State for start time
  const [endTimeSelected, setEndTimeSelected] = useState(""); // State for end time
  const [itemSelected, setItemSelected] = useState(""); // State for end time
  const [isStatement, setIsStatement] = useState(false);
  // Function to handle selected time and update the respective state
  const handleTimeSelected = (time, type) => {
    if (type === "start") {
      setStartTimeSelected(time); // Update start time
    } else if (type === "end") {
      setEndTimeSelected(time); // Update end time
    }
  };

  const handelStatementClick = () => {
    setIsStatement(true);
  };

  console.log(props.items);

  return (
    <div className="p-2">
      <div className="flex flex-col space-y-5">
        <InputCalendar
          title={"תאריך התחלה"}
          date={"11.2.24"}
        // setData={(date) =>
        //   setBooking((prev) => ({ ...prev, start_date: date }))
        // }
        />
        <TimePicker
          title={"שעת התחלה"}
          type={"start"}
          selectedTime={startTimeSelected}
          onTimeSelected={(time) => handleTimeSelected(time, "start")}
        // onTimeSelected={() => handleTimePickerClose("start")}
        />
        <InputCalendar
          title={"תאריך סיום"}
          date={"11.2.24"}
          setData={(date) =>
            setBooking((prev) => ({ ...prev, end_date: date }))
          }
        />
        <TimePicker
          title={"שעת סיום"}
          type={"end"}
          selectedTime={endTimeSelected}
          onTimeSelected={(time) => handleTimeSelected(time, "end")}
        // onTimeSelected={() => handleTimePickerClose(timePickerType)} // On selecting start time, show end time picker
        />
        <DriveDescribe
          isStatement={false}
          //isOptions={props.isOptions}
          //selectedOption={() => props.selectedOption()}
          onClose={() => props.onClose()}
          onSelect={props.onSelect}
        />
        <SelectBarItems
          text={"בחר מספר נוסעים"}
          title={"מספר נוסעים"}
          items={props.items}
          selectedItem={props.selectedItem}
          onItemSelected={props.onSelect}
          itemsValue={props.selectedValue}
          onItemsChange={props.onItemsChange}
        />
        {isStatement && (
          <DriveDescribe
            isStatement={isStatement}
            onClose={() => setIsStatement(false)} // סוגר את ההצהרה
          />
        )}
      </div>
      <button
        className="w-full h-[5vh] items-center mt-5 bg-medium-blue rounded-xl p-2 justify-center shadow-sm flex text-[rgba(255,255,255,1)]"
        onClick={handelStatementClick}
      >
        אישור
      </button>
    </div>
  );
}
