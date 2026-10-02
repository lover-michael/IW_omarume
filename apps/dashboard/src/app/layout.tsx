import { Provider } from '@/components/provider';
import { Box, Flex } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import { LogProvider } from '@/contexts/logContext';
import Sidebar from '@/components/Sidebar';
import './globals.css';


const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'おまるめ山バス',
    template: '%s - おまるめ山バス',
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='ja' suppressHydrationWarning>
      <body className={`${notoSansJP.className} antialiased`}>
        <Provider>
          <LogProvider>
            <Flex>
              <Sidebar />
              <Box flex={'1'} overflowY={'auto'}>
                {children}
              </Box>
            </Flex>
          </LogProvider>
        </Provider>
      </body>
    </html>
  );
}
