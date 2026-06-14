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
      <Box>
        <Heading size={"2xl"}>利用の際の諸注意</Heading>
        <Stack padding={"3"}>
          <Box>
            <HStack gap={"2"}>
              <BsCaretRightFill size={"16"} />
              <Box>
                <div>天候や道路状況などにより、遅れることがあります</div>
              </Box>
            </HStack>
          </Box>
          <Box>
            <HStack gap={"2"}>
              <BsCaretRightFill size={"18"} />
              <Box>
                <div>
                  安全な運行ができないときは運行を取りやめる場合があります
                </div>
              </Box>
            </HStack>
          </Box>
          <Box>
            <HStack gap={"2"}>
              <BsCaretRightFill size={"16"} />
              <Box>
                <div>乗車定員は8名です。定員を超えての乗車はできません</div>
              </Box>
            </HStack>
          </Box>
          <Box>
            <HStack gap={"2"}>
              <BsCaretRightFill size={"12"} />
              <Box>
                <div>予約はできませんので、ご注意ください</div>
              </Box>
            </HStack>
          </Box>
          <Box>
            <HStack gap={"2"}>
              <BsCaretRightFill size={"10"} />
              <Box>
                <div>運転士は乗降の介助ができません</div>
              </Box>
            </HStack>
          </Box>
          <Box>
            <HStack gap={"2"}>
              <BsCaretRightFill size={"10"} />
              <Box>
                <div>大きな荷物は載せられません</div>
              </Box>
            </HStack>
          </Box>
          <Box>
            <HStack gap={"2"}>
              <BsCaretRightFill size={"15"} />
              <Box>
                <div>点検などの理由で違う車両で運行する場合があります</div>
              </Box>
            </HStack>
          </Box>
          <Box>
            <HStack gap={"2"}>
              <BsCaretRightFill size={"16"} />
              <Box>
                <div>
                  詳しい運行状況については白市交通へお問い合わせください
                </div>
              </Box>
            </HStack>
          </Box>
          <Separator my={"4"} />
          <Box
            padding={"3"}
            outline={"solid 2px"}
            outlineColor={"gray.200"}
            borderRadius={"2xl"}
            boxShadow={"lg"}
          >
            <Box fontWeight={"bold"}>【運行事業者】</Box>
            <Box paddingY={"3"}>白石交通 tel: 082-434-0408</Box>
            <Box fontWeight={"bold"}>【運行主体】</Box>
            <Box paddingY={"3"}>小谷小学校区おまるめ山バス運営協議会</Box>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
