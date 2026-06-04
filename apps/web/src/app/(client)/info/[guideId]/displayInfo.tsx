"use client";
import { remark } from "remark";
import html from "remark-html";
import { useEffect, useMemo } from "react";

export default function DisplayInfo({
  contentHTML,
  meta,
}: {
  contentHTML: string;
  meta: any;
}) {
  const { proccessdContent } = useMemo(() => {
    return {
      proccessdContent: remark().use(html).process(contentHTML),
    };
  }, [contentHTML]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: proccessdContent.toString() }} />
    </div>
  );
}
