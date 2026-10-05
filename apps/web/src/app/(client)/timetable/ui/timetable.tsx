"use client";

import {
  Flex,
  Portal,
  Select,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CardTimetable } from "@/components/Card.Timetable";
import { ButtonLink } from "@/components/button/Button.Link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

type Station = {
  name: string;
  day: string;
  hour: string;
  minute: string;
  direction: string;
};

type TimeTableProps = {
  stations: { memo: string | null; id: number; depart_station: Station; arrive_station: Station }[];
};

export default function TimeTable({ stations }: TimeTableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displaytag, setDisplaytag] = useState<string[]>(["timetable"]);

  return (
    <Stack h="full" w="full" gap={2} p={"2"}>
      <Flex gap={2}>
        {/* 表示項目を変更するためのセレクトコンポーネント */}
        <Select.Root
          collection={displaySwitch}
          defaultValue={["timetable"]}
          value={displaytag}
          onValueChange={(e) => setDisplaytag(e.value)}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText
                color={"blackAlpha.700"}
                placeholder="表示したいものを選択"
              />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator color={"blackAlpha.700"} />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal container={ref}>
            <Select.Positioner>
              <Select.Content>
                {displaySwitch.items.map((e) => {
                  return (
                    <Select.Item item={e} key={e.value}>
                      <Text color={"black"}>{e.label}</Text>
                      <Select.ItemIndicator />
                    </Select.Item>
                  );
                })}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
        {/* ここまで */}
        <ButtonLink href="/timetable/register">
          <FaArrowUpRightFromSquare className="text-xl"/>
          <div className="text-sm">新規登録</div>
        </ButtonLink>
      </Flex>
      <div>
        {displaytag[0] === "mytimetable" ? (
          <Stack gap="3">
            {stations.map((e) => {
              return (
                <CardTimetable
                  key={e.id}
                  title={e.memo}
                  a_time={{ hour: e.arrive_station.hour, minute: e.arrive_station.minute }}
                  d_time={{ hour: e.depart_station.hour, minute: e.depart_station.minute }}
                  a_place={e.arrive_station.name}
                  d_place={e.depart_station.name}
                />
              );
            })}
          </Stack>
        ) : displaytag[0] === "timetable" ? (
          <div>timetable</div>
        ) : (
          <div>nothing</div>
        )}
      </div>
    </Stack>
  );
}

const displaySwitch = createListCollection({
  items: [
    { label: "マイ時刻表", value: "mytimetable" },
    { label: "標準時刻表", value: "timetable" },
  ],
});
