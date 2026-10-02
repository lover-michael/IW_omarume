"use client";

import { Center, Box, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AiFillIdcard } from "react-icons/ai";
import { ButtonLink } from "./button/Button.Link";

export function Header() {
  const { data: session } = useSession();
  return (
    <Box boxShadow={"lg"}>
      <Center w="full" py={"3"} bgColor="green.500" position={"relative"}>
        <Link href="/map">
          <Box position={"absolute"} left={"10"} top={"2"}>
            <Image
              src="/image/appicon.png"
              alt="おまるめ山バス"
              width={"40"}
              height={"40"}
            />
          </Box>
          <Box color={"white"}>おまるめ山バス</Box>
        </Link>
        {session?.user?.id !== undefined ? (
          <div className="absolute right-2.5 h-full">
            <ButtonLink href="/">
              <AiFillIdcard className="text-2xl" />
              TOP
            </ButtonLink>
          </div>
        ) : (
          <div className="absolute right-2.5">
            <ButtonLink href="/login">
              ログイン
            </ButtonLink>
          </div>
        )}
      </Center>
    </Box>
  );
}
