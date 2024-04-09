import {
  Box,
  Button,
  HStack,
  Stack,
  Image,
  Text,
  Badge,
  WrapItem,
  Wrap,
} from '@chakra-ui/react';
import { Pokemon } from './types/pokemon';

type SearchResultProps = {
  p: Pokemon | null
}

function SearchResult({ p }: SearchResultProps) {
  if (!p) return <></>;
  const makeTitleCase = (name: string) => name[0].toUpperCase() + name.slice(1);

  return (
    <Stack direction='row' spacing={4}>
      <Box>
        <Box bg='gray.100' rounded='lg'>
          <Image src={p.image} />
        </Box>
      </Box>
      <Stack>
        <Text color='white' fontSize='xl' fontWeight={600}>
          {makeTitleCase(p.name)}
        </Text>
        <Text color='white' fontSize='md' fontWeight={600}>
          {`#${p.id}`}
        </Text>
        <Text color='white'>Type</Text>
        {p.types.map((type, i) =>
          <Box key={i}>
            <Wrap>
              <WrapItem>
                <Badge borderWidth={3} rounded='md' borderColor='red.800'>
                  {type}
                </Badge>
              </WrapItem>
            </Wrap>
          </Box>
        )}
        <HStack color='white'>
          <Stack>
            <Text>HP</Text>
            <Text>{p.stats.hp}</Text>
          </Stack>
          <Stack>
            <Text>Attack</Text>
            <Text>{p.stats.attack}</Text>
          </Stack>
          <Stack>
            <Text>Defense</Text>
            <Text>{p.stats.defense}</Text>
          </Stack>
          <Stack>
            <Text>Speed</Text>
            <Text>{p.stats.speed}</Text>
          </Stack>
        </HStack>
      </Stack>
    </Stack>
  );
}

export default SearchResult;
