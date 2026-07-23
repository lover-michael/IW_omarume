"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";

export default function PageMap() {
  return (
    <Box h={"full"} w={"full"} bgColor={"gray.500"}>
      <Image
        src={"/image/KotaniArea_Overall.png"}
        alt={"map"}
        width={'200'}
        height={'200'}
      />
    </Box>
  );
}
