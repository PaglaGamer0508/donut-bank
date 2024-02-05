import DashBoardNavbar from "@/components/DashBoardNavbar";
import HorizontalNavbar from "@/components/HorizontalNavbar";
import SlideMenuContainer from "@/components/SlideMenuContainer";
import { getAuthSession } from "@/lib/auth";
import { getBankAccountId } from "@/lib/getBankAccountId";
import { hasCompany } from "@/lib/hasCompany";
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

  const bankAccountId = await getBankAccountId(session.user?.id);
  const companyExist = await hasCompany(bankAccountId!);

  return (
    <div className="flex">
      <SlideMenuContainer />
      {/* the vertical navigation bar */}
      <div className="hidden sm:block fixed top-0 left-0 h-full">
        <DashBoardNavbar hasCompany={companyExist!} />
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
