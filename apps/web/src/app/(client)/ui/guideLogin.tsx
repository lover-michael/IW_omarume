"use client"

import { Button, Center } from "@chakra-ui/react"

export default function GuideLogin() {
  return (
    <Center h="full" w="full" p={"7"}>
      <Button asChild>
        <a href="/login">ログインはこちらから</a>
      </Button>
    </Center>
  )
}
