import { fetchFiles } from "@/lib/userActions/file.actions";

const Page = async ({ params }: { params: Promise<string> }) => {
  const type = await params;

  const files = await fetchFiles({ type });
  console.log(files);

  return (
    <>
      {files?.total > 0 ? (
        <section>
          {files.rows.map((file: any, index: number) => (
            <p key={index}>{file.name}</p>
          ))}
        </section>
      ) : (
        <p>No Files Found</p>
      )}
    </>
  );
};

export default Page;
