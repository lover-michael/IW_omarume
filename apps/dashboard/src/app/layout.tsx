import { Provider } from '@/components/provider';
import { Container } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import type { PropsWithChildren } from 'react';

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
          <Container maxWidth='xl' h='dvh' px={0} bgColor={'gray.100'}>
            {children}
          </Container>
        </Provider>
      </body>
    </html>
  );
}
