import FileCard from "@/components/FileCard";
import SortBySelector from "@/components/SortBySelector";
import { fetchFiles } from "@/lib/userActions/file.actions";

const Page = async ({ params, searchParams }: SearchParamProps) => {
  const { type } = await params;
  const { query, sort } = await searchParams;
  const files = await fetchFiles({
    types: type === "media" ? ["video", "audio"] : [type],
    searchQuery: query || "",
    sort: sort || "",
  });

  return (
    <div className="w-full overflow-y-auto px-4">
      <section className="m-3 flex justify-between items-center flex-col gap-2 md:flex-row ">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="flex gap-2 items-center">
          <p className="subtitle-2">Sort</p>
          <SortBySelector />
        </div>
      </section>
      {files?.total > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {files.rows.map((file: any, index: number) => (
            <FileCard file={file} key={index} />
          ))}
        </section>
      ) : (
        <div className="flex justify-center">
          <p className="h3">No Files Found</p>
        </div>
      )}
    </div>
  );
};

export default Page;
