"use client";

import { Button, Card, Center, Flex, Box, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { signOut } from "next-auth/react";
import { sessionAction } from "../(auth)/login/component/action/loginAction";

export type User = {
  id: number | undefined;
  name: string | undefined | null;
  email: string | undefined | null;
};

export default function Home() {
  const [loginResult, setLoginResult] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      // セッション情報を取得
      const session = await sessionAction();
      // セッションユーザーがいないなら、return
      if (!session) {
        setLoginResult(false);
        return;
      }

      setUser({
        id: Number(session?.user?.id),
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
        <Button asChild>
          <a href="/login">ログインはこちらから</a>
        </Button>
      ) : (
        <Box boxSize={"xl"}>
          <Stack gapY={"5"}>
            <Card.Root size={"lg"}>
              <Card.Body>
                <Card.Title>
                  <Box textAlign={"center"}>
                    <div>{user?.id}</div>
                    <div>{user?.name}</div>
                    <div>{user?.email}</div>
                  </Box>
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
