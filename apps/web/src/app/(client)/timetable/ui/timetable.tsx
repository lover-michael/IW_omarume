"use client";

import {
  Flex,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CardTimetable } from "@/components/Card.Timetable";
import { ButtonLink } from "@/components/button/Button.Link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { DropdownMenu } from "@/components/DropdownMenu";

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
      <Flex gap={2} height={'1/20'}>
        <DropdownMenu
          items={[
            { label: "マイ時刻表", value: "mytimetable" },
            { label: "標準時刻表", value: "timetable" }]}
          size={{ width: '100%', height: '100%' }}
          value={displaytag}
          onValueChange={setDisplaytag}
          placeholder="表示したい項目を選んでください"
        />
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
