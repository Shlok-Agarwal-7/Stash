import Thumbnail from "@/components/Thumbnail";
import React from "react";
import { formatDateTime } from "@/lib/utils";

export const ImageThumbnail = ({ file }: { file: any }) => (
  <div className="file-details-thumbnail">
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col">
      <p className="subtitle-2 mb-1">{file.name}</p>
      <p>{formatDateTime(file.$createdAt)}</p>
    </div>
  </div>
);
