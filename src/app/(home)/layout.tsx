import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import SideBar from "@/components/SideBar";
import { getCurrentUser } from "@/lib/userActions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/signin");

  return (
    <div className="flex h-screen bg-surface-a10 text-dark-a0">
      <SideBar {...currentUser} />
      <div className="w-full flex flex-col">
        <Header {...currentUser} />
        <MobileNavigation {...currentUser} />

        <main className="p-2 flex-1 overflow-auto">
          <div className="w-full max-w-7xl mx-auto hide-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
