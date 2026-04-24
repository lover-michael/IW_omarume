"use client";

import { Button, Center, Flex } from "@chakra-ui/react";
import { SiChakraui, SiNextdotjs, SiReact } from "react-icons/si";

export default function Page() {
  return (
    <Center h="full" w="full">
      <Flex direction="column" gap={2}>
        <Button colorPalette="gray" asChild>
          <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer">
            <SiNextdotjs />
            爪爪爪
          </a>
        </Button>
        <Button colorPalette="teal" asChild>
          <a
            href="https://chakra-ui.com/docs/components/concepts/overview"
            target="_blank"
            rel="noreferrer"
          >
            <SiChakraui />
            Chakra UIでコンポーネントを見る
          </a>
        </Button>
        <Button colorPalette="pink" asChild>
          <a
            href="https://react-icons.github.io/react-icons/"
            target="_blank"
            rel="noreferrer"
          >
            <SiReact />
            React Iconsでアイコンを見る
          </a>
        </Button>
      </Flex>
    </Center>
  );
}
