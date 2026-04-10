'use client';

import { Stack, Card, Heading, Flex, Button, Collapsible, Box, Dialog } from '@chakra-ui/react';
import { Test } from './userSchema';
import { IoIosArrowForward } from 'react-icons/io';
import { GetElements, GetStationByID } from '../action';
import { Center } from 'chakra-ui';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { BiSolidDetail } from 'react-icons/bi';
import styles from '@/app/timetable/myCSS/style.module.css';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';
import { string } from 'zod/v4-mini';
import { StringValidation } from 'zod';

// timetableに沿った型
export type TimeTableCard = {
  id: number;
  create_at: Date;
  memo: string | null;
  depart_station_id: number;
  arrive_station_id: number;
};
//
type Station = {
  id: number;
  create_at: Date;
  name: string;
  day: string;
  hour: string;
  minute: string;
  direction: string;
}

function HandleRow() {
  return (
    <Flex gap={'2.5'}>
      <Button color={'red'}>削除</Button>
      <Button color={'bg'}>編集</Button>
    </Flex>
  );
}

export function Card_layout( element: TimeTableCard ) {
  const [open, setOpen] = useState(false);
  //出発駅の情報
  const [depart_station, setDepart_station] = useState<Station[]>([]);
  //下車駅の情報
  const [arrive_station, setArrive_station] = useState<Station[]>([]);
  
  useEffect(() => {
    const getStation = async () => {
      const res_depart = await GetStationByID({id: element.depart_station_id});
      const res_arrive = await GetStationByID({id: element.arrive_station_id});

      setDepart_station(res_depart);
      setArrive_station(res_arrive);
    }
    getStation();
  }, [])

  return (
    <Card.Root size={'md'}>
      <Card.Header
        style={{
          fontWeight: 'bold',
          fontSize: '1.2rem',
          height: '30px',
          position: 'relative',
          top: '-10px',
        }}
      >
        {element.memo}
      </Card.Header>
      <Card.Body boxSize={'xm'}>
        <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Collapsible.Trigger>
            <Box style={{ position: 'relative', left: '40px' }}>
              <Flex gap={'8'}>
                <Box style={{ fontWeight: 'bold' }}>
                  <Stack rowGap={'-0.5'}>
                    <div>出発</div>
                    <div style={{ fontSize: '30px' }}>
                      {depart_station.at(0)?.hour}:{depart_station.at(0)?.minute}
                    </div>
                    <div>{depart_station.at(0)?.name}</div>
                  </Stack>
                </Box>
                <FaArrowRight style={{ fontSize: '30px', alignSelf: 'center' }} />
                <Box style={{ fontWeight: 'bold' }}>
                  <Stack rowGap={'-0.5'}>
                    <div>到着</div>
                    <div style={{ fontSize: '30px' }}>
                      {arrive_station.at(0)?.hour}:{arrive_station.at(0)?.minute}
                    </div>
                    <div>{arrive_station.at(0)?.name}</div>
                  </Stack>
                </Box>
              </Flex>
            </Box>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Box style={{ position: 'relative', left: '170px', top: '10px', height: '50px' }}>
              <HandleRow />
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Card.Body>
    </Card.Root>
  );
}
