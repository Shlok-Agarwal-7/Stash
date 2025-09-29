import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-stretch">
      <section className=" bg-surface-a10 hidden w-1/2 lg:flex xl:w-2/5">
        <div className="flex-center flex-col space-y-5">
          <div className="space-y-3 px-10 mt-6">
            <h1 className="text-6xl italic text-primary-a0"> STASH </h1>
            <h1 className="h1">Manage your files effortlessly</h1>
            <p className="body-1">
              Stay organized and boost your productivity.
            </p>
          </div>

          <Image
            src="/assets/images/files.png"
            alt="Files Illustration"
            width={342}
            height={342}
            className="transition-all hover:scale-105 hover:rotate-6"
          />
        </div>
      </section>
      <div className="flex-center flex-col flex-1 space-y-4 bg-surface-a0">
        <h1 className="text-6xl italic text-primary-a0 lg:hidden"> STASH </h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;
