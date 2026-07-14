"use client"

import { signOut } from "next-auth/react";
import { Box, Stack, Card, Button, HStack, Center } from "@chakra-ui/react";
import { AiOutlineCoffee } from "react-icons/ai";

export default function UserInfo({user}: { user: { name: string; } }) {
  return (
    <Center h="full" w="full" p={"7"}>
      <Box boxSize={"xl"}>
        <Stack gapY={"5"}>
          <Card.Root size={"lg"}>
            <Card.Body>
              <Card.Title>
                <HStack gapX={'3'}>
                  <AiOutlineCoffee />
                  <Box textAlign={"left"}>
                    <div>{user?.name}</div>
                  </Box>
                </HStack>
              </Card.Title>
            </Card.Body>
          </Card.Root>
          <Button onClick={() => signOut()}>ログアウト</Button>
        </Stack>
      </Box>
    </Center>
  )
}
