import { Center, Box, Button, Flex, Stack } from "@chakra-ui/react";
import { CardDashboard } from "../components/Card.dashboard";
import FileUpload from "./ui/fileUpload";
import ClipBoard from "./ui/clipBoard";

export default function Home() {
  return (
    <Stack h={'full'} w={'full'} gap={'3'} bgColor={'gray.100'}>
      <Box
        w={'full'}
        fontSize={'3xl'}
        fontWeight={'bold'}
        px={'3'}
        bgColor={'gray.100'}
      >
        DashBoard
      </Box>
      <CardDashboard title="Clip Board">
        <ClipBoard />
      </CardDashboard>
      <Flex gap={'2'} p={'3'} mx={'2'} my={'3'} w={'full'}>
        <Box w={'50%'}>
          <CardDashboard title="Master Account">
            <div></div>
          </CardDashboard>
        </Box>
        <Box w={'50%'}>
          <CardDashboard title="File Upload">
            <FileUpload />
          </CardDashboard>
        </Box>
      </Flex>
    </Stack>
  )
}
