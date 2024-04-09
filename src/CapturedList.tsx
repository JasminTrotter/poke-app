import {
  Box,
  Stack,
  Image,
} from '@chakra-ui/react';
import { Pokemon } from './types/pokemon';

type CapturedListProps = {
  captured: Pokemon[]
  removeCapture: (e: any) => void
}

function CapturedList({ captured, removeCapture }: CapturedListProps) {
  return (
    <Stack
      borderWidth={6}
      rounded='xl'
      borderColor='red.800'
      p={4}
      bg='#CE302A'
      spacing={2}
      pos='relative'
      left='-4px'
    >
      {captured.map((c: Pokemon, i: number) => <Box bg='gray.100' rounded='lg' key={i}>
        <Image as='input' type='image' src={c.image} value={i} onClick={removeCapture} />
      </Box>)}
    </Stack>
  );
}

export default CapturedList;
