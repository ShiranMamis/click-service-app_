import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from 'lucide-react';

export default function Statement(props) {
  const calendarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

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

  return (
    <>
      {isOpen && (
        <label>
          <div className="bg-modal">
            <div
              ref={calendarRef}
              className={`w-5/6 h-2/5 bg-white rounded-2xl shadow-lg`}
            >
              <div className='items-center mb-4 mt-3'>
                <p className='font-bold text-[20px] items-center flex justify-center'>הצהרה</p>
                <p className='text-[#868686] flex justify-center'>אנא קרא היטב את ההצהרה ואשר שקראת</p>
              </div>
              <div className="rtl relative overflow-auto  w-full h-full flex flex-col">
                <div className="h-4/6 p-5">
                  {props.statement}
                </div>
                <div className="flex gap-3 h-1/6 items-center p-4 justify-end rounded-2xl bg-[#F4F4F4]">
                  <button
                    onClick={handleConfirmClick}
                    className={`w-full h-[4vh] text-[rgba(255,255,255,1)] bg-medium-blue rounded-xl items-center p-2 justify-center shadow-sm flex`}
                  >
                    אישור
                  </button>
                </div>
              </div>
            </div>
          </div>
        </label>
      )}
    </>
  );
}
