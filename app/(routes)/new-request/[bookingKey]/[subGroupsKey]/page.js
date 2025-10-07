"use client"; // הצהרת רכיב לקוח
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Header from "@/app/components/global/Header";
import FallingAnimation from '@/app/components/global/FallingAnimation ';
import axios from '@/app/lib/axios';
import { useRouter } from "next/navigation";
import DivBoxOptionsComp from '@/app/components/global/DivBoxOptionsComp';
import Skeleton from 'react-loading-skeleton';

export const SubGroupsPage = ({ params }) => {
    const { bookingKey, subGroupsKey } = params; // שימוש ב-params ישירות
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([])
    const router = useRouter();
    useEffect(() => {
        if (bookingKey && subGroupsKey) {
            setIsLoading(true);
        }
    }, [bookingKey, subGroupsKey]);

    function getFormFile() {
        setIsLoading(true);
        axios
            .get(`/initial-screen/sub-booking-types/${bookingKey}`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }
    useEffect(() => {
        getFormFile();
    }, []);

    console.log(data);

    return (
        <>
            <div className="bg-custom-ombre w-full h-full relative">
                <div className="z-20">
                    <Header title={data.display_name} isArrow={true} handleClick={() => router.push("/new-request/")} />
                </div>
                <div>
                    <div className='flex flex-col overflow-auto justify-around mt-7 rounded-3xl px-4'>
                        {isLoading ? <Skeleton count={2} height={90} className=' shadow-md ' /> :
                            <div className="flex">
                                <div className="w-full z-40 justify-center items-center">
                                    {data.booking_types?.map((type) => {
                                        return (
                                            <div>
                                                <DivBoxOptionsComp
                                                    id={type.id}
                                                    addressPage={`/new-request/${type.name}`}
                                                    name={type.name}
                                                    img={`/ButtonRequestIMG/Frame (1.${type.icon}).svg`}
                                                    text={type.display_name}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {/* {!isLoading && (
                    <div className='inset-0 -z-30'>
                        <FallingAnimation imageUrl={`/ButtonRequestIMG/Frame (1.${data.icon}).svg`} />
                    </div>
                )} */}
            </div>
        </>
    )
}
export default SubGroupsPage;
