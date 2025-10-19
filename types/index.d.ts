interface UploadFileProps {
  file: File;
  ownerID: string;
  accountID: string;
  path: string;
}

interface UserProps {
  fullName: string;
  avatar: string;
  email: string;
  accountID: string;
  $id: string;
}

interface ActionType {
  name: string;
  icon: string;
  value: string;
}

interface SearchParamProps {
  params: { type: string };
  searchParams: { query?: string; sort?: string };
}

interface ShareFileProps {
  file: any;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

interface ThumbnailProps {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}

type FormType = "signin" | "signup";


type ToastMsgType = "rename" | "delete" | "share" | "";