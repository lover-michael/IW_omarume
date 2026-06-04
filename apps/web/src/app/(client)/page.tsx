"use client";

import { Button, Card, Center, Flex, Box, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";

import { SiChakraui, SiNextdotjs, SiReact } from "react-icons/si";
import Image from "next/image";

export default function Home() {
  const [loginResult, setLoginResult] = useState(false);
  return (
    <Center h="full" w="full" p={"7"}>
      {loginResult === false ? (
        <Link href="/login">
          <Button
            onClick={() => {
              setLoginResult(true);
            }}
          >
            ログインはこちらから
          </Button>
        </Link>
      ) : (
        <Box boxSize={"xl"}>
          <Stack gapY={"5"}>
            <Card.Root size={"lg"}>
              <Card.Body>
                <Card.Title>
                  <Flex gap={"4"}>
                    <Image
                      src={"/image/botdf.jpg"}
                      alt="ユーザー画像"
                      width={100}
                      height={100}
                    />
                    <Box textAlign={"center"}>ユーザー情報</Box>
                  </Flex>
                </Card.Title>
              </Card.Body>
            </Card.Root>
            <Button
              onClick={() => {
                setLoginResult(false);
              }}
            >
              ログアウト
            </Button>
          </Stack>
        </Box>
      )}
    </Center>
  );
}
