"use client";

import { SideBarItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-full w-1/4 gap-4 lg:flex flex-col justify-around items-center hidden ">
      <div>
        <h1 className="h1 text-primary-a0 italic">STASH</h1>
      </div>
      <div className="w-full max-w-[220px] flex flex-col gap-4">
        {SideBarItems.map(({ name, icon, link }, key) => {
          const active = link === pathname;
          return (
            <Link
              href={link}
              key={key}
              className={`subtitle-1 flex-center gap-2 py-2 transition-colors duration-50 ease-in-out rounded-3xl ${
                active
                  ? "text-dark-a0 bg-primary-a0 scale-105"
                  : "text-dark-a0/40 bg-surface-a10 scale-100"
              }`}
            >
              <Image src={icon} alt={name} height={24} width={24} />
              {name}
            </Link>
          );
        })}
      </div>

      <Image
        src="/assets/images/files-2.png"
        alt="file Image"
        height={224}
        width={224}
      />

      <div className="flex-center gap-4 w-full max-w-[220px]">
        <Image
          src="/assets/images/avatar.png"
          alt="avatar"
          height={48}
          width={48}
        />
        <div>
          <p className="h3">Shlok Agarwal</p>
          <p className="caption">shlok@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
