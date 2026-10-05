"use client";

import { Box, Button, Center, HStack } from "@chakra-ui/react";
import Image from "next/image";
import map from "@/../public/image/KotaniArea_Overall.png";

export default function PageMap() {
  return (
    <Box h={"100%"} w={"100%"} position={"relative"}>
      <Image
        src={map}
        alt={"map"}
        width={400}
        height={400}
        style={{ position: 'absolute', top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }}
      />
      <Center my={'2'} mx={'5'}>
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
