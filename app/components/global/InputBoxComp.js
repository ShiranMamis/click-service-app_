import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import TimePicker from "./TimePicker"; // Assuming TimePicker is in the same directory

export default function InputBoxComp(props) {
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const handleInputClick = () => {
    // Show time picker if type is "start" or "end"
    if (props.type === "timeStart" || props.type === "timeEnd") {
      setIsTimePickerVisible(!isTimePickerVisible);
    }
  };

  // const handleTimeSelected = () => {
  //   setIsTimePickerVisible(false); // Hide the time picker after selection
  // };

  return (
    <div
      className={`w-full py-3 items-center ${
        props.disabled ? "bg-[rgb(0,0,0,0.11)]" : "bg-[rgba(0,0,0,0.03)]"
      } rounded-xl p-4 justify-between flex`}
      onClick={handleInputClick} // Clicking anywhere on the InputBoxComp
    >
      <p className="text-[rgba(0,0,0,0.32)] font-medium text-[15px]">
        {props.title}
      </p>

      {/* Conditionally render TimePicker */}
      {/* {props.type === "timeStart" && isTimePickerVisible && (
        <div className="bg-[rgb(247,247,247)]">
          <TimePicker type={"start"} onTimeSelected={handleTimeSelected} />
        </div>
      )}
      {props.type === "timeEnd" && isTimePickerVisible && (
        <div className="bg-[rgb(247,247,247)]">
          <TimePicker type={"end"} onTimeSelected={handleTimeSelected} />
        </div>
      )} */}

      {/* Handling other input types */}
      {props.type === "describe" ? (
        <div className="flex items-center">
          <div className="flex justify-start items-center">
            <input
              onClick={props.openPopup}
              className="bg-transparent w-full outline-none"
              value={props.selectedOption || "לחץ לבחירה"}
              disabled={props.disabled}
            />
          </div>
          <ChevronDown
            onClick={props.openPopup}
            className="ml-2"
            height={16}
            width={20}
          />
        </div>
      ) : (
        <div className="flex flex-1 px-3 items-center">
          <input
            type={props.type || "text"}
            value={props.value}
            name={props.name}
            onChange={props.handleChange}
            placeholder={props.placeholder}
            pattern={props.pattern}
            maxLength={props.maxLength}
            minLength={props.minLength}
            min={0}
            required={props.required}
            className={`outline-none placeholder:text-black ${
              props.disabled ? "text-[rgba(0,0,0,0.54)]" : "text-black"
            } bg-transparent w-full`}
            disabled={props.disabled}
            defaultValue={props.defaultValue}
          />
        </div>
      )}
    </div>
  );
}
