"use client";
import { Button, Center } from "@chakra-ui/react";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "./button/Button.Link";

export function Footer() {
  const pathname = usePathname();

  return (
    <Center w="full" py={"4"} bgColor="green.500" gapX={"3"} boxShadow={"lg"}>
      <ButtonLink href="/timetable" buttonClassName={ `border-3 border-green-500 shadow-md ${pathname.includes("/timetable") ? "bg-green-600 scale-110" : ""}`}>
        <AiOutlineSchedule className="text-xl" /> 時刻表
      </ButtonLink>
      <ButtonLink href="/map" buttonClassName={`border-3 border-green-500 shadow-md ${pathname.includes("/map") ? "bg-green-600 scale-110" : ""}`}>
        <FaMapMarkerAlt className="text-xl" /> マップ
      </ButtonLink>
      <ButtonLink href="/info" buttonClassName={`border-3 border-green-500 shadow-md ${pathname.includes("/info") ? "bg-green-600 scale-110" : ""}`}>
        <IoInformationCircleOutline className="text-xl" /> バス情報
      </ButtonLink>
    </Center>
  );
}
