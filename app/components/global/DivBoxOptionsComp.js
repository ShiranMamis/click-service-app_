"use client";
import React from 'react'
import Image from "next/image";
import Link from "next/link";
export default function DivBoxOptionsComp(props) {
    return (

        <ul className=" py-1">
            <Link
                href={props.addressPage}
                className="w-full text-right p-5 text-xl bg-white rounded-2xl drop-shadow flex items-center gap-5"
            >
                <Image
                    src={props.img}
                    width={40}
                    height={35}
                />
                {props.text}
            </Link>
        </ul>

    )
}
