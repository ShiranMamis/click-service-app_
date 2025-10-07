import { AlertTriangle, X } from "lucide-react";
import React from "react";

export default function DeletePopup(props) {
  return (
    <>
      <div className="bg-modal">
        <div className="w-[90%]  bg-white rounded-lg shadow-lg relative flex flex-col justify-between items-center p-5">
          <button onClick={props.close} className="absolute right-4 top-4">
            <X className=" text-gray-300 text-sm" />
          </button>
          <div className=" rounded-full p-3 mt-5">
            <AlertTriangle className=" flex items-center text-[#C61100] h-16 w-16" />
          </div>

          <h1 className="text-[#3B445C] font-bold text-2xl">ביטול הזמנה</h1>
          <div className="font-light text-lg text-[#888888] text-center">
            <p> האם ברצונך לבטל הזמנה זו?</p>
            <p> פעולה זו אינה הפיכה</p>
          </div>

          <button
            onClick={props.handleDelete}
            className="w-full flex py-2 rounded-md mt-3 text-white h-9 justify-center items-center bg-[#C61100]"
          >
            ביטול הזמנה
          </button>
        </div>
      </div>
    </>
  );
}
