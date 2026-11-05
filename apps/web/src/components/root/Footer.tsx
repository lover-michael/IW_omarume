"use client";
import { Center, Link } from "@chakra-ui/react";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";

// フッターのナビゲーションボタン
const FooterButton = (
  { text, icon, href }:
    { text: string, icon: React.ReactNode, href: string }
) => {
  const nowPath = usePathname();

  return (
    <Link
      href={href}
      className={`my-1 flex flex-col gap-0.5 duration-300 justify-center items-center w-20 h-full rounded-4xl ${nowPath === href ? "bg-emerald-400 scale-110" : ""}`}
    >
      {icon}
      <span className="font-semibold">
        {text}
      </span>
    </Link>
  )
}

export function Footer() {
  const pathname = usePathname();

  return (
    <Center h="24" w="full" py={"1"} bgColor="whiteAlpha.200" gapX={"5"} boxShadow={"lg"}>
      <FooterButton
        href="/map"
        icon={<FaMapMarkerAlt className="text-2xl" />}
        text="地図"
      />
      <FooterButton
        href="/timetable"
        icon={<AiOutlineSchedule className="text-2xl" />}
        text="時刻表"
      />
      <FooterButton
        href="/info"
        icon={<IoInformationCircleOutline className="text-2xl" />}
        text="バス情報"
      />
    </Center>
  );
}
