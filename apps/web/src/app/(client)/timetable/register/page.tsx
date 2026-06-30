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
  useListCollection,
  Combobox,
  Portal,
  Spinner,
  Span,
  useFilter,
  createListCollection,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { Controller, Form, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { FaSearch } from "react-icons/fa";
import { DayGroups } from "@/app/(client)/timetable/module/datas";
import { RoutesList } from "../module/locate";
import { TimeTableSchema, TimeTableFormType } from "../module/formTypes";
import { GetStations } from "./action";
import { useEffect } from "react";
import { UserStationGroup } from "../module/class";
import Candidates from "../module/components";
import { SaveTimeTable } from "./action";
import { User } from "../../page";
import { sessionAction } from "@/app/(auth)/login/component/action/loginAction";

export default function PageRegister() {
  const ref = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  /*搭乗バスの候補探しに使用*/
  /// 選択された日付
  const [day, setDay] = useState<string | null>(null);
  /// 選択された路線
  const [itenrary, setItenrary] = useState<string | null>(null);
  /// DBから引っ張ってきたバス停の名前の格納先
  const [allStations, setAllStations] = useState<
    { id: number; label: string; value: string }[]
  >([]);
  /// ユーザーが選択した駅の組み合わせ
  const [userStationGroup, setUserStationGroup] = useState<UserStationGroup>(
    new UserStationGroup(null, null),
  );
  /// 入力候補(出発バス停用)
  const [inputStationName, setInputStationName] = useState<string>("");
  const { contains } = useFilter({ sensitivity: "base" });
  /// 入力候補(到着バス停)
  const [inputStationNameArrive, setInputStationNameArrive] =
    useState<string>("");
  const { contains: containsArrive } = useFilter({ sensitivity: "base" });
  /// fetch待機用
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*Form用*/
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<TimeTableFormType>({
    resolver: zodResolver(TimeTableSchema),
  });

  useEffect(() => {
    const fetchSession = async () => {
      const session = await sessionAction();
      if (!session) return;
      setUser({
        id: Number(session?.user?.id),
        name: session?.user?.name,
        email: session?.user?.email,
      });
    };

    const getStationName = async () => {
      const result = await GetStations();
      setAllStations(result);
    };

    fetchSession();
    getStationName();

    // fetch("../../api/auth/[...nextauth]")
    //   .then((res) => res.json())
    //   .then(({ user }) => setUser(user));
  }, []);

  // allStations もしくは inputStationName どちらかが変更されると再生成する
  const collection = useMemo(
    () =>
      createListCollection({
        items: allStations.filter((station) =>
          contains(station.label, inputStationName ?? ""),
        ),
      }),
    [allStations, inputStationName],
  );

  const collectionArrive = useMemo(
    () =>
      createListCollection({
        items: allStations.filter((station) =>
          containsArrive(station.label, inputStationNameArrive ?? ""),
        ),
      }),
    [allStations, inputStationNameArrive],
  );

  /// フォームの送信処理
  const onSubmit = async (props: TimeTableFormType) => {
    console.log({ ...props, user_id: Number(user?.id) });
    setIsLoading(true);
    try {
      /// DBにデータをPOST
      await SaveTimeTable({
        ...props,
        user_id: Number(user?.id),
      });
    } catch (error) {
      /// POSTに失敗したらログに表示
      console.log(error);
    } finally {
      /// 処理が終了したらローディングを停止
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: "100%", width: "100%", position: "relative" }}
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
          <Box py={"5px"} mx={"10px"}>
            <Combobox.Root
              collection={collection}
              onInputValueChange={(e) => {
                setInputStationName(e.inputValue ?? ""); // Nullガード
              }}
              onValueChange={(e) => {
                userStationGroup.depart = e.value[0];
              }}
              width={"100%"}
            >
              <Combobox.Label>搭乗するバス停</Combobox.Label>
              <Combobox.Control>
                <Combobox.Input
                  boxShadow={"md"}
                  placeholder="バス停の名前を入力してください"
                />
                <Combobox.IndicatorGroup>
                  <Combobox.ClearTrigger />
                  <Combobox.Trigger />
                </Combobox.IndicatorGroup>
              </Combobox.Control>
              <Portal>
                <Combobox.Positioner>
                  <Combobox.Content>
                    {collection.items.length === 0 ? (
                      <Combobox.Empty>候補が見つかりません</Combobox.Empty>
                    ) : (
                      collection.items.map((item) => (
                        <Combobox.Item item={item} key={item.id}>
                          {item.label}
                          <Combobox.ItemIndicator />
                        </Combobox.Item>
                      ))
                    )}
                  </Combobox.Content>
                </Combobox.Positioner>
              </Portal>
            </Combobox.Root>
          </Box>
          <Box py={"5px"} mx={"10px"}>
            <Combobox.Root
              collection={collectionArrive}
              onInputValueChange={(e) => {
                setInputStationNameArrive(e.inputValue ?? ""); // Nullガード
              }}
              onValueChange={(e) => {
                userStationGroup.arrive = e.value[0];
              }}
              width={"100%"}
            >
              <Combobox.Label>下車するバス停</Combobox.Label>
              <Combobox.Control>
                <Combobox.Input
                  boxShadow={"md"}
                  placeholder="バス停の名前を入力してください"
                />
                <Combobox.IndicatorGroup>
                  <Combobox.ClearTrigger />
                  <Combobox.Trigger />
                </Combobox.IndicatorGroup>
              </Combobox.Control>
              <Portal>
                <Combobox.Positioner>
                  <Combobox.Content>
                    {collectionArrive.items.length === 0 ? (
                      <Combobox.Empty>候補が見つかりません</Combobox.Empty>
                    ) : (
                      collectionArrive.items.map((item) => (
                        <Combobox.Item item={item} key={item.id}>
                          {item.label}
                          <Combobox.ItemIndicator />
                        </Combobox.Item>
                      ))
                    )}
                  </Combobox.Content>
                </Combobox.Positioner>
              </Portal>
            </Combobox.Root>
          </Box>
          <Box py={"5px"} mx={"10px"}>
            <Button
              w={"100%"}
              bgColor={"green.500"}
              onClick={() => setIsSearched(!isSearched)}
              disabled={isLoading}
            >
              <FaSearch /> 検索
            </Button>
            {isSearched && (
              <Controller
                name="stations"
                control={control}
                render={({ field }) => (
                  <Candidates
                    depart={
                      userStationGroup.depart === null
                        ? ""
                        : userStationGroup.depart
                    }
                    arrive={
                      userStationGroup.arrive === null
                        ? ""
                        : userStationGroup.arrive
                    }
                    day={day === null ? "" : day}
                    direction={itenrary === null ? "" : itenrary}
                    OnSelectChanged={field.onChange}
                  />
                )}
              />
            )}
          </Box>
        </Box>
      </FormControl>
      <Center position={"absolute"} bottom={"10px"} left={"auto"} w={"full"}>
        <Button
          type="submit"
          w={"80%"}
          disabled={isLoading}
          bgColor={"green.500"}
          boxShadow={"lg"}
          onClick={() => {
            console.log("submit");
          }}
        >
          {isLoading ? "登録中..." : "登録"}
        </Button>
      </Center>
    </form>
  );
}
