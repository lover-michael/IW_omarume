"use server";

import fs from "fs";
import path from "path";
import reactMarkdown from "react-markdown";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function GetContent(params: { pathId: string }) {
  const contentPath = path.join(
    process.cwd(),
    "src",
    "contents",
    "guide" + params.pathId + ".md",
  );
  const fileContent = fs.readFileSync(contentPath, "utf-8");
  const { data, content } = matter(fileContent);

  //MarkdownをHTMLに変換
  const proccessdContent = await remark().use(html).process(content);

  return {
    meta: data,
    contentHTML: proccessdContent.toString(),
  };
}
