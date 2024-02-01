import DashBoardNavbar from "@/components/DashBoardNavbar";
import HorizontalNavbar from "@/components/HorizontalNavbar";
import SlideMenuContainer from "@/components/SlideMenuContainer";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = async ({ children }) => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex">
      <SlideMenuContainer />
      {/* the vertical navigation bar */}
      <div className="hidden sm:block fixed top-0 left-0 h-full">
        <DashBoardNavbar />
      </div>

      {/* the horizontal navbar */}
      <div className="sm:hidden">
        <HorizontalNavbar />
      </div>

      {/* the Dashboard */}
      <div className="pt-14 sm:pt-0 sm:pl-[5.5rem] w-full max-w-[1600px] min-h-screen mx-auto">
        {children}
      </div>
    </div>
  );
};

export default layout;
