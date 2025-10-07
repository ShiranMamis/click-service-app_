import axios from "@/app/lib/axios";
import { Axis3DIcon, CircleCheck, SquarePen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ChooseOption({ value }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [localData, setLocalData] = useState([]);
  const [data, setData] = useState([]);
  const [changes, setChanges] = useState({
    added: [],
    edited: [],
    deleted: [],
  });

  useEffect(() => {
    if (!data.length) {
      axios
        .get(`bookings-super-admin-management/${value.type}/${value.id}`)
        .then((res) => {
          setData(res.data.data[0].field_options);
          setLocalData(res.data.data[0].field_options);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function handleAdd() {
    const newItem = {
      id: localData.length + 1,
      field_option: newOption,
    };
    setLocalData([...localData, newItem]);
    setChanges((prev) => ({
      ...prev,
      added: [...prev.added, newItem],
    }));
    setIsAdd(false);
    setNewOption("");
  }
  function handleDelete(id) {
    setLocalData(localData.filter((item) => item.id !== id));
    setChanges((prev) => ({
      ...prev,
      deleted: [...prev.deleted, id],
    }));
  }

  function handleSave() {
    console.log(localData);
    let field_options = localData.map((item) => {
      return { 1: item.field_option };
    });
    console.log(field_options);

    axios
      .put(`bookings-super-admin-management/update-select-option/${value.id}`, {
        field_options,
      })
      .then(() => {
        toast.success("השינויים נשמרו בהצלחה");
        setChanges({ added: [], edited: [], deleted: [] });
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="px-6 w-full h-[93%] flex flex-col">
      <h1 className="text-center mt-[10px] text-lg font-semibold">
        {value.value}
      </h1>
      <div className="flex-1">
        {isAdd && (
          <div className="flex w-ful gap-3 mt-[10px] items-center">
            <Trash2
              onClick={() => {
                setIsAdd(false);
                setNewOption("");
              }}
              className="text-[#C62D00]"
            />
            <div className="bg-white flex-1 flex gap-2 items-center p-3 rounded-lg drop-shadow-md">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                className={`p-1 flex-1 bg-transparent border outline-none rounded-lg border-gray-500`}
              />
              <CircleCheck
                onClick={handleAdd}
                className="text-medium-blue w-6"
              />
            </div>
          </div>
        )}
        {localData?.map((option) => (
          <div className="flex w-ful gap-3 mt-[10px] items-center">
            <Trash2
              onClick={() => handleDelete(option.id)}
              className="text-[#C62D00]"
            />
            <div className="bg-white flex-1 flex gap-2 items-center p-3 rounded-lg drop-shadow-md">
              <input
                type="text"
                value={option.field_option}
                onChange={(e) => {
                  setIsEdit(e.target.value);
                  setLocalData((prevData) =>
                    prevData.map((item) =>
                      item.id === option.id
                        ? { ...item, field_option: e.target.value }
                        : item
                    )
                  );
                }}
                className={`p-1 flex-1 bg-transparent border outline-none rounded-lg ${
                  isEdit === option.field_option
                    ? "border-gray-400"
                    : "border-none"
                } `}
                disabled={isEdit === option.field_option ? false : true}
              />
              {isEdit === option.field_option ? (
                <CircleCheck
                  onClick={() => setIsEdit(false)}
                  className="text-medium-blue w-6"
                />
              ) : (
                <SquarePen
                  onClick={() => setIsEdit(option.field_option)}
                  className="text-medium-blue w-6"
                />
              )}
            </div>
          </div>
        ))}
        <button
          onClick={() => setIsAdd(true)}
          className={`${
            isAdd && "opacity-40"
          } bg-[#cadde7] stroke-inherit text-[#0077B6] text-lg rounded-lg w-full mt-3 py-2`}
        >
          + הוסף אפשרות חדשה
        </button>
      </div>
      <button
        onClick={handleSave}
        className=" bg-medium-blue stroke-inherit text-white text-lg rounded-lg w-full mt-3 py-2"
      >
        שמור שינויים
      </button>
    </div>
  );
}
