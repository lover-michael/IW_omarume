'use client'

import { Box, Button, MenuTrigger, Stack, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";


export default function Sidebar() {
  const pathName = usePathname();

  return (
    <Box
      w={'200px'}
      bg={'gray'}
      position={'relative'}
      fontWeight={'bold'}
      boxShadow={'2xl'}
    >
      <Flex position={'absolute'} top={0} left={3} color={'white'} fontWeight={'extrabold'} fontSize={'3xl'}>
        <div>
          MENU
        </div>
      </Flex>
      <Stack position={'absolute'} top={50} w={'full'} gap={'0'}>
        <Link
          href={'/'}
        >
          <Box
            h={'40px'}
            w='full'
            py={'2'}
            textAlign={'center'}
            fontSize={'md'}
            bg={pathName === '/' ? 'blue.500' : 'transparent'}
            color={pathName === '/' ? 'white' : 'black'}
            boxShadow={pathName === '/' ? 'xl' : 'none'}
          >
            管理画面
          </Box>
        </Link>
        <Link
          href={'/stationInfo'}
        >
          <Box
            h={'40px'}
            w='full'
            py={'2'}
            textAlign={'center'}
            fontSize={'md'}
            bg={pathName === '/stationInfo' ? 'blue.500' : 'transparent'}
            color={pathName === '/stationInfo' ? 'white' : 'black'}
            boxShadow={pathName === '/stationInfo' ? 'xl' : 'none'}
          >
            時刻表情報
          </Box>
        </Link>
      </Stack>
    </Box>
  )
}
