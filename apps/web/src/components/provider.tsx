"use client";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

const system = createSystem(defaultConfig, {
  cssVarsRoot: ":host, :root",
});

export function Provider({ children }: PropsWithChildren) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
