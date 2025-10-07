"use client";
import React, { useState } from "react";
import PermissionManager from "./PermissionManager";
import { toast } from "react-toastify";
import InputBoxComp from "../global/InputBoxComp";

export default function AddUser(props) {
  const [user, setUser] = useState({
    name: "",
    personal_id: "",
    unit: "",
    permissions: [],
  });
  const [openPermission, setOpenPermission] = useState(false);
  function handleSubmit() {
    //send axios request to create new user
    if (user.permissions.length === 0) toast.error("חובה לתת למשתמש הרשאות");
    props.close();
    toast.success("משתמש נוצר בהצלחה");
  }

  function handleClick() {
    if (!user.personal_id) toast.error("חובה להזין תעודת זהות כדי ליצור משתמש");
    else if (user.personal_id.length !== 9)
      toast.error("תעודת זהות שהוזנה אינה תקינה");
    else if (!user.unit) toast.error("חובה לבחור יחידה");
    else setOpenPermission(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "personal_id" && !/^\d*$/.test(value)) return;

    setUser((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      {openPermission ? (
        <PermissionManager
          user={user}
          setPermissions={(permissions) =>
            setUser((prev) => ({ ...prev, permissions: permissions }))
          }
          handleSubmit={handleSubmit}
        />
      ) : (
        <div className="bg-white mt-3 w-[90%] rounded-md p-5 flex flex-col gap-2 drop-shadow m-2">
          <h1 className="font-semibold text-xl mb-1">פרטי משתמש</h1>
          <InputBoxComp
            title="תעודת זהות"
            placeholder="אנא הקלד תז"
            value={user.personal_id}
            name={"personal_id"}
            maxLength={9}
            handleChange={(e) => handleChange(e)}
          />
          <div className="bg-[rgba(0,0,0,0.03)]  flex rounded-md w-full p-3 gap-2">
            <p className="text-[rgba(0,0,0,0.32)] font-medium"> יחידה </p>
            <p>ח"טל</p>
          </div>
          <InputBoxComp
            disabled={true}
            defaultValue={user.name}
            title={"שם מלא"}
            placeholder="שדה שמתמלא אוטומטית לפי תז"
          />
          <button
            onClick={handleClick}
            className="bg-[#0077B6] w-full rounded-lg p-2 text-white mt-1"
          >
            המשך למתן הרשאות
          </button>
        </div>
      )}
    </>
  );
}
