import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const SelectBarItemsComp = ({
    text,
    items,
    selectedItem,
    title,
    onItemSelected,
    itemsValue,
    onItemsChange,
    containerHeight = 210,
    itemHeight = 34,
    isChevronDown,
}) => {
    const calendarRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const itemsContRef = useRef();
    const itemsRefs = useRef([]);
    const maxScrollOffset = (containerHeight - itemHeight) / 2;
    const [selectedIndex, setSelectedIndex] = useState(null); // Track the selected index

    // Update the styles of items based on the scroll position
    function rerenderItemsElements(scrollTop) {
        if (itemsRefs.current) {
            let newSelectedIndex = null; // Variable to track the index of item under the blue line

            itemsRefs.current.forEach((item, index) => {
                const scrollOffset = Math.min(
                    Math.abs(scrollTop - index * itemHeight - itemHeight / 2),
                    maxScrollOffset
                );
                const sin = scrollOffset / maxScrollOffset;
                const cos = Math.sqrt(1 - sin ** 2);
                const [div] = item.getElementsByTagName("div");
                div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
                div.style.transformOrigin = "center";

                // Automatically select the item under the blue line
                if (scrollOffset <= maxScrollOffset) {
                    newSelectedIndex = index;
                }
            });

            // Update the selected index when an item is under the blue line
            if (newSelectedIndex !== null) {
                setSelectedIndex(newSelectedIndex);  // Update the selected index
            }
        }
    }

    // Handle scroll event
    useEffect(() => {
        let isAnimating = false;
        function handleItemsScroll(event) {
            if (itemsContRef.current && !isAnimating) {
                isAnimating = true;
                requestAnimationFrame(() => {
                    const scrollTop = Math.max(event.target.scrollTop, 0);
                    rerenderItemsElements(scrollTop);
                    isAnimating = false;
                });
            }
        }

        if (itemsContRef.current) {
            itemsContRef.current.addEventListener("scroll", handleItemsScroll);
            rerenderItemsElements(itemsContRef.current.scrollTop);
        }

        return () => {
            if (itemsContRef.current) {
                itemsContRef.current.removeEventListener("scroll", handleItemsScroll);
            }
        };
    }, [items]);

    // Scroll to the selected item when itemsValue changes
    useEffect(() => {
        const index = items.findIndex((item) => item === itemsValue);
        if (index !== -1 && itemsRefs.current[index]) {
            itemsRefs.current[index]?.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
        }
    }, [itemsValue, items]);

    // Handle "Save" button click
    const handleSave = () => {
        if (selectedIndex !== null) {
            const selectedItem = items[selectedIndex]; // Get the selected item based on the index
            onItemSelected(selectedItem); // Send the selected item to the parent component
            onItemsChange(selectedItem); // Optionally, trigger the onItemsChange callback
            setIsOpen(false);
        }
    };

    // Get text color based on whether it's selected (under the blue line)
    const getTextColor = (index) => {
        return index === selectedIndex ? "text-white" : "text-[rgba(0,119,182,1)]";
    };

    useEffect(() => {
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

    return (
        <label>
            <div
                onClick={() => setIsOpen(true)}
                className="w-full py-3 items-center bg-[rgb(247,247,247)] rounded-xl p-4 justify-between flex gap-3"
            >
                <p className="text-[rgba(0,0,0,0.32)] font-medium text-[15px]">
                    {title}
                </p>
                <div className="flex justify-between flex-1 items-center">
                    {selectedItem || "לחץ לבחירה"}
                    {isChevronDown && <ChevronDown height={16} width={20} />}
                </div>
            </div>

            {isOpen && (
                <div className="bg-modal">
                    <div
                        ref={calendarRef}
                        className="w-full absolute rounded-tl-3xl bottom-0 rounded-tr-3xl p-5 bg-white rounded-lg shadow"
                    >
                        <div className="text-left mb-6">
                            <button
                                onClick={handleSave}
                                className="text-[rgba(180,26,5,1)] text-sm mb-2"
                            >
                                סיום
                            </button>
                            <h2 className="text-xl font-semibold mb-6 text-[26px] text-center">
                                {text}
                            </h2>
                        </div>

                        <div className="relative py-5 px-5 mb-6">
                            <div className="absolute inset-0 pointer-events-none mr-5 ml-5">
                                <div className="absolute top-1/2 -translate-y-1/2 w-full rounded-xl h-12 bg-[rgba(0,119,182,1)]" />
                            </div>
                            <div dir="ltr" className="flex justify-between px-10 gap-2 h-48 text-2xl">
                                <div className="w-full items-center flex justify-center">
                                    <div className="container w-full" style={{ height: `${containerHeight}px` }}>
                                        <ul
                                            className="items w-full py-4 mb-2 flex absolute flex-col"
                                            ref={itemsContRef}
                                        >
                                            {items.map((item, index) => (
                                                <li
                                                    key={item || `${item}-${index}`}
                                                    className={`item text-[24px] items-center flex justify-center ${getTextColor(index)}`}
                                                    ref={(node) => (itemsRefs.current[index] = node)}
                                                    style={{
                                                        height: `${itemHeight}px`,
                                                        lineHeight: `${itemHeight}px`,
                                                    }}
                                                >
                                                    <div>{item}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleSave}
                            className="w-full bg-[rgba(0,119,182,1)] text-white py-3 rounded-xl"
                        >
                            שמור
                        </button>
                    </div>
                </div>
            )}
        </label>
    );
};


export const SelectBarItems = React.memo(SelectBarItemsComp);
