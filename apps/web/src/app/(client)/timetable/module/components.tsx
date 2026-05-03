"use client";

import { useEffect, useState } from "react";
import { CreateCandidates } from "../register/action";
import { STATION, TimeTableSchemaType } from "./formTypes";
import { Box, RadioCard, Spinner, Stack, HStack } from "@chakra-ui/react";
import { RxDoubleArrowRight } from "react-icons/rx";

type CandidatesProps = {
  depart: string;
  arrive: string;
  day: string;
  direction: string;
  // OnSelectChanged: (timetable: {
  //   depart_station_id: number;
  //   arrive_station_id: number;
  // }) => void;
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
        <Stack gap={"5"}>
          {candidates.map((element) => (
            <RadioCard.Root boxShadow={"md"} w={"100%"} px={"3"}>
              <RadioCard.Label>
                {"候補" + (element.index + 1).toString()}
              </RadioCard.Label>
              <RadioCard.Item
                key={element.index}
                value={"候補" + element.index.toString()}
              >
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemContent>
                    <RadioCard.ItemText>
                      <HStack gap={"2"}>
                        <Stack gapY={"3"}>
                          <Box fontWeight={"bold"}>{element.depart.name}</Box>
                          <Box fontWeight={"bold"}>
                            {element.depart.hour}:{element.depart.minute}
                          </Box>
                        </Stack>
                        <RxDoubleArrowRight />
                        <Stack gapY={"3"}>
                          <Box fontWeight={"bold"}>{element.arrive.name}</Box>
                          <Box fontWeight={"bold"}>
                            {element.arrive.hour}:{element.arrive.minute}
                          </Box>
                        </Stack>
                      </HStack>
                    </RadioCard.ItemText>
                  </RadioCard.ItemContent>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
            </RadioCard.Root>
          ))}
        </Stack>
      )}
    </Box>
  );
}
