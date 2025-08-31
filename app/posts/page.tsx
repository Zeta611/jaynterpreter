import {
  getAllPostFileNames,
  getContentAndFrontmatter,
} from "@/lib/process-post";
import Link from "next/link";

export default async function Page() {
  const postFileNames = getAllPostFileNames();

  const data = (
    await Promise.all(
      postFileNames.map(async (fileName) => {
        const { frontmatter } = await getContentAndFrontmatter(fileName);
        return [fileName, frontmatter] as const;
      })
    )
  ).sort(([, a], [, b]) => b.key.localeCompare(a.key));

  return (
    <div className="flex flex-col gap-7 font-serif">
      {data.map(([fileName, frontmatter]) => (
        <div key={frontmatter.title} className="flex flex-col gap-1.5">
          <div className="flex gap-3 text-xs">
            <div>{new Date(frontmatter.key).toLocaleDateString("ko-KR")}</div>
            <div>{frontmatter.tags.join(", ")}</div>
          </div>
          <Link href={`/posts/${fileName}`} className="text-lg font-semibold">
            {frontmatter.title}
          </Link>
          <div className="text-sm">{frontmatter.excerpt}</div>
        </div>
      ))}
    </div>
  );
}
