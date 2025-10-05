"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SideBarItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UploadButton from "./UploadButton";
import LogoutButton from "./LogoutButton";
import { Separator } from "@radix-ui/react-separator";
import Search from "./Search";

const MobileNavigation = ({ ...currentUser }: UserProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="lg:hidden flex justify-between items-center p-4 bg-surface-a10">
      <p className="h2 text-primary-a0 italic">Stash</p>
      <Search />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
          />
        </SheetTrigger>
        <SheetContent className="bg-surface-a10">
          <SheetHeader>
            <SheetTitle className="h2 text-primary-a0 italic mb-4">
              Stash
            </SheetTitle>
            <div className="flex-center gap-4 w-full max-w-[220px]">
              <Image
                src="/assets/images/avatar.png"
                alt="avatar"
                height={48}
                width={48}
              />
              <div>
                <p className="h3">{currentUser.fullName}</p>
                <p className="caption">{currentUser.email}</p>
              </div>
            </div>
            <Separator className="bg-primary-a0/10 data-[orientation=horizontal]:h-[2px]" />
            <div className="w-full flex flex-col flex-1 items-center gap-5 my-4">
              {SideBarItems.map(({ name, icon, link }, key) => {
                const active = link === pathname;
                return (
                  <Link
                    href={link}
                    key={key}
                    className={`subtitle-1 flex-center gap-2 px-4 py-2 transition-colors duration-100 ease-in-out rounded-3xl ${
                      active
                        ? "text-dark-a0 bg-primary-a0 scale-105"
                        : "text-dark-a0/40 bg-surface-a10 scale-100"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Image src={icon} alt={name} height={20} width={20} />
                    {name}
                  </Link>
                );
              })}
            </div>
            <Separator className="bg-primary-a0/10 data-[orientation=horizontal]:h-[2px]" />
            <div className="w-full flex justify-between mt-6 ">
              <UploadButton {...currentUser} />
              <LogoutButton />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
