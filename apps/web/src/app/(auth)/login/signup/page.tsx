import { Center, Button, Stack, Input, Field, Box } from "@chakra-ui/react";

export default function Signup() {
  return (
    <Center h="full" w="full" p={"3"} position={"relative"}>
      <Stack gapY={"10"} position={"absolute"} top={"30px"}>
        <Box fontSize={"3xl"} fontWeight={"bold"}>
          新規登録
        </Box>
        <Field.Root required>
          <Field.Label>メールアドレス</Field.Label>
          <Input placeholder="Enter your email" boxShadow={"md"} />
        </Field.Root>
        <Field.Root required>
          <Field.Label>ユーザーネーム</Field.Label>
          <Input placeholder="Enter your email" boxShadow={"md"} />
        </Field.Root>
        <Field.Root>
          <Field.Label>パスワード</Field.Label>
          <Input placeholder="Enter your password" boxShadow={"md"} />
        </Field.Root>
        <Button bgColor={"green.500"} boxShadow={"md"}>
          <a href="/login">新規登録</a>
        </Button>
      </Stack>
    </Center>
  );
}
