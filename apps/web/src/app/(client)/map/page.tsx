"use client";

import { DropdownMenu } from "@/components/DropdownMenu";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

export default function Page() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/features/map/RouteMap'),
    {
      loading: () => <p>マップを読み込み中です</p>,
      ssr: false
    }
  ), [])

  const [displayTag, setDisplayTag] = useState<string[]>(["todayRoute"]);

  return (
    <div className="w-full h-full">
      <div className="flex gap-2 py-2 mx-3">
        <DropdownMenu
          items={[
            { label: "今日の運行ルート", value: "todayRoute" },
            { label: "明日の運行ルート", value: "tomorrowRoute" }
          ]}
          size={{ width: "100%", height: "100%" }}
          value={displayTag}
          onValueChange={setDisplayTag}
          placeholder="表示したい項目を選んでください"
        />
        <button className="w-1/5 bg-emerald-400 rounded-2xl text-gray-50 font-semibold">更新</button>
      </div>
      <div className="flex items-center justify-center w-11/12 h-11/12 mx-auto p-3 rounded-2xl bg-gray-50">
        <Map position={[ 34.6271377, 133.1025034 ]} zoom={14} />
      </div>
    </div>
  );
}
