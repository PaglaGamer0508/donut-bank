"use client";

import { Copy, CopyCheck } from "lucide-react";
import React from "react";

interface CopyTextProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

const CopyText: React.FC<CopyTextProps> = ({ text, ...props }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <button
      {...props}
      onClick={copyToClipboard}
      className="bg-green-500 hover:bg-green-600 active:scale-90 transition-all duration-75 p-1 rounded-md"
    >
      {copied ? (
        <CopyCheck className="w-4 h-4 text-white" />
      ) : (
        <Copy className="w-4 h-4 text-white" />
      )}
    </button>
  );
};

export default CopyText;
