"use client";

import * as React from "react";
import { Box } from "@chakra-ui/react";
import { GetContent } from "@/app/(client)/[userId]/info/getContent";
import { useEffect } from "react";

type Props = {
  params: Promise<{ guideId: string }>;
};

export default function PageInfoGuide({ params }: Props) {
  const { guideId } = React.use(params);
  const [contentHTML, setContentHTML] = React.useState("");
  const [meta, setMeta] = React.useState();

  useEffect(() => {
    const getContent = async () => {
      const { meta, contentHTML } = await GetContent({ pathId: guideId });

      setContentHTML(contentHTML);
    };
    getContent();
  }, []);

  return (
    <Box>
      <article dangerouslySetInnerHTML={{ __html: contentHTML }} />
    </Box>
  );
}
