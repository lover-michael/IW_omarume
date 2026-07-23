"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";

export default function PageMap() {
  return (
    <Box h={"100%"} w={"100%"} bgColor={"gray.500"} position={"relative"}>
      <Image
        src={"/image/KotaniArea_Overall.png"}
        alt={"map"}
        style={{ width: '80%', height: '80%', position: 'absolute', top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }}
        fill={true}
      />
    </Box>
  );
}
