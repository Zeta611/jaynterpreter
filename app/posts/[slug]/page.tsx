import {
  getAllPostFileNames,
  getContentAndFrontmatter,
} from "@/lib/process-post";

export async function generateStaticParams() {
  return getAllPostFileNames().map((fileName) => ({
    slug: fileName,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = await getContentAndFrontmatter(slug);

  return (
    <div className="font-serif">
      <h1 className="text-2xl font-bold">{frontmatter.title}</h1>
      <article className="prose dark:prose-invert text-justify">
        {content}
      </article>
    </div>
  );
}
