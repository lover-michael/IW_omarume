"use client";

import {
  Container,
  Box,
  Heading,
  Stack,
  Separator,
  HStack,
} from "@chakra-ui/react";
import { BsChevronDoubleRight } from "react-icons/bs";

export function Guide1() {
  return (
    <div className="w-full max-h-screen p-2 flex flex-col gap-5">
      <div className="text-2xl font-bold w-full border-b-2 border-gray-300 pb-2">
        フリー乗降区間とは
      </div>
      <div className="flex flex-col gap-0.5 w-full pt-2">
        <div className="text-xl">・フリー乗降とは何ですか？</div>
        <section className="py-1 flex gap-2 items-center">
          <BsChevronDoubleRight className="text-2xl w-1/10" />
          <div className="w-9/10">バス停がなくても運行経路上で乗り降りできる便利な仕組みです。</div>
        </section>
      </div>
      <div className="flex flex-col gap-0.5 w-full pt-5">
        <div className="text-xl">・フリー乗降はどこでできますか？</div>
        <section className="py-1 flex gap-2 items-center">
          <BsChevronDoubleRight className="text-2xl w-1/10" />
          <div className="w-9/10">
            地図に青い点線で示している区間のみです。ただし、交差点や横断歩道の近く、<br />
            カーブや坂道で見通しの悪い場所などでは乗降できません。
          </div>
        </section>
      </div>
    </div>
  );
}
