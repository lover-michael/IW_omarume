"use client";

import { Box, Button, Center, HStack } from "@chakra-ui/react";
import Image from "next/image";

export default function PageMap() {
  return (
    <Box h={"100%"} w={"100%"} position={"relative"}>
      <Image
        src={"/image/KotaniArea_Overall.png"}
        alt={"map"}
        style={{ width: '100%', height: '90%', position: 'absolute', top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }}
        fill={true}
      />
      <Center my={'5'} mx={'5'} py={'5'}>
        <HStack gap={'5'}>
          <Button boxShadow={'xl'} bgColor={'green.500'}>
            バスの現在値
          </Button>
          <Button boxShadow={'xl'} bgColor={'green.500'}>
            ルート確認
          </Button>
        </HStack>
      </Center>
    </Box>
  );
}
