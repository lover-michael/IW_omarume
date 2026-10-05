import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { Provider } from "@/components/provider";
import { Container, Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import type { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});
import '@/app/globals.css';


export const metadata: Metadata = {
  title: {
    default: "おまるめ山バス",
    template: "%s - おまるめ山バス",
  },
};

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${notoSansJP.className} antialiased items-center w-full flex flex-col`}
        suppressHydrationWarning
      >
        <Provider>
          <Container
            maxWidth="sm"
            minWidth="sm"
            h="dvh"
            px={0}
            bgColor={"gray.100"}
            display="flex"
            flexDir="column"
            position="relative"
          >
            <SessionProvider>
              <Header />
              <Box flex="1" overflowY="auto" alignSelf={'center'} w={'full'} >
                {children}
              </Box>
              <Footer />
            </SessionProvider>
          </Container>
        </Provider>
      </body>
    </html>
  );
}
