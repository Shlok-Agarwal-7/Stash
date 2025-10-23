
import { fetchFiles, getTotalSpaceUsed } from "@/lib/userActions/file.actions";
import { convertFileSize, formatDateTime, getUsageSummary } from "@/lib/utils";

import ActionsDropdown from "@/components/ActionsDropdown";
import ChartRadialStacked from "@/components/Chart";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Thumbnail from "@/components/Thumbnail";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    fetchFiles({ types: [], searchQuery: "", sort: "", limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* LEFT SIDE - Chart + Summary */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Chart */}
        <div className="">
          <ChartRadialStacked used={totalSpace.used} />
        </div>

        {/* Summary Cards */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card p-4 bg-surface-a20 rounded-2xl hover:bg-dark-300 transition"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3 items-center">
                  <h4 className="summary-type-size text-lg font-semibold text-light-100">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="summary-type-title text-light-200 text-sm font-medium">
                  {summary.title}
                </h5>
                <Separator className="bg-white" />
                <p className="text-xs text-light-300">
                  {formatDateTime(summary.latestDate)}
                </p>
              </div>
            </Link>
          ))}
        </ul>
      </div>

      {/* RIGHT SIDE - Recent Files */}
      <section className="flex-1">
        <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
        {files.rows.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.rows.map((file: any) => (
              <Link
                href={file.url}
                target="_blank"
                className="flex items-center justify-between gap-3 p-3 bg-dark-200 rounded-xl hover:bg-dark-300 transition"
                key={file.$id}
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name font-medium text-light-100">
                      {file.name}
                    </p>
                    <p className="text-xs text-light-400">
                      {formatDateTime(file.$createdAt)}
                    </p>
                  </div>
                </div>
                <ActionsDropdown file={file} />
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list mt-4 text-light-400">No files uploaded</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
