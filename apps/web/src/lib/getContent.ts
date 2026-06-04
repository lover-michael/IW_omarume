import fs from "node:fs";
import path from "path";
import matter from "gray-matter";

export async function GetContent(params: { pathId: string }) {
  const contentPath = path.join(
    process.cwd(),
    "src",
    "contents",
    "guide" + params.pathId + ".md",
  );
  const fileContent = fs.readFileSync(contentPath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: data,
    contentHTML: content,
  };
}
