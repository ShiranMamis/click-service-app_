"use client";
import React from "react";
import Link from "next/link";
import Header from "@/app/components/global/Header";
import ButtonRequestType from "@/app/components/global/ButtonRequestType";
import useFetchBookingTypes from "@/app/hooks/UseFetchBookingTypes";
import useAuth from "@/app/hooks/useAuth";
import Skeleton from "react-loading-skeleton";

export default function page() {
    const { user } = useAuth({ middleware: "guest" });
    const { data, isLoading } = useFetchBookingTypes({ middleware: "user" });
    console.log(user);

    return (
        <div>
            <Header title="שירות בקליק" />
            <div>
                <div className="p-5">
                    <div className="flex gap-1">
                        <p className="text-[22px] font-bold text-[#000000]"> שלום, </p>
                        <p className="flex items-center text-[22px] text-[#0077B6]">{user?.name}</p>
                    </div>
                    <p>באיזה נושא תרצה לפתוח קריאה?</p>
                </div>
                <div className="grid grid-cols-3 gap-y-4 max-h-[70vh] items-start overflow-y-auto">
                    {data?.map((type) => {
                        const linkHref = type.has_sub_groups
                            ? `/new-request/${type.name}/sub-groups`
                            : `/new-request/${type.name}`;
                        return (
                            <Link href={linkHref} >
                                <div className="flex justify-center" >
                                    <ButtonRequestType
                                        id={type.id}
                                        name={type.name}
                                        img={`/ButtonRequestIMG/Frame (1.${type.icon}).svg`}
                                        title={type.display_name}
                                    />
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {isLoading &&
                    <div className="flex p-5 justify-between items-center ">
                        <Skeleton count={5} height={90} width={90} className="rounded-3xl mb-10" />
                        <Skeleton count={5} height={90} width={90} className="rounded-3xl mb-10" />
                        <Skeleton count={5} height={90} width={90} className="rounded-3xl mb-10" />
                    </ div>
                }
            </div>
        </div>
    )
}
