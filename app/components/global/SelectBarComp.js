import React, { useState, useRef, useEffect } from 'react';
import { WheelPicker } from './WheelPickerComponent';



const hourItems = Array.from({ length: 24 }, (_, index) => ({
    value: (index - 1) + 1,
    label: (index - 1) + 1
}));

const minuteItems = Array.from({ length: 60 }, (_, index) => ({
    value: `${((index - 1) + 1).toString().padStart(2, "00")}`,
    label: `${((index - 1) + 1).toString().padStart(2, "00")}`
}));

export default function SelectBarComp(props) {
    const [isOpen, setIsOpen] = useState(false);
    const calendarRef = useRef(null);
    const [item, setHour] = useState(hourItems[0].value);
    const [minute, setMinute] = useState(hourItems[0].value);

    useEffect(() => {
        if (typeof window === 'undefined') return;
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
    const handleTimeSelected = () => {
        // Pass selected time back to the parent component
        if (props.onTimeSelected) {
            props.onTimeSelected(`${hour}:${minute}`);
        }
        console.log(props.type)
        setIsOpen(false); // Close the TimePicker immediately
        console.log(`${hour}:${minute}`);
    };

    ///////////////////////////////
    const hourItemsContRef = useRef();
    const minuteItemsContRef = useRef();
    const isScrolling = useRef(false);
    const hourRefs = useRef([]);
    const minuteRefs = useRef([]);
    const visibleItemsCount = Math.floor(containerHeight / itemHeight);
    const maxScrollOffset = (containerHeight - itemHeight) / 2;

    // Handle the hour wheel scroll
    function rerenderHourElements(selectedElement, scrollTop) {
        if (hourRefs.current) {
            hourRefs.current.forEach((item, index) => {
                const scrollOffset = Math.min(
                    Math.abs(scrollTop - index * itemHeight - itemHeight / 2),
                    maxScrollOffset
                );
                const sin = scrollOffset / maxScrollOffset;
                const cos = Math.sqrt(1 - sin ** 2);
                const [div] = item.getElementsByTagName("div");
                div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
                div.style.transformOrigin = "center";
            });
        }
    }
    // Handle the minute wheel scroll

    useEffect(() => {
        let isAnimating = false;

        // Handle scroll event for hours
        function handleHourScroll(event) {
            if (hourItemsContRef.current && !isAnimating) {
                isAnimating = true;

                requestAnimationFrame(() => {
                    const scrollTop = Math.max(event.target.scrollTop, 0);
                    const selectedElement = Math.min(
                        Math.max(Math.floor(scrollTop / itemHeight), 0),
                        hourItems.length - 1
                    );
                    window.clearTimeout(isScrolling.current);
                    rerenderHourElements(selectedElement, scrollTop);

                    isScrolling.current = setTimeout(function () {
                        handleHourChange(hourItems[selectedElement].value);
                    }, 20);

                    isAnimating = false;
                });
            }
        }

        if (hourItemsContRef.current) {
            hourItemsContRef.current.addEventListener("scroll", handleHourScroll);
            rerenderHourElements(0, hourItemsContRef.current.scrollTop);
        }

        return () => {
            if (hourItemsContRef.current) {
                hourItemsContRef.current.removeEventListener("scroll", handleHourScroll);
            }
        };
    }, [hourItemsContRef.current]);


    useEffect(() => {
        const index = hourItems.findIndex((item) => item.value === hourValue);
        if (index !== -1 && hourRefs.current[index]) {
            hourRefs.current[index]?.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
    }, [hourValue]);


    const getTextColor = (value, isHour) => {
        if (isHour) {
            return value === hourValue ? "text-white" : "text-[rgba(0,119,182,1)]";
        }
        return value === minuteValue ? "text-white" : "text-[rgba(0,119,182,1)]";
    };


    return (
        <>
            <label>
                <div
                    onClick={() => setIsOpen(true)}  // This triggers the open of the picker
                    className={`w-full py-3 items-center bg-[rgb(247,247,247)] rounded-xl p-4 justify-between flex gap-3`}
                >
                    <p className="text-[rgba(0,0,0,0.32)] font-medium text-[15px]">
                        {props.title}
                    </p>
                    <div onClick={() => setIsOpen(true)} className="flex flex-1 items-center">
                        {props.selectedTime || '--:--'}
                    </div>
                </div>
                {isOpen && (
                    <div className='bg-modal'>
                        <div ref={calendarRef}
                            className="w-full absolute rounded-tl-3xl bottom-0 rounded-tr-3xl p-5 bg-white rounded-lg shadow">
                            <div className="text-left mb-6">
                                <button
                                    className="text-[rgba(180,26,5,1)] text-sm mb-2"
                                >
                                    סיום
                                </button>
                                <h2 className="text-xl font-semibold mb-6 text-[26px] text-center">
                                    {props.type}
                                </h2>
                            </div>
                            <div className="relative py-20 px-5 mb-6">
                                <div className="absolute inset-0 pointer-events-none mr-5 ml-5">
                                    <div className="absolute top-1/2 -translate-y-1/2 w-full rounded-xl h-12 bg-[rgba(0,119,182,1)]" />
                                </div>
                                <div dir="ltr" className="flex justify-between px-10 gap-2 h-48 text-2xl">
                                    <div className=" w-full items-center flex justify-center" >
                                        <div className="container w-full" style={{ height: `${containerHeight}px` }}>
                                            <ul className="items w-full mb-2 flex flex-col justify-around mr-2  " ref={hourItemsContRef}>
                                                {hourItems?.map((item, index) => (
                                                    <li
                                                        className={`item text-[24px] ${getTextColor(item.value, true)}`}
                                                        key={item.value}
                                                        ref={(node) => (hourRefs.current[index] = node)}
                                                        style={{
                                                            height: `${itemHeight}px`,
                                                            lineHeight: `${itemHeight}px`
                                                        }}
                                                    >
                                                        <div>{item.label}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="w-full bg-[rgba(0,119,182,1)] text-white py-3 rounded-xl"
                                onClick={handleTimeSelected}  // Call the function to set time and close the modal
                            >
                                שמור
                            </button>
                            <style jsx global>
                                {`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }`}
                            </style>
                        </div>
                    </div>
                )}
            </label>
        </>
    );
}
