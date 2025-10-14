import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageThumbnail } from "./ImageThumbnail";

interface Props {
  file: any;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareFile = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="flex flex-col gap-5">
        <p className="subtitle-2 text-dark-a10">Share file with other users</p>
        <input
          type="email"
          placeholder="Enter email address seperate with ',' for multiple"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="input bg-surface-a20 rounded-lg p-2"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Shared with</p>
            <p className="subtitle-2 text-light-200">
              {file.users.length} users
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="subtitle-2">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="rounded-full bg-transparent"
                >
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="bg-transparent rounded-full"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
