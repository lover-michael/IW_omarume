import { Center, Box, Button, Flex, Stack } from "@chakra-ui/react";
import FileUpload from "./ui/fileUpload";
import ClipBoard from "./ui/clipBoard";

export default function Home() {
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
        my={'3'}
        height={'sm'}
        boxShadow={'xl'}
        borderRadius={'xl'}
        bgColor={'gray.100'}
        fontWeight={'bold'}
        fontSize={'2xl'}
      >
        Clip Board
        <ClipBoard />
      </Box>
      <Flex gap={'2'}>
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
          Master Account
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
        >
          <Box fontSize={'2xl'}>File Upload</Box>
          <FileUpload />
        </Box>
      </Flex>
    </Stack>
  )
}
