"use client";

import {
  Button,
  Flex,
  Input,
  Stack,
  Checkbox,
  Select,
  Portal,
  Center,
  Field,
  Fieldset,
  HStack,
  RadioGroup,
  GridItem,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { Test, userSchema } from "../userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUpload } from "react-icons/fa";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { DayGroups } from "@/app/timetable/module/datas";
import { locates } from "../module/locate";
import { CgArrowDownR, CgArrowRightR } from "react-icons/cg";
import { SaveTimeTable } from "@/app/action";
import { redirect } from "next/navigation";
import errorsToRecord from "@hookform/resolvers/io-ts/dist/errorsToRecord.js";
import { check } from "drizzle-orm/gel-core";
import { dataListAnatomy } from "@chakra-ui/react/anatomy";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const [searched, setSearched] = useState<boolean>(false);
  const { register, handleSubmit, control } = useForm<Test>({
    resolver: zodResolver(userSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async (data: Test) => {
        await SaveTimeTable(data, "/timetable/register");
        console.log(data);
        redirect("../timetable");
      })}
    >
      <FormControl>
        <Stack gap={10} p={"4"}>
          <div>
            {/* タイムテーブルの目的決定 */}
            <FormLabel htmlFor={"memo"}>目的</FormLabel>
            <Input type="text" id={"memo"} {...register("memo")} />
          </div>
          {/* 日付決定 */}

          <Field.Root>
            <Field.Label>曜日を選択してください</Field.Label>
            <Controller
              name="day"
              control={control}
              render={({ field }) => (
                <RadioGroup.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => {
                    field.onChange(value);
                  }}
                >
                  <HStack gap={"6"}>
                    {DayGroups.map((day) => (
                      <RadioGroup.Item key={day.value} value={day.value}>
                        <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>{day.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </HStack>
                </RadioGroup.Root>
              )}
            />
          </Field.Root>
          <Flex gap={"3"}>
            <Field.Root>
              <Field.Label>乗車駅</Field.Label>
              <Controller
                control={control}
                name="from"
                render={({ field }) => (
                  <Select.Root
                    collection={locates}
                    width={"revert-layer"}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select location" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal container={ref}>
                      <Select.Positioner>
                        <Select.Content>
                          {locates.items.map((e) => {
                            return (
                              <Select.Item item={e} key={e.value}>
                                {e.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            );
                          })}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
            </Field.Root>
            <Center>
              <CgArrowRightR size={"30"} />
            </Center>
            <Field.Root>
              <Field.Label>降車駅</Field.Label>
              <Controller
                control={control}
                name="to"
                render={({ field }) => (
                  <Select.Root
                    collection={locates}
                    width={"revert-layer"}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select location" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal container={ref}>
                      <Select.Positioner>
                        <Select.Content>
                          {locates.items.map((e) => {
                            return (
                              <Select.Item item={e} key={e.value}>
                                {e.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            );
                          })}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
            </Field.Root>
          </Flex>
        </Stack>
      </FormControl>
      <Stack gap={"3px"}>
        <Center>
          <Button
            width={"xs"}
            colorPalette={"green"}
            type="submit"
            onClick={() => {
              console.log("submit");
            }}
          >
            <FaUpload /> 新規登録
          </Button>
        </Center>
      </Stack>
    </form>
  );
}
