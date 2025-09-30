import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className = "flex h-screen">
      <SideBar />
      <div className="flex justify-between">
        <Header />
        <div className="lg:hidden">Mobile navigation</div>
        <div>{children}</div>;
      </div>
    </div>
  );
};

export default HomeLayout;
