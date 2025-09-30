"use client";

import { SideBarItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-surface-a20 h-full w-1/4 gap-4 flex flex-col">
      {SideBarItems.map(({ name, icon, link }, key) => {
        const active = link === pathname;
        return (
          <Link
            href={link}
            key={key}
            className={`subtitle-1 flex-center gap-2 ${
              active ? "text-dark-a0 bg-primary-a0 rounded-lg" : ""
            }`}
          >
            <Image src={icon} alt={name} height={24} width={24} />
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
