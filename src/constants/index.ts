export const SideBarItems = [
  {
    name: "Dashboard",
    icon: "/assets/icons/dashboard.svg",
    link: "/dashboard",
  },
  {
    name: "Documents",
    icon: "/assets/icons/documents.svg",
    link: "/document",
  },
  {
    name: "Images",
    icon: "/assets/icons/images.svg",
    link: "/image",
  },
  {
    name: "Media",
    icon: "/assets/icons/video.svg",
    link: "/media",
  },
  {
    name: "Other",
    icon: "/assets/icons/others.svg",
    link: "/other",
  },
];

export const ActionDropDownItems = [
  { name: "Rename", icon: "/assets/icons/edit.svg", value: "rename" },
  { name: "Download", icon: "/assets/icons/download.svg", value: "download" },
  { name: "Details", icon: "/assets/icons/info.svg", value: "details" },
  { name: "Share", icon: "/assets/icons/share.svg", value: "share" },
  { name: "Delete", icon: "/assets/icons/delete.svg", value: "delete" },
];

export const SortItems = [
  { name: "Date Created(newest)", value: "$createdAt-desc" },
  { name: "Date Created(oldest)", value: "$createdAt-asc" },
  { name: "Name(A-Z)", value: "name-asc" },
  { name: "Name(Z-A)", value: "name-desc" },
  { name: "Size (lowest)", value: "size-asc" },
  { name: "Size (highest)", value: "size-desc" },
];

export const MAX_FILE_SIZE = 1024 * 1024 * 30;
