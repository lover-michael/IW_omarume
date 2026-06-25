"use client";

import { Button, Card, Center, Flex, Box, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { SiChakraui, SiNextdotjs, SiReact } from "react-icons/si";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { auth } from "../(auth)/login/component/action/login";
import { settionAction } from "../(auth)/login/component/action/loginAction";

type User = {
  id: string | undefined;
  name: string | undefined | null;
  email: string | undefined | null;
};

export default function Home() {
  const [loginResult, setLoginResult] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      // セッション情報を取得
      const session = await settionAction();
      // セッションユーザーがいないなら、return
      if (!session) return;

      setUser({
        id: session?.user?.id,
        name: session?.user?.name,
        email: session?.user?.email,
      });
      setLoginResult(!!session);
    };
    fetchSession();
  }, []);

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
            <Button onClick={() => signOut()}>ログアウト</Button>
          </Stack>
        </Box>
      )}
    </Center>
  );
}
