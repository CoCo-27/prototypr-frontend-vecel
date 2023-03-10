import Link from "next/link";
import WriterGrid from "@/components/toolbox/WriterGrid";

export default function Contributors({className}) {
  return (
    <div className={`hidden lg:block my-6 ${className}`}>
      <div className="p-5 bg-white rounded-lg">
        <h1 className="text-sm font-semibold mb-6">Contributors</h1>
        <WriterGrid size={11} />
          <Link href="/post/write-for-us">
            <h1 className="ml-1 cursor-pointer hover:underline text-sm font-medium text-blue-600">
              Write for us →
            </h1>
          </Link>
      </div>
    </div>
  );
}
