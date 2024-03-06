"use client";

import { Lato } from "next/font/google";
import React, { useState } from "react";
import CopyText from "./CopyText";
import { Eye, EyeOff } from "lucide-react";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface ShowAPIKeyProps {
  apiKey: string;
}

const ShowAPIKey: React.FC<ShowAPIKeyProps> = ({ apiKey }) => {
  const [showAPIKey, setShowAPIKey] = useState<boolean>(false);

  return (
    <div className="border-2 border-green-500 rounded-lg">
      <div className="bg-green-500 py-1 px-3">
        <h1 className={`${lato.className} text-lg text-white`}>API key</h1>
      </div>
      <div className="flex justify-between items-center gap-2 py-1 px-3">
        <p className="text-green-500 font-medium ">
          {showAPIKey ? apiKey : Array(apiKey.length).fill("*").join("")}
        </p>
        <div className="flex justify-between items-center gap-x-2">
          {showAPIKey ? (
            <button
              onClick={() => setShowAPIKey(false)}
              className="bg-green-500 hover:bg-green-600 active:scale-90 transition-all duration-75 p-1 rounded-md"
            >
              <EyeOff className="w-4 h-4 text-white" />
            </button>
          ) : (
            <button
              onClick={() => setShowAPIKey(true)}
              className="bg-green-500 hover:bg-green-600 active:scale-90 transition-all duration-75 p-1 rounded-md"
            >
              <Eye className="w-4 h-4 text-white" />
            </button>
          )}
          <CopyText text={apiKey} />
        </div>
      </div>
    </div>
  );
};

export default ShowAPIKey;
