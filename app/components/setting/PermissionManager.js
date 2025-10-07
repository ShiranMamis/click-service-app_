"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function PermissionManager(props) {
  let types = [
    "הזמנות רכב",
    "לוגיסטיקה",
    "תיקוני רכב",
    "מזון ביחידה",
    "מזון מחוץ לידה",
    "מספרה",
    "טרקלין",
    "הובלות",
  ];
  const [userPermissions, setUserPermissions] = useState(
    props.user.permissions
  );

  function togglePermission(type, e) {
    setUserPermissions(
      (prevPermissions) =>
        !e.target.checked
          ? prevPermissions.filter((perm) => perm.type !== type) // Remove if exists
          : [...prevPermissions, { type: type, permission: 1 }] // Add if not exists
    );
  }
  const isTypeInArray = (type) => {
    return userPermissions.some((item) => item.type === type);
  };
  const getPermissionByType = (type) => {
    const found = userPermissions.find((item) => item.type === type);
    return found ? found.permission : null;
  };

  useEffect(() => {
    props.setPermissions(userPermissions);
  }, [userPermissions]);

  return (
    <div className="bg-white w-[90%] max-h-[82vh] flex flex-col items-center rounded-lg m-2 px-7 py-5 shadow-[0px_0px_6.9px_0px_rgba(0,0,0,0.05)]">
      <h1 className="text-[20px] font-semibold w-full text-center">
        {props.user.name}
      </h1>
      <p className="text-[rgba(134,134,134,1)] w-full text-center mb-2">
        {props.user.personal_number}
      </p>
      <ul className="flex flex-col w-full items-center gap-2 flex-1 overflow-rtl">
        {types.map((option) => (
          <div className="w-full" key={option}>
            <label className="bg-[rgba(247,247,247,1)] text-lg w-full py-4 px-5 rounded-lg flex items-center gap-1.5">
              <input
                onChange={(e) => togglePermission(option, e)}
                type="checkbox"
                className="accent-medium-blue rounded-md w-5 h-5 ml-2"
              />
              <Image
                src={"/Car.png"}
                width={24}
                height={20}
                alt="permission-icon"
              />
              <p>ניהול {option}</p>
            </label>
            {isTypeInArray(option) && (
              <div className="bg-[rgba(61,61,61,0.14)] flex items-center gap-1 p-1.5 w-full -mt-2 rounded-b-md">
                <button
                  onClick={() =>
                    setUserPermissions((prevPermissions) =>
                      prevPermissions.map(
                        (item) =>
                          item.type === option
                            ? { ...item, permission: 1 } // Update the matching item
                            : item // Leave other items unchanged
                      )
                    )
                  }
                  className={`${getPermissionByType(option) === 1
                      ? "bg-medium-blue text-white"
                      : "text-gray-600"
                    }  rounded-md  flex-1 p-1.5`}
                >
                  משק תחום
                </button>
                <button
                  onClick={() =>
                    setUserPermissions((prevPermissions) =>
                      prevPermissions.map(
                        (item) =>
                          item.type === option
                            ? { ...item, permission: 2 } // Update the matching item
                            : item // Leave other items unchanged
                      )
                    )
                  }
                  className={`${getPermissionByType(option) === 2
                      ? "bg-medium-blue text-white"
                      : "text-gray-700"
                    }  rounded-md  flex-1 p-1.5`}
                >
                  מנהל תחום
                </button>
              </div>
            )}
          </div>
        ))}
      </ul>
      <button
        onClick={props.handleSubmit}
        className="bg-medium-blue w-full mt-3 p-2 text-lg rounded-lg text-white"
      >
        שמירת שינויים
      </button>
    </div>
  );
}
