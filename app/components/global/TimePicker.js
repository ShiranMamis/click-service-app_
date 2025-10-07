import React, { useState, useRef, useEffect } from 'react';
import { WheelPicker } from './WheelPickerComponent';



const hourItems = Array.from({ length: 24 }, (_, index) => ({
  value: (index - 1) + 1,
  label: (index - 1) + 1
}));

const minuteItems = Array.from({ length: 60 }, (_, index) => ({
  value: `${((index - 1) + 1).toString().padStart(2, "00")}`,
  label: `${((index - 1) + 1).toString().padStart(2, "00")}`
}));


export default function TimePicker(props) {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  const [hour, setHour] = useState(hourItems[0].value);
  const [minute, setMinute] = useState(hourItems[0].value);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const handleTimeSelected = () => {
    // Pass selected time back to the parent component
    if (props.onTimeSelected) {
      props.onTimeSelected(`${hour}:${minute}`);
    }
    console.log(props.type)
    setIsOpen(false); // Close the TimePicker immediately
    console.log(`${hour}:${minute}`);
  };

  return (
    <>
      <label>
        <div
          onClick={() => setIsOpen(true)}  // This triggers the open of the picker
          className={`w-full py-3 items-center bg-[rgb(247,247,247)] rounded-xl p-4 justify-between flex gap-3`}
        >
          <p className="text-[rgba(0,0,0,0.32)] font-medium text-[15px]">
            {props.title}
          </p>
          <div onClick={() => setIsOpen(true)} className="flex flex-1 items-center">
            {props.selectedTime || '--:--'}
          </div>
        </div>
        {isOpen && (
          <div className='bg-modal'>
            <div ref={calendarRef}
              className="w-full absolute rounded-tl-3xl bottom-0 rounded-tr-3xl p-5 bg-white rounded-lg shadow">
              <div className="text-left mb-6">
                <button
                  className="text-[rgba(180,26,5,1)] text-sm mb-2"
                >
                  סיום
                </button>
                <h2 className="text-xl font-semibold mb-6 text-[26px] text-center">
                  {props.type}
                </h2>
              </div>
              <div className="relative py-20 px-5 mb-6">
                <div className="absolute inset-0 pointer-events-none mr-5 ml-5">
                  <div className="absolute top-1/2 -translate-y-1/2 w-full rounded-xl h-12 bg-[rgba(0,119,182,1)]" />
                </div>
                <div dir="ltr" className="flex justify-between px-10 gap-2 h-48 text-2xl">
                  <div className=" w-full items-center flex justify-center" >
                    <WheelPicker
                      hourItems={hourItems}
                      hourValue={hour}
                      onHourChange={setHour}
                      minuteItems={minuteItems}
                      minuteValue={minute}
                      onMinuteChange={setMinute}
                    />
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-[rgba(0,119,182,1)] text-white py-3 rounded-xl"
                onClick={handleTimeSelected}  // Call the function to set time and close the modal
              >
                שמור
              </button>
              <style jsx global>
                {`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }`}
              </style>
            </div>
          </div>
        )}
      </label>
    </>
  );
}
