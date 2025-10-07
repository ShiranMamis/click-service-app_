"use client";
import React from 'react'
import Image from "next/image";

export default function ButtonRequestType(props) {
    return (
        <>
            <button onClick={props.handleClick} className="flex flex-col items-center justify-center">
                <div className="bg-[rgba(255,255,255,1)] rounded-2xl shadow-md w-[17vw] h-[17vw] flex items-center justify-center">
                    <Image
                        src={props.img}
                        width={37}
                        height={37}
                        alt="new request"
                    />
                </div>
                <text className=" items-center max-w-[25vw]">{props.title}</text>
            </button>
        </>
    )
}
