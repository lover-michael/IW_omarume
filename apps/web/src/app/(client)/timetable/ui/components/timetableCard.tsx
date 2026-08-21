"use client";

import {
  Stack,
  Card,
  Flex,
  Button,
  Collapsible,
  Box,
  Separator,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import {
  DeleteTimeTableButton,
  UpdateTimeTableButton,
} from "./timetableCandidates";

// timetableに沿った型
export type TimeTableCard = {
  id: number;
  create_at: Date;
  memo: string | null;
  depart_station_id: number;
  arrive_station_id: number;
};
//
type Station = {
  name: string;
  day: string;
  hour: string;
  minute: string;
  direction: string;
};

export function Card_layout(element: { timetable_id: number; depart_station: Station; arrive_station: Station; memo: string | null; }) {
  const [open, setOpen] = useState(false);
  //出発駅の情報
  const depart_station = element.depart_station;
  //下車駅の情報
  const arrive_station = element.arrive_station;
  //マイ時刻表の利用目的
  const memo = element.memo;

  return (
    <Card.Root size={"md"}>
      <Card.Header
        style={{
          fontWeight: "bold",
          fontSize: "1.6rem",
          height: "50px",
          paddingTop: "10px",
          paddingLeft: "20px",
        }}
      >
        {memo}
      </Card.Header>
      <Card.Body boxSize={"xm"}>
        <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Collapsible.Trigger>
            <Box>
              <Flex gap={"8"} position={"relative"}>
                <Box style={{ fontWeight: "bold", width: "100px" }}>
                  <Stack rowGap={"-0.5"}>
                    <div>出発</div>
                    <div style={{ fontSize: "30px" }}>
                      {depart_station?.hour}:{depart_station?.minute}
                    </div>
                    <div>{depart_station?.name}</div>
                  </Stack>
                </Box>
                <FaArrowRight
                  style={{
                    fontSize: "30px",
                    alignSelf: "center",
                  }}
                />
                <Box style={{ fontWeight: "bold", width: "100px" }}>
                  <Stack rowGap={"-0.5"}>
                    <div>到着</div>
                    <div style={{ fontSize: "30px" }}>
                      {arrive_station?.hour}:{arrive_station?.minute}
                    </div>
                    <div>{arrive_station?.name}</div>
                  </Stack>
                </Box>
              </Flex>
            </Box>
          </Collapsible.Trigger>
          <Collapsible.Content height={"auto"}>
            <Separator size={"lg"} my={"2"} />
            <Box
              style={{
                position: "relative",
                left: "160px",
              }}
            >
              <Flex gap={"2.5"} w="full">
                <DeleteTimeTableButton id={element.timetable_id} />
                {/*<UpdateTimeTableButton id={element.id} />*/}
                <Button colorPalette={"green"}>更新</Button>
              </Flex>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Card.Body>
    </Card.Root>
  );
}
