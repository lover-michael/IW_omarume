"use client";

import {
  Container,
  Box,
  Heading,
  Stack,
  Separator,
  HStack,
} from "@chakra-ui/react";
import {
  Bs1Square,
  Bs2Square,
  Bs3Square,
  Bs4Square,
  Bs5Square,
  BsCaretDownFill,
} from "react-icons/bs";

export function Guide2() {
  return (
    <Container h={"full"} w={"full"} centerContent={true}>
      <Box>
        <Stack gap={"3"}>
          <Heading size={"3xl"} fontWeight={"bold"}>
            乗り方ガイド
          </Heading>
          <Separator size={"lg"} />
          <Heading size={"xl"} fontWeight={"bold"}>
            <Stack>
              <Bs1Square />
              バスを待つ
            </Stack>
          </Heading>
          <Box
            outline={"solid 2px"}
            outlineColor={"gray.400"}
            padding={"3"}
            borderRadius={"2xl"}
          >
            <div>バス停がある区間:バス停近くの安全な場所で待つ</div>
            <div>
              フリー乗降区間:運行通路上の安全な場所で待ち、バスが見えてきたら手をあげて運転手に合図する
            </div>
          </Box>
          <Heading size={"xl"} fontWeight={"bold"}>
            <Stack>
              <Bs2Square />
              バスが停まって、スライドドアが開いたら乗る
            </Stack>
          </Heading>
          <Heading size={"xl"} fontWeight={"bold"}>
            <Stack>
              <Bs3Square />
              乗車時に運転士に運賃を払い、降りたい場所を伝える
            </Stack>
          </Heading>
          <Box
            outline={"solid 2px"}
            outlineColor={"gray.400"}
            padding={"3"}
            borderRadius={"2xl"}
          >
            バス停名が分からない場合も、「○○集会所の近くまで」などとお伝えください
          </Box>
          <Heading size={"xl"} fontWeight={"bold"}>
            <Stack>
              <Bs4Square />
              降りる場所が近づいたら、運転士に声をかける
            </Stack>
          </Heading>
          <Box
            outline={"solid 2px"}
            outlineColor={"gray.400"}
            padding={"3"}
            borderRadius={"2xl"}
          >
            <div>例)</div>
            乗車時：「○○集会所の近くまで」
            <BsCaretDownFill />
            <div>降車時：「集会所を過ぎたところで降ろして」</div>
            <div>また、車内に降車ボタンは無いのでお声がけください </div>
          </Box>
          <Heading size={"xl"} fontWeight={"bold"}>
            <Stack>
              <Bs5Square />
              バスが完全に停まってから席を立ち、スライドドアが開いたら降りる
            </Stack>
          </Heading>
        </Stack>
      </Box>
    </Container>
  );
}
