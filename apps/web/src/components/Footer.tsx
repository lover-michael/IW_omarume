"use client";
import { Button, Center } from "@chakra-ui/react";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  return (
    <Center w="full" py={"2"} bgColor="green.500" gapX={"3"} boxShadow={"lg"}>
      <Link href="/timetable">
        <Button
          bgColor={pathname === "/timetable" ? "green.400" : "green.500"}
          boxShadow={"md"}
          rounded={"2xl"}
        >
          <AiOutlineSchedule size={"24px"} />
          時刻表
        </Button>
      </Link>
      <Link href="/map">
        <Button
          bgColor={pathname === "/map" ? "green.400" : "green.500"}
          boxShadow={"md"}
          rounded={"2xl"}
        >
          <FaMapMarkerAlt />
          マップ
        </Button>
      </Link>
      <Link href="/info">
        <Button
          bgColor={pathname === "/info" ? "green.400" : "green.500"}
          boxShadow={"md"}
          rounded={"2xl"}
        >
          <IoInformationCircleOutline />
          バス情報
        </Button>
      </Link>
    </Center>
  );
}
