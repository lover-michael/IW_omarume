import { Box, Center, Spinner, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <svg className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></svg>
    </div>
  );
}
