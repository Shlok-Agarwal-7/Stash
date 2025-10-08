import React from "react";
import Thumbnail from "./Thumbnail";
import Image from "next/image";
import Link from "next/link";

const FileCard = ({ file }: { file: any }) => {
  return (
    <Link href={file.url} target="_blank" className="file-card p-6">
      <div className="flex justify-between">
        <Thumbnail extension={file.extension} type={file.type} />
        <Image
          src="/assets/icons/dots.svg"
          alt="actions"
          width={20}
          height={20}
        />
      </div>
      <p className="text-center">{file.name}</p>
    </Link>
  );
};

export default FileCard;
