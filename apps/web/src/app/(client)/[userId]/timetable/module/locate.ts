import { createListCollection } from "@chakra-ui/react";

export const locates = createListCollection({
  items: [
    { label: "LOCATE1", value: "locate1" },
    { label: "LOCATE2", value: "locate2" },
    { label: "LOCATE3", value: "locate3" },
    { label: "LOCATE4", value: "locate4" },
    { label: "LOCATE5", value: "locate5" },
  ],
});

export const RoutesList = [
  { label: "行き", value: "Outbound" },
  { label: "帰り", value: "Return" },
];
