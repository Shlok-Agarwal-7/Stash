import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import SideBar from "@/components/SideBar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-surface-a10 text-dark-a0">
      <SideBar />
      <div className="w-full">
        <Header />
        <MobileNavigation />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
