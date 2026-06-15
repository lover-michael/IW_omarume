"use client";

import { Box, Container } from "@chakra-ui/react";
import { Guide1 } from "@/contents/guide1";
import { Guide2 } from "@/contents/guide2";
import { Guide3 } from "@/contents/guide3";
import React from "react";

export default function GuidePage({
  params,
}: {
  params: Promise<{ guideId: string }>;
}) {
  const { guideId } = React.use(params);
  return (
    <Container h={"full"} w={"full"} centerContent={true} position={"relative"}>
      <Box
        w={"90%"}
        py={"4"}
        borderRadius={"2xl"}
        top={"5"}
        bgColor={"white"}
        position={"absolute"}
      >
        {guideId === "1" ? (
          <Guide1 />
        ) : guideId === "2" ? (
          <Guide2 />
        ) : guideId === "3" ? (
          <Guide3 />
        ) : null}
      </Box>
    </Container>
  );
}
