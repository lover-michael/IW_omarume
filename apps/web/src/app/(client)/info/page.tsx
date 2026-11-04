"use client";

import { Box, Center, Container, HStack, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { FaBus, FaTriangleExclamation } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { InfoCardComponent } from "@/components/features/info/Card.Info";
import { DisplayPeople } from "@/components/features/info/Card.People";

export default function PageInfo() {
  return (
    <div className="w-full mt-5 flex flex-col gap-5 justify-center items-center">
      <DisplayPeople />
      <InfoCardComponent
        href="/info/1"
        title="バスの乗り方を確認する"
        subTitle="バス停がある場合"
        icon={<FaBus className="text-3xl text-blue-950"/>}
      />
      <InfoCardComponent
        href="/info/2"
        title="バスの乗り方を確認する"
        subTitle="フリー乗降区間の場合"
        icon={<FaBus className="text-3xl text-blue-950"/>}
      />
      <InfoCardComponent
        href="/info/3"
        title="注意事項を確認する"
        icon={<FaTriangleExclamation className="text-3xl text-blue-950"/>}
      />
    </div>
  );
}
