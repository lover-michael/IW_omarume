'use client';

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

const chakraCache = () => {
  const insertionPoint =
    typeof document !== 'undefined'
      ? (document.querySelector(
        'meta[name="emotion-insertion-point"]'
      ) as HTMLElement | null) ?? undefined
      : undefined;

  return createCache({ key: 'chakra', insertionPoint });
}

export function Provider({ children }: PropsWithChildren) {
  return (
    <CacheProvider value={chakraCache()}>
      <ChakraProvider value={defaultSystem} >{children}</ChakraProvider>
    </CacheProvider>
  );
}
