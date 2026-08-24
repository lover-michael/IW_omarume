"use client"

import { Log, useLog, useLogDispatch } from "@/contexts/logContext";
import { Box, Button, Card, HStack, Stack, Separator } from "@chakra-ui/react";
import { FaCircleInfo, FaCircleExclamation, FaCircleXmark } from "react-icons/fa6";

export default function ClipBoard() {
  const logs = useLog().length < 4 ? useLog() : useLog().slice(-4);
  const dispatch = useLogDispatch();

  return (
    <Stack fontSize={'xs'} position={'relative'}>
      {
        logs.map((log) => {
          return <ClipBoardItem message={log.message} level={log.level} timestamp={log.timestamp} />
        })
      }
      <Separator size={'lg'} />
      <Button
        bgColor={'red.500'}
        color={'white'}
        position={'absolute'}
        bottom={'-320px'}
        size={'sm'}
        width={'50%'}
        right={130}
        onClick={() => dispatch({ type: "clear" })}
      >
        clear
      </Button>
    </Stack>
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
