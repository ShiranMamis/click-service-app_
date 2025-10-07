"use client";
import React, { useState, useEffect } from 'react';
import Header from "@/app/components/global/Header";
import { usePathname, useRouter } from "next/navigation";
import OrderComp from '@/app/components/order-types/OrderComp';
import DriveDescribe from '@/app/components/order-types/Statement';
import FallingAnimation from '@/app/components/global/FallingAnimation ';
import TimePicker from '@/app/components/global/TimePicker';
import SelectBarComp from '@/app/components/global/SelectBarComp';
import { SelectBarItems } from '@/app/components/global/SelectBarItemsComp';
import axios from '@/app/lib/axios';
import Skeleton from 'react-loading-skeleton';
import CompleteAnimation from '@/app/components/global/CompleteAnimation';




export default function Page() {
    const router = useRouter();
    const [popup, setPopup] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0);
    // -----< 


    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    const openPopup = (e) => {
        console.log(e.selectedOption)
        // setPopups(e = true);
        setPopup(true)
    };
    const closePopup = (e) => {
        // setPopups(e = false);
        setPopup(false);
    };

    // the pathName of the page 
    let pathname = usePathname();
    pathname = pathname.split("/")[2];
    console.log(pathname)
    const [showAnimation, setShowAnimation] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const url = middleware === "manager" ? "management-booking-types" : "booking-types";

    function getFormFile() {
        setIsLoading(true);
        axios
            .get(`/initial-screen/form/${pathname}`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }
    useEffect(() => {
        getFormFile();
    }, []);

    const bookingType = {
        "display_name": data.booking_type?.display_name,
        "icon": data.booking_type?.icon,
        "id": data.booking_type?.id,
        "name": data.booking_type?.name
    };
    const fieldNames = data.form_fields?.map(field => field);

    console.log("bookingType: ", bookingType);
    console.log("Field arr data: ", fieldNames);
    console.log("Full Data: ", data)

    function handleDelete() {
        setIsDeleted(false);
        setShowAnimation(true);
    }

    // const toggleTimePicker = () => {
    //     setIsTimePickerOpen((prev) => !prev);
    // };
    // const toggleDriveCount = () => {
    //     setIsSelectedItem((prev) => !prev);
    // };
    return (
        <div className="bg-custom-ombre h-full relative">
            <div className="z-20">
                <Header title={bookingType.display_name} isArrow={true} handleClick={() => router.push("/new-request/")} />
            </div>
            <div>
                <div className="flex w-full">
                    <div className="w-full flex p-5 z-40 justify-center items-center">
                        {/* {isLoading ? <Skeleton count={1} height={600} width={400} className=' rounded-2xl shadow-sm p-2 ' />
                            : ( */}
                        <OrderComp
                            onClose={closePopup}
                            onItemsChange={setSelectedValue}
                            onSelect={(item) => setSelectedItem(item)}
                            selectedItem={selectedItem}
                            itemsValue={selectedValue}
                            // items={items}
                            onChange={setSelectedValue}
                            openPopup={openPopup}
                            date={getTodayDate}
                            fields={fieldNames}
                            bookingType={bookingType}
                            statement={data.statement}
                        />
                        {/* )} */}
                    </div>
                </div>
            </div>
            {!isLoading && (
                <div className='inset-0 -z-30'>
                    <FallingAnimation imageUrl={`/ButtonRequestIMG/Frame (1.${bookingType.icon}).svg`} />
                </div>
            )}
            {showAnimation && (
                <CompleteAnimation onAnimationEnd={handleAnimationEnd} />
            )}
        </div>
    );
}
