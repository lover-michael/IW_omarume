import { Provider } from "@/components/provider";
import { Container, Box, Center } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import type { PropsWithChildren } from "react";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "おまるめ山バス",
    template: "%s - おまるめ山バス",
  },
};

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSansJP.className} antialiased`}>
        <Provider>
          <Container
            maxWidth="sm"
            h="dvh"
            px="1"
            bgColor={"gray.100"}
            display="flex"
            flexDir="column"
          >
            <Center flex={"1"} overflowY={"auto"}>
              {children}
            </Center>
          </Container>
        </Provider>
      </body>
    </html>
  );
}
