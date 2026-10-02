"use client";

import { FaAnglesLeft } from "react-icons/fa6";
import { Guide1 } from "@/contents/guide1";
import { Guide2 } from "@/contents/guide2";
import { Guide3 } from "@/contents/guide3";
import React from "react";
import { ButtonLink } from "@/components/button/Button.Link";

export default function GuidePage({
  params,
}: {
  params: Promise<{ guideId: string }>;
}) {
  const { guideId } = React.use(params);
  return (
    <div className="w-full min-h-fit flex flex-col p-4 gap-2">
      <ButtonLink href="/info">
        <FaAnglesLeft className="text-3xl w-full" />
      </ButtonLink>
      <div className="w-full bg-white rounded-2xl">
        {
          guideId === '1' ? <Guide1 /> :
          guideId === '2' ? <Guide2 /> :
          guideId === '3' ? <Guide3 /> : <></>
        }
      </div>
    </div>
  );
}
