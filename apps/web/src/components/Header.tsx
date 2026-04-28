"use client";

import { Center, Box, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Box>
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
        {isLoggedIn === true ? (
          <Button
            bgColor={"green.600"}
            position={"absolute"}
            right={"5"}
            boxShadow={"lg"}
            borderRadius={"4xl"}
            outline={"solid 2px"}
            outlineColor={"green.400"}
          >
            <a href="/">
              <Image
                src={"/image/botdf.jpg"}
                alt="ユーザー"
                width={20}
                height={20}
              />
            </a>
          </Button>
        ) : (
          <Button
            // as={"a"}
            // href="/login"
            bgColor={"green.600"}
            position={"absolute"}
            right={"5"}
            boxShadow={"lg"}
            borderRadius={"4xl"}
            outline={"solid 2px"}
            outlineColor={"green.400"}
            onClick={() => {
              setIsLoggedIn(!isLoggedIn);
            }}
          >
            {/*<a href="/login">*/}
            ログイン
            {/*</a>*/}
          </Button>
        )}
      </Center>
    </Box>
  );
}
