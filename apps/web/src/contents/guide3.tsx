"use client";

import {
  Container,
  Box,
  Heading,
  Stack,
  Separator,
  HStack,
} from "@chakra-ui/react";
import { BsChevronDoubleRight, BsCaretRightFill } from "react-icons/bs";

export function Guide3() {
  return (
    <Container h={"full"} w={"full"} centerContent={true}>
      <div className="p-3">
        <div className="font-bold text-2xl">利用の際の諸注意</div>
        <div className="p-2 grid grid-cols-1 gap-4 my-5">
          <section className="flex gap-2 items-center">
            <BsCaretRightFill className="w-1/10 text-xl" />
            <div className="w-9/10 px-2">天候や道路状況などにより、遅れることがあります</div>
          </section>
          <section className="flex gap-2 items-center">
            <BsCaretRightFill className="w-1/10 text-xl" />
            <div className="w-9/10 px-2">安全な運行ができないときは運行を取りやめる場合があります</div>
          </section>
          <section className="flex gap-2 items-center">
            <BsCaretRightFill className="w-1/10 text-xl" />
            <div className="w-9/10 px-2">乗車定員は8名です。定員を超えての乗車はできません</div>
          </section>
          <section className="flex gap-2 items-center">
            <BsCaretRightFill className="w-1/10 text-xl" />
            <div className="w-9/10 px-2">予約はできませんので、ご注意ください</div>
          </section>
          <section className="flex gap-2 items-center">
            <BsCaretRightFill className="w-1/10 text-xl" />
            <div className="w-9/10 px-2">運転士は乗降の介助ができません</div>
          </section>
          <section className="flex gap-2 items-center">
            <BsCaretRightFill className="w-1/10 text-xl" />
            <div className="w-9/10 px-2">大きな荷物は載せられません</div>
          </section>
          <section className="flex gap-2 items-center">
            <BsCaretRightFill className="w-1/10 text-xl" />
            <div className="w-9/10 px-2">点検などの理由で違う車両で運行する場合があります</div>
          </section>
          <section className="flex gap-2 items-center">
            <BsCaretRightFill className="w-1/10 text-xl" />
            <div className="w-9/10 px-2">詳しい運行状況については白市交通へお問い合わせください</div>
          </section>
        </div>
        <div className="p-3 bg-white border-2 border-gray-400 rounded-xl shadow-2xl">
          <div>【運行事業者】</div>
          <div className="text-center my-2">白石交通 tel: 082-434-0408</div>
          <div>【運行主体】</div>
          <div className="text-center my-2">
            小谷小学校区<br />
            おまるめ山バス運営協議会
          </div>
        </div>
      </div>
    </Container>
  );
}
