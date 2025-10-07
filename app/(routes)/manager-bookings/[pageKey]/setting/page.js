"use client";
import Header from "@/app/components/global/Header";
import InputBoxComp from "@/app/components/global/InputBoxComp";
import axios from "@/app/lib/axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function page() {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState(0);
  const [edit, setEdit] = useState({});
  function getSystemRefences() {
    axios
      .get("/bookings-approver-management/system-references/2")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getSystemRefences();
  }, []);

  function EditSystemReferences() {
    if (!edit) return;
    axios
      .put("/bookings-approver-management/system-references", {
        details_values: edit,
      })
      .then((res) => {
        router.back();
        toast.success("מספר רכבים עודכן בהצלחה");
      })
      .catch((err) =>
        toast.error("התרחשה שגיאת שרת, לא ניתן לעדכן את מספר הרכבים כעת")
      );
  }

  const handleChange = (e, key, id) => {
    const { value } = e.target; // Get the updated value from the input
    setEdit((prev) => ({
      ...prev,
      [id]: { [key]: value },
    }));
    setData((prevState) => {
      const updatedReferences = prevState.system_refences.map((item) => {
        if (item.id === id) {
          // Update the specific detail inside this system reference
          const updatedDetails = item.details.map((detail) => {
            if (detail.key === key) {
              return { ...detail, value: value }; // Update the value
            }
            return detail;
          });
          return { ...item, details: updatedDetails }; // Update the item
        }
        return item;
      });
      return { ...prevState, system_refences: updatedReferences }; // Update the state
    });
  };

  console.log(data);

  return (
    <div className="h-screen bg-custom-ombre flex flex-col items-center pb-24">
      <Header
        title={"הגדרות הזמנות רכב"}
        isArrow={true}
        handleClick={router.back}
      />
      <div className="w-full overflow-rtl mt-3 flex-1 flex flex-col gap-2 items-center ">
        {data?.system_refences?.map((item) => {
          console.log(item);

          return (
            <div className="w-[90%] gap-1 flex flex-col items-center bg-white p-4 rounded-xl shadow-[0px_0px_5.33px_0px_rgba(0,0,0,0.1)]">
              <h1 className="font-semibold text-lg">{item.title}</h1>
              <p className="text-[rgba(164,164,164,1)] font-normal">
                {item.description}
              </p>
              {item.details.map((detail) => {
                return (
                  <InputBoxComp
                    type={detail.type}
                    handleChange={(e) => handleChange(e, detail.key, item.id)}
                    value={detail.value}
                    title={detail.label}
                  />
                );
              })}
            </div>
          );
        })}
        {data.statement && (
          <div className="w-[90%] gap-1 flex flex-col items-center bg-white p-4 rounded-xl shadow-[0px_0px_5.33px_0px_rgba(0,0,0,0.1)]">
            <h1 className="font-semibold text-lg">הצהרה</h1>
            <p className="text-[rgba(164,164,164,1)] font-normal">
              {data.statement}
            </p>
            <p className="text-medium-blue text-center">
              על מנת לשנות את תוכן ההצהרה יש לפנות למנהל המערכת
            </p>
          </div>
        )}
      </div>
      <button
        onClick={EditSystemReferences}
        className="bg-medium-blue rounded-lg p-2 w-[90%] text-white mt-2"
      >
        שמור שינויים
      </button>
    </div>
  );
}
