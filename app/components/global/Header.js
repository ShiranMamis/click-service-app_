import React from "react";
import { ChevronRight } from "lucide-react";

export default function Header(props) {
  return (
    <div
      className="w-full flex items-center justify-center shadow-[0px_4px_9.7px_0px_rgba(0,0,0,0.05)]
 bg-white min-h-[56px] h-[7%] font-medium text-xl sticky top-0 z-10"
    >
      {props.title}
      {props.isArrow && (
        <div
          onClick={props.handleClick}
          className="absolute right-3 text-medium-blue"
        >
          <ChevronRight />
        </div>
      )}
    </div>
  );
}
