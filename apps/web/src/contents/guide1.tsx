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
    <Container h={"full"} w={"full"} centerContent={true}>
      <Box>
        <Stack gap={"3"}>
          <Heading size={"3xl"} fontWeight={"bold"}>
            フリー乗降区間とは
          </Heading>
          <Separator size={"lg"} />
          <Heading size={"2xl"} fontWeight={"bold"}>
            <HStack>
              <BsChevronDoubleRight />
              <Box>
                <div>フリー乗降とは</div>
                <div>何ですか？</div>
              </Box>
            </HStack>
          </Heading>
          <Box
            outline={"solid 2px"}
            outlineColor={"gray.400"}
            padding={"3"}
            borderRadius={"2xl"}
          >
            バス停がなくても運行経路上で乗り降りできる便利な仕組みです。
          </Box>
          <Heading size={"2xl"} fontWeight={"bold"}>
            <HStack>
              <BsChevronDoubleRight />
              <Box>
                <div>フリー乗降は</div>
                <div>どこでできますか？</div>
              </Box>
            </HStack>
          </Heading>
          <Box
            outline={"solid 2px"}
            outlineColor={"gray.400"}
            padding={"3"}
            borderRadius={"2xl"}
          >
            地図に青い点線で示している区間のみです。ただし、交差点や横断歩道の近く、カーブや坂道で見通しの悪い場所などでは乗降できません。
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
