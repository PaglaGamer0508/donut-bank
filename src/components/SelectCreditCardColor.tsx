"use client";

import { useSelectCreditCardColorState } from "@/lib/global-state-store/selectCreditCardColorState";
import { CreditCardColor } from "@/lib/types/credit-card-color";
import React, { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";

const SelectCreditCardColor: React.FC = ({}) => {
  const { creditCardColor, setCreditCardColor } =
    useSelectCreditCardColorState();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getColors = (color: CreditCardColor) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-500",
          border: "border-blue-500",
          text: "text-blue-500",
        };
      case "green":
        return {
          bg: "bg-green-500",
          border: "border-green-500",
          text: "text-green-500",
        };
      case "purple":
        return {
          bg: "bg-purple-500",
          border: "border-purple-500",
          text: "text-purple-500",
        };
      case "red":
        return {
          bg: "bg-red-500",
          border: "border-red-500",
          text: "text-red-500",
        };
    }
  };

  const handleOptionClick = (color: CreditCardColor) => {
    setIsOpen(false);
    setCreditCardColor(color);
  };

  return (
    <div className="relative bg-white w-[140px] sm:w-[180px] h-8 rounded">
      {isOpen ? (
        <div
          className={`group w-full h-full flex items-center justify-evenly rounded bg-white hover:bg-blue-100/70 transition-colors duration-75 focus:outline-none text-lg ${
            getColors(creditCardColor).text
          }`}
        >
          <span>
            {creditCardColor[0].toUpperCase() + creditCardColor.substring(1)}
          </span>

          <Icons.downIcon
            fill="#22c55e"
            className="group-hover:translate-y-[2px] transition-transform duration-75"
          />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className={`group w-full h-full flex items-center justify-evenly rounded bg-white hover:bg-blue-100/70 transition-colors duration-75 focus:outline-none text-lg ${
            getColors(creditCardColor).text
          }`}
        >
          <span>
            {creditCardColor[0].toUpperCase() + creditCardColor.substring(1)}
          </span>

          <Icons.downIcon
            fill="#22c55e"
            className="group-hover:translate-y-[2px] transition-transform duration-75"
          />
        </button>
      )}
      {isOpen && (
        <div
          className="flex flex-col gap-y-2 absolute top-11 left-0 w-[140px] sm:w-[180px] bg-white rounded border border-green-500 p-1 shadow-lg"
          ref={dropdownRef}
        >
          <button
            type="button"
            onClick={() => handleOptionClick("red")}
            className=" w-full text-lg hover:bg-blue-100/70 active:scale-90 transition-all duration-75 text-red-500 border border-red-500  font-semibold rounded"
          >
            <span
              className={`${getColors("red").bg} w-4 h-4 rounded-full`}
            ></span>
            <span>Red</span>
          </button>
          <button
            type="button"
            onClick={() => handleOptionClick("green")}
            className=" w-full text-lg hover:bg-blue-100/70 active:scale-90 transition-all duration-75 text-green-500 border border-green-500 font-semibold rounded"
          >
            <span
              className={`${getColors("green").bg} w-4 h-4 rounded-full`}
            ></span>
            <span>Green</span>
          </button>
          <button
            type="button"
            onClick={() => handleOptionClick("blue")}
            className=" w-full text-lg hover:bg-blue-100/70 active:scale-90 transition-all duration-75 text-blue-500 border border-blue-500 font-semibold rounded"
          >
            <span
              className={`${getColors("blue").bg} w-4 h-4 rounded-full`}
            ></span>
            <span>Blue</span>
          </button>
          <button
            type="button"
            onClick={() => handleOptionClick("purple")}
            className=" w-full text-lg hover:bg-blue-100/70 active:scale-90 transition-all duration-75 text-purple-500 border border-purple-500 font-semibold rounded"
          >
            <span
              className={`${getColors("purple").bg} w-4 h-4 rounded-full`}
            ></span>
            <span>Purple</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectCreditCardColor;
