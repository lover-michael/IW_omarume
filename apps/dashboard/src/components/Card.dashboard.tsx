import { Box } from "@chakra-ui/react";


type CardDashboardProps = {
  title: string;
  children: React.ReactNode;
};

export function CardDashboard({ title, children }: CardDashboardProps) {
  return (
    <Box
      p={'3'}
      mx={'auto'}
      height={'sm'}
      boxShadow={'xl'}
      borderRadius={'xl'}
      bgColor={'gray.100'}
      fontWeight={'bold'}
      w={'90%'}
    >
      <Box fontSize={'2xl'}>{title}</Box>
      <Box w='full'>
        {children}
      </Box>
    </Box>
  );
}
