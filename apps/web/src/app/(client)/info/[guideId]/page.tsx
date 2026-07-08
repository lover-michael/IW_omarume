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
        {guideId === "1" ? (
          <Stack>
            <Button asChild={true} fontWeight={"bold"} outline={"none"}>
              <a href="/info">{"<<"}</a>
            </Button>
            <Guide1 />
          </Stack>
        ) : guideId === "2" ? (
          <Stack>
            <Button asChild={true} fontWeight={"bold"} outline={"none"}>
              <a href="/info">{"<<"}</a>
            </Button>
            <Guide2 />
          </Stack>
        ) : guideId === "3" ? (
          <Stack>
            <Button asChild={true} fontWeight={"bold"} outline={"none"}>
              <a href="/info">{"<<"}</a>
            </Button>
            <Guide3 />
          </Stack>
        ) : null}
      </Box>
    </Container>
  );
}
