import { fetchFiles, getTotalSpaceUsed } from "@/lib/userActions/file.actions";
import { convertFileSize, formatDateTime, getUsageSummary } from "@/lib/utils";

import ActionsDropdown from "@/components/ActionsDropdown";
import ChartRadialStacked from "@/components/Chart";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Thumbnail from "@/components/Thumbnail";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    fetchFiles({ types: [], searchQuery: "", sort: "", limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div>
      <ChartRadialStacked used={totalSpace.used} />
      <ul className="dashboard-summary-list">
        {usageSummary.map((summary) => (
          <Link
            href={summary.url}
            key={summary.title}
            className="dashboard-summary-card"
          >
            <div className="space-y-4">
              <div className="flex justify-between gap-3">
                <Image
                  src={summary.icon}
                  width={100}
                  height={100}
                  alt="uploaded image"
                  className="summary-type-icon"
                />
                <h4 className="summary-type-size">
                  {convertFileSize(summary.size) || 0}
                </h4>
              </div>

              <h5 className="summary-type-title">{summary.title}</h5>
              <Separator className="bg-light-400" />
              {formatDateTime(summary.latestDate)}
            </div>
          </Link>
        ))}
      </ul>
      <section className="dashboard-recent-files">
        <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
        {files.rows.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.rows.map((file: any) => (
              <Link
                href={file.url}
                target="_blank"
                className="flex items-center gap-3"
                key={file.$id}
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />

                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    {formatDateTime(file.$createdAt)}
                  </div>
                  <ActionsDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
