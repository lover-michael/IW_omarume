"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CreateCandidates,
  GetStations,
  UpdateTimeTable,
} from "../register/action";
import { STATION, TimeTableFormType, TimeTableSchema } from "./formTypes";
import {
  Box,
  RadioCard,
  Spinner,
  Stack,
  HStack,
  Button,
  createOverlay,
  Dialog,
  Portal,
  Flex,
  useFilter,
  createListCollection,
  Input,
  RadioGroup,
  Combobox,
  Center,
} from "@chakra-ui/react";
import { RxDoubleArrowRight } from "react-icons/rx";
import { DeleteTimeTable } from "../register/action";
import { AiFillAlert } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { title } from "process";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { DayGroups, RoutesList } from "./datas";
import { UserStationGroup } from "./class";
import { FaSearch } from "react-icons/fa";

type CandidatesProps = {
  depart: string;
  arrive: string;
  day: string;
  direction: string;
  OnSelectChanged: (stations: {
    depart_station_id: number;
    arrive_station_id: number;
  }) => void;
};

type STATIONS = {
  index: number;
  depart: STATION;
  arrive: STATION;
}[];

export default function Candidates(props: CandidatesProps) {
  const [candidates, setCandidates] = useState<STATIONS>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      const responce = await CreateCandidates({
        station: [{ name: props.depart }, { name: props.arrive }],
        day: props.day,
        direction: props.direction,
      });

      if (responce === null) {
        setError(new Error("Failed to fetch candidates"));
      } else {
        setCandidates(responce);
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [props.depart, props.arrive, props.day, props.direction]);

  return (
    <Box py={"10"}>
      {loading && <Spinner />}
      {error && <p>{error.message}</p>}
      {!loading && !error && (
        <RadioCard.Root boxShadow={"md"} w={"100%"} px={"3"}>
          <RadioCard.Label>保存したい時刻表を選択してください</RadioCard.Label>
          <Stack gap={"5"}>
            {candidates.map((element) => (
              <RadioCard.Item
                key={element.index}
                value={"候補" + element.index.toString()}
                onClick={() => {
                  props.OnSelectChanged({
                    depart_station_id: element.depart.id,
                    arrive_station_id: element.arrive.id,
                  });
                }}
              >
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemContent>
                    <RadioCard.ItemText>
                      <HStack gap={"2"}>
                        <Stack gapY={"3"}>
                          <Box fontWeight={"bold"} fontSize={"2xl"}>
                            {element.depart.name}
                          </Box>
                          <Box fontWeight={"bold"} fontSize={"1xl"}>
                            {element.depart.hour}:{element.depart.minute}
                          </Box>
                        </Stack>
                        <RxDoubleArrowRight />
                        <Stack gapY={"3"}>
                          <Box fontWeight={"bold"} fontSize={"2xl"}>
                            {element.arrive.name}
                          </Box>
                          <Box fontWeight={"bold"} fontSize={"1xl"}>
                            {element.arrive.hour}:{element.arrive.minute}
                          </Box>
                        </Stack>
                      </HStack>
                    </RadioCard.ItemText>
                  </RadioCard.ItemContent>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
            ))}
          </Stack>
        </RadioCard.Root>
      )}
    </Box>
  );
}

interface DialogProps {
  title?: React.ReactNode;
  description?: string;
  content?: React.ReactNode;
}

export const dialog = createOverlay<DialogProps>((props) => {
  const { title, description, content, ...rest } = props;
  return (
    <Dialog.Root
      placement={"center"}
      motionPreset={"slide-in-top"}
      size={"xs"}
      {...rest}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body>
              <Stack>
                {description && (
                  <Dialog.Description>{description}</Dialog.Description>
                )}
                {content}
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export function DeleteTimeTableButton({ id }: { id: number }) {
  // Delete the timetable and redirect to the current path
  const handleDelete = async () => {
    try {
      await DeleteTimeTable(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        bgColor={"red"}
        onClick={() => {
          dialog.open("a", {
            title: (
              <Box>
                <HStack>
                  <AiFillAlert />
                  <div>ATTENTION</div>
                </HStack>
              </Box>
            ),
            description: "本当に削除しますか？",
            content: (
              <Flex gap={"2"}>
                <Button onClick={handleDelete} bgColor={"red"}>
                  はい
                </Button>
                <Button onClick={() => dialog.close("a")} bgColor={"gray"}>
                  いいえ
                </Button>
              </Flex>
            ),
          });
        }}
      >
        削除
      </Button>
      <dialog.Viewport />
    </>
  );
}

export function UpdateTimeTableButton({ id }: { id: number }) {
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /// 選択された日付
  const [day, setDay] = useState<string | null>(null);
  /// 選択された路線
  const [itenrary, setItenrary] = useState<string | null>(null);
  /// DBから引っ張ってきたバス停の名前の格納先
  const [allStations, setAllStations] = useState<
    { id: number; label: string; value: string }[]
  >([]);
  /// 入力候補(出発バス停用)
  const [inputStationName, setInputStationName] = useState<string>("");
  const { contains } = useFilter({ sensitivity: "base" });
  /// 入力候補(到着バス停)
  const [inputStationNameArrive, setInputStationNameArrive] =
    useState<string>("");
  const { contains: containsArrive } = useFilter({ sensitivity: "base" });
  /// ユーザーが選択した駅の組み合わせ
  const [userStationGroup, setUserStationGroup] = useState<UserStationGroup>(
    new UserStationGroup(null, null),
  );

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
    const fetchAllStations = async () => {
      setIsLoading(true);
      try {
        const result = await GetStations();
        setAllStations(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        window.location.reload();
      }
    };

    fetchAllStations();
  }, []);

  const handleUpdate = async (props: TimeTableFormType) => {
    try {
      await UpdateTimeTable({ ...props, id: id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        bgColor={"green"}
        onClick={() => {
          dialog.open("a", {
            title: "updateTimeTable",
            content: (
              <form onSubmit={handleSubmit(handleUpdate)}>
                <FormControl>
                  <Stack gap={"2"}>
                    <Box>
                      <FormLabel htmlFor="memo">目的</FormLabel>
                      <Input
                        id="memo"
                        {...register("memo")}
                        placeholder="ご自由にお書きください"
                        boxShadow={"md"}
                        width={"full"}
                      />
                      {errors.memo && (
                        <Box color={"red.500"}>{errors.memo.message}</Box>
                      )}
                    </Box>
                    <Box py={"5px"} mx={"10px"}>
                      <FormLabel htmlFor="day">曜日</FormLabel>
                      <RadioGroup.Root
                        variant={"subtle"}
                        colorPalette={"gray"}
                        value={day}
                        onValueChange={(e) => setDay(e.value)}
                      >
                        <HStack gap={"5"}>
                          {DayGroups.map((item) => {
                            return (
                              <RadioGroup.Item
                                key={item.value}
                                value={item.value}
                              >
                                <RadioGroup.ItemHiddenInput />
                                <RadioGroup.ItemIndicator />
                                <RadioGroup.ItemText>
                                  {item.label}
                                </RadioGroup.ItemText>
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
                              <RadioGroup.Item
                                key={item.value}
                                value={item.value}
                              >
                                <RadioGroup.ItemHiddenInput />
                                <RadioGroup.ItemIndicator />
                                <RadioGroup.ItemText>
                                  {item.label}
                                </RadioGroup.ItemText>
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
                                <Combobox.Empty>
                                  候補が見つかりません
                                </Combobox.Empty>
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
                                <Combobox.Empty>
                                  候補が見つかりません
                                </Combobox.Empty>
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
                  </Stack>
                </FormControl>
                <Center padding={"5"} w={"full"}>
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
            ),
          });
        }}
      >
        更新
      </Button>
      <dialog.Viewport />
    </>
  );
}
