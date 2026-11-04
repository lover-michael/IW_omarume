"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Page() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/features/map/RouteMap'),
    {
      loading: () => <p>マップを読み込み中です</p>,
      ssr: false
    }
  ), [])


  return (
    <div className="flex items-center justify-center w-11/12 h-11/12 mx-auto my-5 p-3 rounded-2xl bg-gray-50">
      <Map position={[ 34.6271377, 133.1025034 ]} zoom={14} />
    </div>
  );
}
