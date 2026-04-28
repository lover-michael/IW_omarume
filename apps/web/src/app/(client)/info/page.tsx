"use client";

import { Box, Center, Container, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { FaBusSimple } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { FiAlertTriangle } from "react-icons/fi";

export default function PageInfo() {
  return (
    <Container h={"full"} w={"full"} centerContent={true}>
      <Stack gap={"3"} position={"absolute"} top={"20"} w={"80%"} mx={"auto"}>
        <Box bgColor={"white"} boxShadow={"sm"} borderRadius={"4px"} py={"3"}>
          {/*<Link to={ }></Link>*/}
          <Center gapX={"3"} fontWeight={"bold"}>
            <a href={"/info/1"}>
              <Box rounded={"2xl"} bgColor={"gray.muted"} padding={"2"}>
                <FaBusSimple size={"30px"} />
              </Box>
              <Stack gap={"0.5"}>
                <Box>バスの乗り方を確認する</Box>
                <Box
                  fontSize={"sm"}
                  bgColor={"blue.muted"}
                  px={"3"}
                  borderRadius={"3xl"}
                  m={"auto"}
                >
                  フリー乗降区間の場合
                </Box>
              </Stack>
              <IoIosArrowForward size={"30px"} />
            </a>
          </Center>
        </Box>
        <Box bgColor={"white"} boxShadow={"sm"} borderRadius={"4px"} py={"3"}>
          {/*<Link to={ }></Link>*/}
          <Center gapX={"3"} fontWeight={"bold"}>
            <a href={"/info/2"}>
              <Box rounded={"2xl"} bgColor={"gray.muted"} padding={"2"}>
                <FaBusSimple size={"30px"} />
              </Box>
              <Stack gap={"0.5"}>
                <Box>バスの乗り方を確認する</Box>
                <Box
                  fontSize={"sm"}
                  bgColor={"red.muted"}
                  px={"3"}
                  borderRadius={"3xl"}
                  m={"auto"}
                >
                  バス停がある場合
                </Box>
              </Stack>
              <IoIosArrowForward size={"30px"} />
            </a>
          </Center>
        </Box>
        <Box bgColor={"white"} boxShadow={"sm"} borderRadius={"4px"} py={"3"}>
          {/*<Link to={ }></Link>*/}
          <Center gapX={"3"} fontWeight={"bold"}>
            <a href={"/info/3"}>
              <Box rounded={"2xl"} bgColor={"gray.muted"} padding={"2"}>
                <FiAlertTriangle size={"30px"} />
              </Box>
              <Box>注意事項を確認する</Box>
              <IoIosArrowForward size={"30px"} />
            </a>
          </Center>
        </Box>
      </Stack>
    </Container>
  );
}
