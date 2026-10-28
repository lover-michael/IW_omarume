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
    <div className="w-full h-full">
      <Map position={[ 34.6271377, 133.1025034 ]} zoom={13} />
    </div>
  );
}
