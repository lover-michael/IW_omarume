'use client';

import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { useState } from "react";

const chakraCache = () => {
  const insertionPoint =
    typeof document !== 'undefined'
      ? (document.querySelector(
        'meta[name="emotion-insertion-point"]'
      ) as HTMLElement | null) ?? undefined
      : undefined;

  return createCache({ key: 'chakra', insertionPoint });
}

const system = createSystem(defaultConfig, {
  cssVarsRoot: ":host, :root",
});


export function Provider({ children }: PropsWithChildren) {
  const [cache] = useState(() => chakraCache());

  return (
    <CacheProvider value={cache}>
      <ChakraProvider value={system}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
