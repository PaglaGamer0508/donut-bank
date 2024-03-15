import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="px-10 md:px-40 pt-3 md:pt-36 mt-[74px]">
        <div>
          <h1 className={`font-bold text-3xl md:text-4xl max-w-[600px]`}>
            <span className="bg-green-500 px-2 rounded-lg text-white">
              DonutBank
            </span>{" "}
            <span>{"is a Dummy Payment System using Donut Coins"}</span>
          </h1>
        </div>

        {/* Links */}
        <div className="flex items-center gap-x-5 pt-16">
          <Link
            href="/dashboard"
            className="flex items-center gap-x-1 w-fit font-semibold px-4 py-2 bg-green-500 hover:bg-green-500 text-white active:scale-95 rounded-full cursor-pointer transition-all duration-75"
          >
            <span>Get Started</span>
          </Link>

          <Link
            href="#"
            className="flex items-center gap-x-1 w-fit font-semibold px-4 py-2 border border-gray-200 hover:border-green-400 active:scale-95 rounded-full cursor-pointer transition-all duration-75"
          >
            <span>Contact</span>
          </Link>
        </div>

        {/* services section */}
      </div>
      <div className="h-[1000px]"></div>
    </>
  );
}
