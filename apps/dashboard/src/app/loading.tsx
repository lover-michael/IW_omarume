import { Center, Box, Button, Flex, Stack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Stack h={'full'} w={'full'} gap={'3'} bgColor={'gray.100'}>
      <Box
        fontSize={'3xl'}
        fontWeight={'bold'}
        px={'3'}
        mx={'5'}
        bgColor={'gray.100'}
      >
        DashBoard
      </Box>
      <Box
        p={'3'}
        mx={'5'}
        height={'sm'}
        boxShadow={'xl'}
        borderRadius={'xl'}
        bgColor={'gray.100'}
        fontWeight={'bold'}
        fontSize={'2xl'}
      >

      </Box>
      <Flex gap={'5'}>
        <Box
          height={'2xs'}
          width={'sm'}
          borderRadius={'md'}
          boxShadow={'md'}
          marginLeft={'5'}
          px={'3'}
          py={'2'}
          fontWeight={'bold'}
          fontSize={'2xl'}
          bgColor={'gray.100'}
        >

        </Box>
        <Box
          height={'2xs'}
          width={'sm'}
          borderRadius={'md'}
          boxShadow={'md'}
          marginRight={'5'}
          px={'3'}
          py={'2'}
          fontWeight={'bold'}
          bgColor={'gray.100'}
          fontSize={'2xl'}
        >

        </Box>
      </Flex>
    </Stack>
  )
}
