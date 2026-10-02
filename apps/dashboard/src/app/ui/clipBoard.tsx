"use client"

import { Log, useLog, useLogDispatch } from "@/contexts/logContext";
import { Box, Button, Card, HStack, Stack, Separator } from "@chakra-ui/react";
import { FaCircleInfo, FaCircleExclamation, FaCircleXmark } from "react-icons/fa6";

export default function ClipBoard() {
  const logs = useLog().length < 4 ? useLog() : useLog().slice(-4);
  const dispatch = useLogDispatch();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-2 max-h-60vh">
        {
          logs.length > 0 ? logs.map((log) => {
            return <ClipBoardItem message={log.message} level={log.level} timestamp={log.timestamp} />
          }) : <Box>No logs</Box>
        }
      </div>
      <Separator size={'lg'} />
      <button className="bg-red-500 text-center text-white w-1/3 h-8 rounded-xl" onClick={() => dispatch({ type: "clear" })}>
        clear
      </button>
    </div>
  );
}

function ClipBoardItem(log: Log) {
  const { message, level, timestamp } = log;
  return (
    <Card.Root>
      <Card.Header>
        <HStack>
          {level === "info" && <FaCircleInfo />}
          {level === "warn" && <FaCircleExclamation />}
          {level === "error" && <FaCircleXmark />}
          <Box fontWeight={'bold'} >{level}</Box>
          <Box>time: {timestamp}</Box>
        </HStack>
      </Card.Header>
      <Card.Body>
        {message}
      </Card.Body>
    </Card.Root>
  )
}
