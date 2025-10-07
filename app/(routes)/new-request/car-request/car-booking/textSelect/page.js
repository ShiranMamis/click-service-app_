"use client";
import { useState } from "react";
import { WheelPicker } from "@/app/components/global/WheelPickerComponent";

// Hour and Minute options
const hourItems = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: index + 1
}));

const minuteItems = Array.from({ length: 4 }, (_, index) => ({
    value: `${(index * 15).toString().padStart(2, "0")}`,
    label: `${(index * 15).toString().padStart(2, "0")}`
}));

export default function Page() {
    const [hour, setHour] = useState(hourItems[5].value);
    const [minute, setMinute] = useState(minuteItems[2].value);

    return (
        <div className="App">
            <span style={{ textAlign: "center", width: "100%" }}>
                {hour}:{minute}
            </span>
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
    );
}
