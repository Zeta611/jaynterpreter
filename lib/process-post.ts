import fs from "fs";
import path from "path";
import { compileMDX, CompileMDXResult } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";

const postsDirectory = path.join(process.cwd(), "posts");

export type Frontmatter = {
  title: string;
  key: string;
  tags: string[];
  excerpt: string;
};

export function getAllPostFileNames() {
  const allFiles = fs.readdirSync(postsDirectory);
  const mdxFiles = allFiles.filter((file) => file.endsWith(".mdx"));
  return mdxFiles.map((file) => file.replace(".mdx", ""));
}

export async function getContentAndFrontmatter(
  fileName: string
): Promise<CompileMDXResult<Frontmatter>> {
  const postFilePath = path.join(postsDirectory, fileName + ".mdx");
  const post = fs.readFileSync(postFilePath, "utf8");

  return await compileMDX({
    source: post,
    components: { h1: "h2" },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        format: "mdx",
        remarkPlugins: [
          remarkGfm,
          remarkMath,
          [remarkToc, { heading: "목차" }],
        ],
        rehypePlugins: [
          [rehypeKatex, { throwOnError: true, strict: true }],
          [rehypePrettyCode, { theme: "solarized-light" }],
        ],
      },
    },
  });
}
