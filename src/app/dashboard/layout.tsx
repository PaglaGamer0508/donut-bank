import DashBoardNavbar from "@/components/DashBoardNavbar";
import HorizontalNavbar from "@/components/HorizontalNavbar";
import SlideMenuContainer from "@/components/SlideMenuContainer";
import { getAuthSession } from "@/lib/auth";
import { hasApplication } from "@/lib/hasApplication";
import { hasBankAccount } from "@/lib/hasBankAccount";
import { redirect } from "next/navigation";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = async ({ children }) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const applicationExist = await hasApplication(session.user.id!);
  const bankAccountExist = await hasBankAccount();

  return (
    <div className="flex bg-[#f5f6fa]">
      <SlideMenuContainer
        hasBankAccount={bankAccountExist}
        hasApplication={applicationExist}
      />
      {/* the vertical navigation bar */}
      <div className="hidden sm:block fixed top-0 left-0 h-full">
        <DashBoardNavbar
          hasApplication={applicationExist}
          hasBankAccount={bankAccountExist}
        />
      </div>

      {/* the Dashboard */}
      <div className="sm:pt-0 sm:pl-[5.5rem] w-full max-w-[1600px] min-h-screen mx-auto">
        {/* the horizontal navbar */}
        <div className="sm:hidden">
          <HorizontalNavbar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
