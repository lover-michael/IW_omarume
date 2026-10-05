"use client";

import {
  Container
} from "@chakra-ui/react";
import {
  BsCaretDownFill,
} from "react-icons/bs";
import { Fa1, Fa2, Fa3, Fa4, Fa5 } from "react-icons/fa6";


export function Guide2() {
  return (
    <Container h={"full"} w={"full"} centerContent={true}>
      <div className="p-3 flex flex-col gap-10">
        <div className="font-bold text-2xl">バスの乗り方ガイド</div>
        <div className="flex flex-col gap-2">
          <div className="font-bold flex border-b-2 border-b-black">
            <Fa1 className="text-2xl mt-1 w-1/10"/>
            <span className="ml-2 text-2xl pb-1 w-9/10">バスを待つ</span>
          </div>
          <div className="border-2 border-gray-300 rounded-2xl p-2">
            <section className="mt-3">
              <div className="border-b-2 border-b-black pb-3">
                <div className="font-bold bg-red-400 text-white w-fit py-1.5 px-2 rounded-2xl text-center">バス停がある区間</div>
                <div className="px-4 pt-2">バス停近くの安全な場所で待つ</div>
              </div>
            </section>
            <section className="my-3">
              <div className="font-bold bg-indigo-400 text-white w-fit py-1.5 px-2 rounded-2xl text-center">フリー乗降区間</div>
              <div className="px-4 pt-2">運行通路上の安全な場所で待ち、バスが見えてきたら手をあげて運転手に合図する</div>
            </section>
          </div>
        </div>
        <div className="font-bold flex border-b-2 border-b-black">
          <Fa2 className="text-2xl mt-1 w-1/10"/>
          <span className="ml-2 text-2xl pb-1 w-9/10">バスが停まって、スライドドアが開いたら乗る</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold flex border-b-2 border-b-black">
            <Fa3 className="text-2xl mt-1 w-1/10" />
            <span className="ml-2 text-2xl pb-1 w-9/10">乗車時に運転士に運賃を払い、降りたい場所を伝える</span>
          </div>
          <div className="border-2 border-gray-300 rounded-2xl p-3">
            バス停名が分からない場合も、<br /><br />
            「○○集会所の近くまで」<br /><br />
            などとお伝えください
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold flex border-b-2 border-b-black">
            <Fa4 className="text-2xl mt-1 w-1/10" />
            <span className="ml-2 text-2xl pb-1 w-9/10">降りる場所が近づいたら、運転士に声をかける</span>
          </div>
          <div className="border-2 border-gray-300 rounded-2xl p-3">
            <div>
              <div className="text-gray-500 bg-gray-200 w-fit px-3 py-1.5 -mt-1 rounded-2xl">例えば...</div>
              <div className="text-gray-700 border-b-2 border-b-gray-600 w-8/10 my-2 ps-2">乗車時</div>
              <div className="font-bold text-center">「○○集会所の近くまで」</div>
            </div>
            <BsCaretDownFill className="w-full text-2xl text-gray-400 mt-2"/>
            <div>
              <div className="text-gray-700 border-b-2 border-b-gray-600 w-8/10 mb-2 ps-2">降車時</div>
              <div className="font-bold text-center">「集会所を過ぎたところで降ろして」</div>
            </div>
            <div className="mt-5">また、車内に降車ボタンは無いのでお声がけください</div>
          </div>
        </div>
        <div className="font-bold flex border-b-2 border-b-black">
          <Fa5 className="text-2xl mt-1 w-1/10" />
          <span className="ml-2 text-2xl pb-1 w-9/10">バスが完全に停まってから席を立ち、スライドドアが開いたら降りる</span>
        </div>
      </div>
    </Container>
  );
}
