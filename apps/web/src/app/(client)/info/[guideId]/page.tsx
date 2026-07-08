"use client";

import { Box, Button, Container, Stack } from "@chakra-ui/react";
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
        <Stack gap={"2"}>
          <Button
            asChild={true}
            position={"absolute"}
            fontWeight={"bold"}
            bgColor={"white"}
            color={"black"}
            boxShadow={"xl"}
            size={"xs"}
            top={"-10px"}
            left={"0px"}
          >
            <a href="/info">{"<<"}</a>
          </Button>
          {guideId === "1" ? (
            <Guide1 />
          ) : guideId === "2" ? (
            <Guide2 />
          ) : guideId === "3" ? (
            <Guide3 />
          ) : null}
        </Stack>
      </Box>
    </Container>
  );
}
