"use client";

import { Center, Box, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
          <Link
            href="/(clinet)/"
            style={{ position: "absolute", right: "10px" }}
          >
            <Button
              bgColor={"green.600"}
              position={"absolute"}
              right={"5"}
              boxShadow={"lg"}
              borderRadius={"4xl"}
              outline={"solid 2px"}
              outlineColor={"green.400"}
            >
              <Image
                src={"/image/botdf.jpg"}
                alt="ユーザー"
                width={20}
                height={20}
              />
            </Button>
          </Link>
        ) : (
          <Link href="/login" style={{ position: "absolute", right: "10px" }}>
            <Button
              bgColor={"green.600"}
              boxShadow={"lg"}
              borderRadius={"4xl"}
              outline={"solid 2px"}
              outlineColor={"green.400"}
            >
              ログイン
            </Button>
          </Link>
        )}
      </Center>
    </Box>
  );
}
