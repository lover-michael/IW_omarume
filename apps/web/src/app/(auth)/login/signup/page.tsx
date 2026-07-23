"use client";

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Center,
  Button,
  Stack,
  Input,
  Field,
  Box,
  Separator,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthPropsType, AuthProps } from "../component/module/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "../component/action/signup";
import { is } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

export default function Signup() {
  // 登録結果：0...なにもなし　1...登録成功　2...登録失敗
  const [signUpResult, setSignUpResult] = useState<number>(0);
  const [popUpStatus, setPopUpStatus] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthPropsType>({
    resolver: zodResolver(AuthProps),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (props: AuthPropsType) => {
    let result: number | null = null;

    try {
      result = await signup(props);
    } catch (error) {
      setSignUpResult(2);
      setPopUpStatus("DB操作中にエラーが起きました");
    } finally {
      if (result === null) {
        setSignUpResult(2);
        setPopUpStatus("すでに登録された情報です");
      } else if (result === 1) {
        setSignUpResult(result);
        setPopUpStatus("登録が完了しました");
      }
    }

    if (result === 1) {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <form
      style={{ width: "100%", height: "100%", position: "relative" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <Center h="100%" w="100%" p={"3"} position={"relative"}>
          <Stack gapY={"5"} position={"absolute"} top={"30px"}>
            <Box fontSize={"3xl"} fontWeight={"bold"} textAlign={"center"}>
              新規登録画面
            </Box>
            <Separator size={"lg"} bgColor={"black"} />
            <Box>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <Input
                id={"email"}
                {...register("email")}
                placeholder="メールアドレスを入力してください"
                boxShadow={"md"}
                width={"300"}
              />
              {errors.email && (
                <Box color={"red.500"}>{errors.email.message}</Box>
              )}
            </Box>
            <Box>
              <FormLabel htmlFor="userName">ユーザーネーム</FormLabel>
              <Input
                id={"userName"}
                {...register("userName")}
                placeholder="ユーザーネームを入力してください"
                boxShadow={"md"}
                width={"300"}
              />
              {errors.userName && (
                <Box color={"red.500"}>{errors.userName.message}</Box>
              )}
            </Box>
            <Box>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <Input
                id={"password"}
                {...register("password")}
                placeholder="パスワードを入力してください"
                boxShadow={"md"}
                width={"300"}
              />
              {errors.password && (
                <Box color={"red.500"}>{errors.password.message}</Box>
              )}
            </Box>
            <Button
              type="submit"
              bgColor={"green.500"}
              boxShadow={"md"}
              onClick={() => {
                console.log("submit");
              }}
              disabled={isSubmitting}
              width={"100%"}
            >
              {isSubmitting ? "登録中..." : "新規登録"}
            </Button>
          </Stack>
        </Center>
      </FormControl>

      {(signUpResult === 1 || signUpResult === 2) && (
        <Box
          position="absolute"
          fontWeight={"bold"}
          fontSize={"md"}
          boxShadow={"xl"}
          borderRadius={"xl"}
          bottom={"20px"}
          left={"50%"}
          transform={"translateX(-50%)"}
          width={"80%"}
          padding={"3"}
          bgColor={signUpResult === 1 ? "green.500" : "red.500"}
        >
          <HStack gap={"5"} textAlign={"center"}>
            {signUpResult === 1 ? <FaCheck /> : <MdErrorOutline />}
            {popUpStatus}
          </HStack>
        </Box>
      )}
    </form>
  );
}
