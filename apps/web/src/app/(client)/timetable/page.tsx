import { memo } from "react";
import { GetElements, GetStationByID } from "../action";
import TimeTable from "./ui/timetable";
import { sessionAction } from "@/app/(auth)/login/action/loginAction";

export default async function Page() {
  // ユーザーのセッション情報
  const session = await sessionAction();
  // ユーザーごとに登録されたバス停の情報
  const stations = await GetElements(Number(session?.user?.id));
  // ユーザーごとに登録されたバス停の情報を元に、出発駅の情報を取得
  const depatures = await Promise.all(stations.map(async (station) => {
    return await GetStationByID({ id: station.depart_station_id });
  }));
  // 出発駅の情報を元に、到着駅の情報を取得
  const arrivals = await Promise.all(stations.map(async (station) => {
    return await GetStationByID({ id: station.arrive_station_id });
  }));

  // 出発駅の情報と到着駅の情報を結合
  const timetable = stations.map((station, index) => {
    return {
      id: station.id,
      memo: station.memo,
      depart_station: {
        name: depatures[index].name,
        day: depatures[index].day,
        hour: depatures[index].hour,
        minute: depatures[index].minute,
        direction: depatures[index].direction,
      },
      arrive_station: {
        name: arrivals[index].name,
        day: arrivals[index].day,
        hour: arrivals[index].hour,
        minute: arrivals[index].minute,
        direction: arrivals[index].direction,
      },
    };
  });

  return (
    <TimeTable stations={timetable}/>
  );
}
