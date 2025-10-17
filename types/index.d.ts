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
  searchParams: { query?: string };
}
