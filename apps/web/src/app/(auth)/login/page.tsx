"use client";

import {
  Box,
  Center,
  Input,
  Stack,
  Button,
  Field,
  Separator,
} from "@chakra-ui/react";
import Link from "next/link";
import { onSubmit } from "./component/action/login";
import { AuthLoginPropsType, AuthLoginProps } from "./component/module/type";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

export default function LoginPage() {
  // react-hook-formでformを一元的に管理
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // フォームの状態を取得
  } = useForm<AuthLoginPropsType>({
    resolver: zodResolver(AuthLoginProps),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <FormControl>
        <Box position={"absolute"} top={"30px"} w={"full"}>
          <Center>
            <Stack gapY={"5"}>
              <Box fontSize={"3xl"} fontWeight={"bold"} textAlign={"center"}>
                ログイン画面
              </Box>
              <Separator size={"lg"} bgColor={"black"} />
              <Stack gapY={"3"}>
                <Box>
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
                <Box>
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
                <Box>
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
                as={"a"}
                href="/login/signup"
                borderRadius={"xl"}
                boxShadow={"xl"}
                bgColor={"orange.400"}
                color={"white"}
                disabled={isSubmitting}
              >
                新規登録
              </Button>
            </Stack>
          </Center>
        </Box>
      </FormControl>
    </form>
  );
}
