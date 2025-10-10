import React from "react";
import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

interface Props {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}

export const Thumbnail = ({
  type,
  extension,
  url = "",
  imageClassName,
  className,
}: Props) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn("thumbnail", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn(
          "size-8 object-contain",
          imageClassName,
          isImage && "thumbnail-image",
        )}
      />
    </figure>
  );
};
export default Thumbnail;// import { getFileIcon } from "@/lib/utils";
// import Image from "next/image";

// const Thumbnail = ({
//   type,
//   extension,
// }: {
//   type: string;
//   extension: string;
// }) => {
//   return (
//     <figure className="thumbnail">
//       <Image
//         src={getFileIcon(extension, type)}
//         height={100}
//         width={100}
//         alt="file-icon"
//         className="size-9 object-contain"
//       />
//     </figure>
//   );
// };

// export default Thumbnail;
