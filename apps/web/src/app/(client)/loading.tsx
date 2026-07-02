import { Center, Box, Stack, Card } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center h="full" w="full" p={"7"}>
      <Box boxSize={"xl"}>
        <Stack gapY={"5"}>
          <Card.Root size={"lg"}>
            <Card.Body>
              <Card.Title>
                <Box textAlign={"center"}></Box>
              </Card.Title>
            </Card.Body>
          </Card.Root>
        </Stack>
      </Box>
    </Center>
  );
}
