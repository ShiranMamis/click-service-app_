"use client";
import Header from "@/app/components/global/Header";
import NotFoundSearch from "@/app/components/global/NotFoundSearch";
import AddUser from "@/app/components/setting/AddUser";
import PermissionManager from "@/app/components/setting/PermissionManager";
import User from "@/app/components/setting/User";
import axios from "@/app/lib/axios";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";

export default function page() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const debounceDelay = 500; // Delay in milliseconds
  let searchTimeout;
  const router = useRouter();

  function getUsers() {
    axios
      .get("/users", { params: { identifier } })
      .then((res) => {
        let data = res.data.map((user) => ({ ...user, permissions: [] }));
        setUsers(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (identifier) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        getUsers(identifier);
      }, debounceDelay);
    } else {
      setIsLoading(true);
      getUsers(); // Reset users when search input is empty
    }

    // Cleanup function to clear the timeout
    return () => clearTimeout(searchTimeout);
  }, [identifier]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="bg-custom-ombre w-full max-h-screen overflow-hidden flex flex-col items-center">
      <Header
        title={isAdd ? "הוספת משתמש" : "ניהול הרשאות"}
        isArrow={true}
        handleClick={
          isAdd || isEdit
            ? () => {
                setIsAdd(false);
                setIsEdit(false);
              }
            : router.back
        }
      />
      {!isAdd && !isEdit && (
        <>
          <div className="p-3 w-full flex items-center gap-3">
            <div className="flex-1 text-lg px-2 flex items-center bg-[rgba(255,255,255,1)] rounded-lg shadow-[0px_0px_4.7px_0px_rgba(0,0,0,0.1)]">
              <input
                type="search"
                value={identifier}
                placeholder="חיפוש"
                onChange={(e) => setIdentifier(e.target.value)}
                className="p-2 flex-1 focus:outline-none bg-transparent"
              />
              <Search className="ml-2 text-gray-600" />
            </div>
            <button onClick={() => setIsAdd(true)}>
              <Image
                src={"/AddUser.png"}
                width={33}
                height={33}
                alt="add user"
              />
            </button>
          </div>
          <ul className="w-full h-[76vh] flex flex-col gap-2 p-3 overflow-rtl">
            {isLoading && (
              <>
                <Skeleton count={6} height={117} />
              </>
            )}
            {users?.map((user) => {
              return (
                <User
                  key={user.personal_number}
                  user={user}
                  setIsEdit={() => setIsEdit(user)}
                />
              );
            })}
            {users?.length == 0 && !isLoading && (
              <>
                {value ? <NotFoundSearch /> : <p>לא קיימים מתשמשים במערכת</p>}
              </>
            )}
          </ul>
        </>
      )}
      {isEdit && (
        <PermissionManager
          user={isEdit}
          setPermissions={(permissions) =>
            setIsEdit((prev) => ({ ...prev, permissions }))
          }
        />
      )}
      {isAdd && <AddUser close={() => setIsAdd(false)} />}
    </div>
  );
}
