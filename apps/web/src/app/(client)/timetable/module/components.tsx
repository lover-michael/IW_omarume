"use client";

import { useEffect, useState } from "react";
import { CreateCandidates } from "../register/action";
import { STATION } from "./formTypes";
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
} from "@chakra-ui/react";
import { RxDoubleArrowRight } from "react-icons/rx";
import { DeleteTimeTable } from "../register/action";
import { AiFillAlert } from "react-icons/ai";

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
    await DeleteTimeTable(id);
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
              <Flex>
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
