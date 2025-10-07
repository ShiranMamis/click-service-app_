import React, { useState, useEffect, useRef } from "react";
import { format, addMonths, subMonths, addYears, subYears } from "date-fns";
import he from "date-fns/locale/he";
import { CalendarDays, CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InputCalendar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  const calendarRef = useRef(null);
  const minDate = new Date(props.min ? props.min : today);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  function handleClick(i, isPrevMonth, isNextMonth) {
    if (isPrevMonth) {
      prevMonth();
      return;
    } else if (isNextMonth) {
      nextMonth();
      return;
    }
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const day = String(i).padStart(2, "0");
    const selectedDate = new Date(`${year}-${month}-${day}`);

    if (selectedDate < minDate) {
      if (props.min) {
        toast.error("תאריך סיום חייב להיות עתידי לתאריך ההתחלה");
      } else {
        toast.error("תאריך חייב להיות עתידי");
      }
      return;
    } else {
      // setInputDate(`${year}-${month}-${day}`);
      props.setData(`${year}-${month}-${day}`);
    }
  }

  function Style(i, isOtherMonth) {
    const dateArr = props.date?.split("-");
    const day = String(i).padStart(2, "0");
    const year = String(currentMonth.getFullYear());
    const month = String(
      currentMonth.getMonth() + (isOtherMonth && i <= 7 ? 2 : 1)
    ).padStart(2, "0");

    if (
      props.date &&
      dateArr[0] === year &&
      dateArr[1] === month &&
      dateArr[2] === day &&
      !isOtherMonth
    ) {
      return "bg-medium-blue text-white";
    } else if (
      year === String(today.getFullYear()) &&
      month === String(today.getMonth() + 1).padStart(2, "0") &&
      day === String(today.getDate()).padStart(2, "0") &&
      !isOtherMonth
    ) {
      return "border border-medium-blue text-medium-blue";
    } else if (isOtherMonth) {
      return "bg-white text-[rgba(77,77,77,0.44)]";
    } else {
      return "bg-white hover:bg-medium-blue hover:text-white";
    }
  }

  const monthName = format(currentMonth, "LLLL", { locale: he });
  const year = format(currentMonth, "yyyy", { locale: he });
  const weekdays = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const previousMonthLastDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    ).getDate();
    const days = [];

    // Add days from the previous month
    for (let i = firstDayOfWeek; i > 0; i--) {
      days.push(
        <button
          type="button"
          onClick={() => handleClick(previousMonthLastDay - i + 1, true)}
          key={`prev-${i}`}
          className={`w-12 h-12 mr-1 rounded-md text-center ${Style(
            previousMonthLastDay - i + 1,
            true
          )}`}
        >
          {previousMonthLastDay - i + 1}
        </button>
      );
    }

    // Add days of the current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(
        <button
          type="button"
          onClick={() => handleClick(i, false)}
          key={i}
          className={`w-12 h-12 mr-1 rounded-md text-center ${Style(i, false)}`}
        >
          {i}
        </button>
      );
    }

    // Add days from the next month
    const totalDays = firstDayOfWeek + lastDayOfMonth.getDate();
    const remainingCells = 7 - (totalDays % 7);
    for (let i = 1; i <= remainingCells && remainingCells < 7; i++) {
      days.push(
        <button
          type="button"
          onClick={() => handleClick(i, false, true)}
          key={`next-${i}`}
          className={`w-12 h-12 mr-1 rounded-md text-center hover:bg-medium-blue
 hover:text-white ${Style(i, true)}`}
        >
          {i}
        </button>
      );
    }

    return days;
  };

  // Detect clicks outside the calendar
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
  function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <label className="">
        <div
          onClick={() => setIsOpen(true)}
          className={` w-full py-3 items-center bg-[rgb(247,247,247)] rounded-xl p-4 justify-between flex gap-3`}
        >
          <p className="text-[rgba(0,0,0,0.32)] font-medium text-[15px]">
            {props.title}
          </p>
          <div
            onClick={() => setIsOpen(true)}
            className="flex flex-1 items-center"
          >
            {props.date ? formatDate(props.date) : "--/--/----"}
          </div>
        </div>

        {isOpen && (
          <div className="bg-modal">
            <div
              ref={calendarRef}
              className="flex flex-col fixed bottom-0 shadow-md items-center bg-white p-6 pt-5 rounded-t-2xl"
            >
              <p className=" flex justify-end w-full ">
                <button className="text-[rgba(180,26,5,1)] text-sm mb-3">
                  סיום
                </button>
              </p>
              <h1 className="font-semibold text-2xl mb-2 font-Rubik">
                {" "}
                {props.title}
              </h1>
              <div className="flex items-center text-lg gap-1.5 text-medium-blue">
                <button onClick={prevMonth}>
                  <CircleArrowRight className="w-5 ml-2" />
                </button>
                <p className="font-Rubik">{monthName}</p>
                <p>{year}</p>
                <button onClick={nextMonth}>
                  <CircleArrowLeft className="w-5 mr-2" />
                </button>
              </div>
              {/* <div className="bg-white text-center flex items-center px-2 py-1 rounded-md gap-5">
                <button type="button" onClick={prevMonth}>
                  &lt;
                </button>
                <div>{monthName}</div>
                <button type="button" onClick={nextMonth}>
                  &gt;
                </button>
              </div>
              <div className="bg-white text-center flex px-2 py-1 rounded-md gap-5">
                <button type="button" onClick={prevYear}>
                  &lt;
                </button>
                <div>{year}</div>
                <button type="button" onClick={nextYear}>
                  &gt;
                </button>
              </div> */}
              <div className="py-6">
                <div className="grid grid-cols-7 gap-2">
                  {weekdays.map((day, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-md text-center text-medium-blue font-semibold"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays()}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-[rgba(0,119,182,1)] text-white py-3 rounded-xl"
              >
                שמור
              </button>
            </div>
          </div>
        )}
      </label>
    </>
  );
}

export default InputCalendar;
