import { Box, Center, Spinner, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box position={"relative"} aria-busy="true" userSelect={"none"}>
      <Text>Loading...</Text>
      <Box position={"absolute"} inset={"0"} bg={"bg/80"}>
        <Center h={"100%"}>
          <Spinner color={"teal.700"} />
        </Center>
      </Box>
    </Box>
  );
}
