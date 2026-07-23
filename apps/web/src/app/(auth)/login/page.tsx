"use client";

import {
  Box,
  Center,
  Input,
  Stack,
  Button,
  Field,
  Separator,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { AuthPropsType, AuthProps } from "./component/module/type";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useRouter } from "next/navigation";
import { loginAction } from "./component/action/loginAction";
import { FaCheck } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

export default function LoginPage() {
  const router = useRouter();
  // 認証エラーの場合のエラーメッセージを格納する
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginResult, setLoginResult] = useState<number | null>(null);
  // react-hook-formでformを一元的に管理
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // フォームの状態を取得
  } = useForm<AuthPropsType>({
    resolver: zodResolver(AuthProps),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (props: AuthPropsType) => {
    const formData = new FormData();

    formData.append("username", props.userName);
    formData.append("password", props.password);

    const result = await loginAction(formData);

    if (result?.error) {
      setLoginResult(0);
      setAuthError("ユーザー名またはパスワードが正しくありません");
      return;
    }
    // 認証に成功したらユーザーのページに飛ぶ
    setLoginResult(1);
    setAuthError(null);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <FormControl>
        <Box position={"absolute"} top={"30px"} w={"100%"}>
          <Center>
            <Stack gapY={"5"}>
              <Box fontSize={"3xl"} fontWeight={"bold"} textAlign={"center"}>
                ログイン画面
              </Box>
              <Separator size={"lg"} bgColor={"black"} />
              <Stack gapY={"3"}>
                <Box w={"100%"}>
                  <FormLabel htmlFor={"userName"}>ユーザー名</FormLabel>
                  <Input
                    id={"userName"}
                    {...register("userName")}
                    placeholder="ユーザー名を入力してください"
                    boxShadow={"md"}
                    width={"300px"}
                  />
                  {errors.userName && (
                    <Box color={"red.500"}>{errors.userName.message}</Box>
                  )}
                </Box>
                <Box w={"100%"}>
                  <FormLabel htmlFor={"email"}>メールアドレス</FormLabel>
                  <Input
                    id={"email"}
                    {...register("email")}
                    placeholder="メールアドレスを入力してください"
                    boxShadow={"md"}
                  />
                  {errors.email && (
                    <Box color={"red.500"}>{errors.email.message}</Box>
                  )}
                </Box>
                <Box w={"100%"}>
                  <FormLabel htmlFor={"password"}>パスワード</FormLabel>
                  <Input
                    id={"password"}
                    {...register("password")}
                    placeholder="パスワードを入力してください"
                    boxShadow={"md"}
                  />
                  {errors.password && (
                    <Box color={"red.500"}>{errors.password.message}</Box>
                  )}
                </Box>
              </Stack>
              <Button
                bgColor={"green.500"}
                boxShadow={"xl"}
                borderRadius={"xl"}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "ログイン中..." : "ログイン"}
              </Button>

              <Button
                borderRadius={"xl"}
                boxShadow={"xl"}
                bgColor={"orange.400"}
                color={"white"}
                disabled={isSubmitting}
                asChild
              >
                <a href="/login/signup">新規登録</a>
              </Button>
            </Stack>
          </Center>
        </Box>
      </FormControl>
      {(loginResult === 1 || loginResult === 0) && (
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
          bgColor={loginResult === 1 ? "green.500" : "red.500"}
        >
          <HStack gap={"5"} textAlign={"center"}>
            {loginResult === 1 ? <FaCheck /> : <MdErrorOutline />}
            {authError === null ? "ログイン成功" : authError}
          </HStack>
        </Box>
      )}
    </form>
  );
}
