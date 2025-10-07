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

interface fetchFileType{
  userID : string;
  type : string;
}
