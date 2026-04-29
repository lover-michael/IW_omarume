"use client";

import {
  Separator,
  Box,
  Button,
  Input,
  RadioGroup,
  HStack,
  Stack,
  Center,
  useFilter,
  useListCollection,
  Combobox,
  Portal,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUpload } from "react-icons/fa";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { DayGroups } from "@/app/(client)/timetable/module/datas";
import { locates, RoutesList } from "../module/locate";
import { CgArrowDownR, CgArrowRightR } from "react-icons/cg";
import { onSubmit } from "./submit";
import { redirect } from "next/navigation";
import errorsToRecord from "@hookform/resolvers/io-ts/dist/errorsToRecord.js";
import { check } from "drizzle-orm/gel-core";
import { dataListAnatomy } from "@chakra-ui/react/anatomy";
import { TimeTableSchema, TimeTableSchemaType } from "../module/formTypes";
import { GetStations } from "./action";
import { useEffect } from "react";
import { UserStationGroup } from "../module/class";

export default function PageRegister() {
  const ref = useRef<HTMLDivElement>(null);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  /*搭乗バスの候補探しに使用*/
  /// 選択された日付
  const [day, setDay] = useState<string | null>(null);
  /// 選択された路線
  const [itenrary, setItenrary] = useState<string | null>(null);
  /// Comboboxの候補
  const [stationCollections, setStationCollections] = useState<
    { label: string; value: string }[]
  >([]);
  /// ユーザーが選択した駅の組み合わせ
  const [userStationGroup, setUserStationGroup] = useState<UserStationGroup>(
    new UserStationGroup(null, null),
  );
  /// 入力候補
  const { contains } = useFilter({ sensitivity: "base" });

  /*駅名の取得*/
  useEffect(() => {
    const fetchStations = async () => {
      const result = await GetStations();
      setStationCollections(result);
      console.log(result);
    };
    fetchStations();
  }, []);

  /*Form用*/
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TimeTableSchemaType>({
    resolver: zodResolver(TimeTableSchema),
  });

  /*Comboboxのフィルター及び候補の初期化*/
  const { collection, filter } = useListCollection({
    initialItems: stationCollections,
    filter: contains,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: "100%", width: "100%" }}
    >
      <FormControl gap={"10px"}>
        <Box p={"10px"} m={"auto"}>
          <Box
            fontSize={"3xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            p={"5px"}
          >
            マイ時刻表登録画面
          </Box>
          <Separator size={"lg"} bgColor={"black"} />
          <Box p={"10px"}>
            <FormLabel htmlFor={"memo"}>目的</FormLabel>
            <Input
              id={"memo"}
              {...register("memo")}
              placeholder={"ご自由にお書きください"}
              boxShadow={"md"}
              width={"full"}
            />
            {errors.memo && <Box color={"red.500"}>{errors.memo.message}</Box>}
          </Box>
          <Box py={"5px"} mx={"10px"}>
            <FormLabel htmlFor={"day"}>曜日</FormLabel>
            <RadioGroup.Root
              variant={"subtle"}
              colorPalette={"gray"}
              value={day}
              onValueChange={(e) => setDay(e.value)}
            >
              <HStack gap={"5"}>
                {DayGroups.map((item) => {
                  return (
                    <RadioGroup.Item key={item.value} value={item.value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  );
                })}
              </HStack>
            </RadioGroup.Root>
          </Box>
          <Box py={"5px"} mx={"10px"}>
            <FormLabel htmlFor={"itenrary"}>路線</FormLabel>
            <RadioGroup.Root
              variant={"subtle"}
              colorPalette={"gray"}
              value={itenrary}
              onValueChange={(e) => {
                setItenrary(e.value);
              }}
            >
              <HStack gap={"5"}>
                {RoutesList.map((item) => {
                  return (
                    <RadioGroup.Item key={item.value} value={item.value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  );
                })}
              </HStack>
            </RadioGroup.Root>
          </Box>
          <Box>
            <Combobox.Root
              collection={collection}
              onInputValueChange={(e) => filter(e.inputValue)}
              width={"100%"}
            >
              <Combobox.Label>搭乗するバス停</Combobox.Label>
              <Combobox.Control>
                <Combobox.Input placeholder="バス停の名前を入力してください" />
                <Combobox.IndicatorGroup>
                  <Combobox.ClearTrigger />
                  <Combobox.Trigger />
                </Combobox.IndicatorGroup>
              </Combobox.Control>
              <Portal>
                <Combobox.Positioner>
                  <Combobox.Content>
                    <Combobox.Empty>
                      該当するバス停が見つかりません
                    </Combobox.Empty>
                    {collection.items.map((item) => (
                      <Combobox.Item item={item} key={item.value}>
                        <Combobox.ItemText>{item.label}</Combobox.ItemText>
                      </Combobox.Item>
                    ))}
                  </Combobox.Content>
                </Combobox.Positioner>
              </Portal>
            </Combobox.Root>
          </Box>
        </Box>
      </FormControl>
    </form>
  );
}
