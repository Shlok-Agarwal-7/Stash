import FileCard from "@/components/FileCard";
import { fetchFiles } from "@/lib/userActions/file.actions";

const Page = async ({ params }: { params: Promise<string> }) => {
  const type = await params;
  const files = await fetchFiles({ type });

  return (
    <div className="w-full overflow-y-auto px-4">
      {files?.total > 0 ? (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-max">
          {files.rows.map((file: any, index: number) => (
            <FileCard file={file} key={index} />
          ))}
        </section>
      ) : (
        <p>No Files Found</p>
      )}
    </div>
  );
};

export default Page;
