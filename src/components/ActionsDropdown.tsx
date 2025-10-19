"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
import { constructDownloadUrl, isToastType } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ShareFile } from "./ShareFile";
import { FileDetails } from "./FileDetails";
import { usePathname } from "next/navigation";
import {
  deleteFile,
  renameFile,
  shareFileToUser,
} from "@/lib/userActions/file.actions";
import { toast } from "sonner";

const ActionsDropdown = ({ file }: { file: any }) => {
  const [action, setAction] = useState<ActionType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fileName, setFileName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<ToastMsgType>("");
  const path = usePathname();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setFileName(file.name);
    setEmails([]);
  };

  const handleAction = async () => {
    setIsLoading(true);

    const actionResponse = {
      rename: () =>
        renameFile({
          fileID: file.$id,
          newName: fileName,
          path: path,
        }),

      delete: () =>
        deleteFile({
          fileID: file.$id,
          fileBucketFileID: file.bucketFileID,
          path: path,
        }),

      share: () =>
        shareFileToUser({
          fileID: file.$id,
          emails: emails,
          path: path,
        }),
    };

    try {
      const handler =
        actionResponse[action?.value as keyof typeof actionResponse];
      const success = await handler();
      if (success) {
        if (toastMsg!= ""){
          toast.success(`The File was successfully ${toastMsg}ed`)
          setToastMsg("");
        }
        closeAllModals();
      }
    } catch (error) {
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await shareFileToUser({
      fileID: file.$id,
      emails: updatedEmails,
      path,
    });

    if (success) setEmails(updatedEmails);
    closeAllModals();
  };

  const renderActionContent = () => {
    if (action === null) return null;
    const { value, name } = action;
    return (
      <DialogContent className="bg-surface-a10 text-dark-a0">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          {value === "rename" && (
            <Input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="shad-input mt-2"
            />
          )}

          {value === "share" && (
            <ShareFile
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === "details" && <FileDetails file={file} />}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter>
            <Button variant="danger" onClick={closeAllModals}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAction}>
              {isLoading ? (
                <Image
                  src="/assets/icons/loader.svg"
                  height={20}
                  width={20}
                  alt="loader"
                />
              ) : (
                name
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
            <DropdownMenuItem
              key={key}
              onClick={() => {
                setAction(item);
                if (
                  ["rename", "details", "share", "delete"].includes(item.value)
                ) {
                  setIsModalOpen(true);
                }
                if (isToastType(item.value)) {
                  setToastMsg(item.value);
                }
              }}
            >
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
      {renderActionContent()}
    </Dialog>
  );
};

export default ActionsDropdown;
