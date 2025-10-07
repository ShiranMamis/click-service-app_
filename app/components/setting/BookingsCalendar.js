import React, { useEffect, useState } from "react";
import HebrewCalendar from "../global/HebrewCalendar";

export default function BookingsCalendar(props) {
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const [date, setDate] = useState(getTodayDate());
  const [data, setData] = useState([]);
  // const { data, getCars, isLoading } = useFetchCarBookings();
  const [groupedItems, setGroupedItems] = useState(false);
  const statusTitles = {
    1: "הזמנות התקבלו וממתינות לאישור",
    2: "הזמנות בטיפול",
    3: "הזמנות מאושרות",
    4: "הזמנות שבוטלו",
  };

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const grouped = data.reduce((acc, item) => {
      const statusTitle = statusTitles[item.status_booking];
      if (!statusTitle) return acc; // Skip items with unknown statuses.

      if (!acc[statusTitle]) {
        acc[statusTitle] = [];
      }
      acc[statusTitle].push(item);
      return acc;
    }, {});

    setGroupedItems(grouped);
  }, [data]);
  return (
    <div className="flex flex-col h-full items-center relative pt-3">
      <div>
        <HebrewCalendar date={date} setData={(date) => setDate(date)} />
      </div>
      <div className=" bottom-0 absolute max-h-[45vh] flex flex-col p-5 items-center w-full bg-white mt-4 rounded-t-[25px] shadow-[0px_-6px_16.3px_0px_rgba(0,0,0,0.05)]">
        <p className="text-end w-full text-gray-500">{formatDate(date)}</p>
        <div className="overflow-rtl w-full px-3">
          {Object.entries(groupedItems).map(([title, group], index) => (
            <div key={index}>
              <h2 className="text-lg font-medium text-center m-3">{title}</h2>
              <ul className=" flex flex-col gap-1.5">
                {group.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setValue(item.order_number)}
                  >
                    <Request disabled={true} order={item} />
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
