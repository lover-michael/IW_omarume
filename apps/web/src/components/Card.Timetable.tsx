'use client';

import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

type CardTimetableProps = {
  key: number;
  title: string | null;        // 時刻表の目的
  a_time: { hour: string; minute: string }; // 到着時刻
  d_time: { hour: string; minute: string }; // 出発時刻
  a_place: string;      // 到着地点
  d_place: string;      // 出発地点
};

function formatTime({ which, time, place }: { which: string; time: { hour: string; minute: string }; place: string }): React.ReactNode {
  return (
    <div className="flex flex-col gap-0.5 text-center bg-blue-50 rounded-2xl p-2">
      <div className="text-md">{which}</div>
      <span className="text-3xl">{time.hour}:{time.minute}</span>
      <div className="text-xl">{place}</div>
    </div>
  )
}

export const CardTimetable = ({ title = "", a_time, d_time, a_place, d_place }: CardTimetableProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-9/10 m-2 bg-white rounded-2xl shadow-md overflow-hidden">
      <div
        className="flex flex-col gap-2 font-bold p-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="text-3xl">{title}</div>
        <div className="flex gap-2 items-center" >
          <div className="flex-1">{formatTime({ which: "出発", time: d_time, place: d_place })}</div>
          <FaArrowRight className="text-2xl" />
          <div className="flex-1">{formatTime({ which: "到着", time: a_time, place: a_place })}</div>
        </div>
      </div>
      <div className={`grid transition-all duration-300 ease-in-out ${
                expanded ? 'grid-rows-[10fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}>
        <div className="overflow-hidden min-h-fit">
          <div className="mx-2 p-2 text-gray-300 border-t-2 flex justify-end">
            <button
              className="mx-2 px-4.5 py-3 bg-red-500 rounded-2xl text-white"

            >削除</button>
          </div>
        </div>
      </div>
    </div>
  );
}
