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

export const metadata: Metadata = {
  title: {
    default: "おまるめ山バス",
    template: "%s - おまるめ山バス",
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${notoSansJP.className} antialiased`}
        suppressHydrationWarning
      >
        <Provider>
          <Container
            maxWidth="sm"
            h="dvh"
            px={0}
            bgColor={"gray.100"}
            display="flex"
            flexDir="column"
            position="relative"
          >
            <SessionProvider>
              <Header />
              <Box flex="1" overflowY="auto">
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
