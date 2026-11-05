"use client";

import { Center, Box} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AiFillIdcard } from "react-icons/ai";
import { ButtonLink } from "../button/Button.Link";
import appIcon from "@/../public/image/appicon.png";

export function Header() {
  const { data: session } = useSession();
  return (
    <Box boxShadow={"lg"}>
      <Center w="full" h={"14"} bgColor="green.500" position={"relative"}>
        <Link href="/map" className="flex gap-10 items-center justify-end pe-5 w-3/4">
          <Image
            src={ appIcon }
            loading="eager"
            alt="おまるめ山バス"
            width={"40"}
            height={"40"}
          />
          <span className="text-xl text-gray-50">おまるめ山バス</span>
        </Link>
        {session?.user?.id !== undefined ? (
          <div className="flex justify-end me-1 h-full w-1/4">
            <ButtonLink href="/">
              <AiFillIdcard className="text-2xl" />
              TOP
            </ButtonLink>
          </div>
        ) : (
          <div className="flex justify-end me-1 h-full w-1/4">
            <ButtonLink href="/login">
              ログイン
            </ButtonLink>
          </div>
        )}
      </Center>
    </Box>
  );
}
