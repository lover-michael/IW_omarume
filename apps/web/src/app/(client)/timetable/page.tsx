"use client";

import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Container,
  Dialog,
  DialogActionTrigger,
  Field,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  NumberInput,
  Portal,
  RadioCard,
  RadioGroup,
  Select,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GetElements, GetStationByID } from "../action";
import { Card_layout, TimeTableCard } from "./print_element";
import { useSession } from "next-auth/react";

export default function PageTimeTable() {
  const ref = useRef<HTMLDivElement>(null);
  const [displaytag, setDisplaytag] = useState<string[]>(["timetable"]);
  const [mytimetables, setMytimetables] = useState<TimeTableCard[]>([]);
  const session = useSession();

  useEffect(() => {
    if (session?.data?.user === undefined) return;

    const getrecords = async () => {
      // 初回ロード時にテーブルを直に引っ張ってくる
      const responce = await GetElements(Number(session?.data?.user?.id));
      // レスポンスをmytimetablesに格納する
      setMytimetables(responce);
    };

    getrecords();
  }, []);

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
          <Button colorPalette={"green"} disabled={mytimetables.length >= 10}>
            新規登録
          </Button>
        </Link>
      </Flex>
      <div>
        {displaytag[0] === "mytimetable" ? (
          <Stack gap="3">
            {mytimetables.map((e) => {
              return (
                <Card_layout
                  id={e.id}
                  create_at={e.create_at}
                  memo={e.memo}
                  depart_station_id={e.depart_station_id}
                  arrive_station_id={e.arrive_station_id}
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
