"use client";

import React, { useState } from "react";

import { Dialog } from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { ActionDropDownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";

const ActionsDropdown = ({ file }: { file: any }) => {

  console.log("buckerID",file.bucketFileID);
  console.log(constructDownloadUrl(file.bucketFileID))

  const [action, setAction] = useState<ActionType | null>(null);
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none focus-visible:outline-none data-[state=open]:bg-transparent">
          <Image
            src="/assets/icons/dots.svg"
            alt="actions"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-surface-a30 text-dark-a0">
          <DropdownMenuLabel>{file.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ActionDropDownItems.map((item, key: number) => (
            <DropdownMenuItem key={key}>
              {item.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileID)}
                  download={file.name}
                  className="flex text-center gap-2"
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    height={20}
                    width={20}
                  />
                  <p>{item.name}</p>
                </Link>
              ) : (
                <div className="flex text-center gap-2">  
                  <Image
                    src={item.icon}
                    alt={item.name}
                    height={20}
                    width={20}
                  />
                  <p>{item.name}</p>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};

export default ActionsDropdown;
