import Image, { StaticImageData } from "next/image";
import React from "react";

interface TransactionImageProps {
  alt: string | StaticImageData;
  src: string;
}

const TransactionImage: React.FC<TransactionImageProps> = ({ alt, src }) => {
  return (
    <Image
      alt="Transaction Image"
      src={src}
      width={64}
      height={64}
      className="w-12 h-12 rounded-lg object-cover"
    />
  );
};

export default TransactionImage;
