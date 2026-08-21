"use client";

import {
  Button,
  Flex,
  Portal,
  Select,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { Card_layout } from "./components/timetableCard";

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
        <Link href="/timetable/register">
          <Button colorPalette={"green"} disabled={stations.length >= 10}>
            新規登録
          </Button>
        </Link>
      </Flex>
      <div>
        {displaytag[0] === "mytimetable" ? (
          <Stack gap="3">
            {stations.map((e) => {
              return (
                <Card_layout
                  timetable_id={e.id}
                  depart_station={e.depart_station}
                  arrive_station={e.arrive_station}
                  memo={e.memo}
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
