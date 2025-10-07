"use client";
import React, { useState, useEffect, useRef } from "react";

const WheelPickerComponent = ({
    hourItems,
    hourValue,
    onHourChange: handleHourChange,
    minuteItems,
    minuteValue,
    onMinuteChange: handleMinuteChange,
    containerHeight = 210,
    itemHeight = 34
}) => {
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
    function rerenderMinuteElements(selectedElement, scrollTop) {
        if (minuteRefs.current) {
            minuteRefs.current.forEach((item, index) => {
                const scrollOffset = Math.min(
                    Math.abs(scrollTop - index * itemHeight - itemHeight / 2),
                    maxScrollOffset
                );
                const sin = scrollOffset / maxScrollOffset;
                const cos = Math.sqrt(1 - sin ** 2);
                const [div] = item.getElementsByTagName("div");
                div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
                div.style.transformOrigin = "left";
            });
        }
    }

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
        let isAnimating = false;

        // Handle scroll event for minutes
        function handleMinuteScroll(event) {
            if (minuteItemsContRef.current && !isAnimating) {
                isAnimating = true;

                requestAnimationFrame(() => {
                    const scrollTop = Math.max(event.target.scrollTop, 0);
                    const selectedElement = Math.min(
                        Math.max(Math.floor(scrollTop / itemHeight), 0),
                        minuteItems.length - 1
                    );
                    window.clearTimeout(isScrolling.current);
                    rerenderMinuteElements(selectedElement, scrollTop);

                    isScrolling.current = setTimeout(function () {
                        handleMinuteChange(minuteItems[selectedElement].value);
                    }, 20);

                    isAnimating = false;
                });
            }
        }

        if (minuteItemsContRef.current) {
            minuteItemsContRef.current.addEventListener("scroll", handleMinuteScroll);
            rerenderMinuteElements(0, minuteItemsContRef.current.scrollTop);
        }

        return () => {
            if (minuteItemsContRef.current) {
                minuteItemsContRef.current.removeEventListener("scroll", handleMinuteScroll);
            }
        };
    }, [minuteItemsContRef.current]);

    useEffect(() => {
        const index = hourItems.findIndex((item) => item.value === hourValue);
        if (index !== -1 && hourRefs.current[index]) {
            hourRefs.current[index]?.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
    }, [hourValue]);

    useEffect(() => {
        const index = minuteItems?.findIndex((item) => item.value === minuteValue);
        if (index !== -1 && minuteRefs.current[index]) {
            minuteRefs.current[index]?.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
    }, [minuteValue]);

    const getTextColor = (value, isHour) => {
        if (isHour) {
            return value === hourValue ? "text-white" : "text-[rgba(0,119,182,1)]";
        }
        return value === minuteValue ? "text-white" : "text-[rgba(0,119,182,1)]";
    };

    return (
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
            <h1 className="text-[24px] flex h-1/2 items-center text-white justify-center ml-16 mr-16 mt-12">:</h1>
            <ul className="items w-full flex flex-col mr-2" ref={minuteItemsContRef}>
                {minuteItems?.map((item, index) => (
                    <li
                        className={`item text-[24px]  text-[rgba(0,119,182,1)]  ${getTextColor(item.value, false)}`}
                        key={item.value}
                        ref={(node) => (minuteRefs.current[index] = node)}
                        style={{
                            height: `${itemHeight}px`,
                            lineHeight: `${itemHeight}px`,
                        }}
                    >
                        <div>{item.label}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const WheelPicker = React.memo(WheelPickerComponent);
