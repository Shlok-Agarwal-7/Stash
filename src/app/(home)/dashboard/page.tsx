import Image from "next/image";
import Link from "next/link";

import ActionsDropdown from "@/components/ActionsDropdown";

import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { fetchFiles, getTotalSpaceUsed } from "@/lib/userActions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";

const Dashboard = async () => {
  return <div>Coming Soon ....</div>;
};

export default Dashboard;
