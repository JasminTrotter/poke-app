import {
  Box,
  Button,
  HStack,
  Input,
  Stack,
  Text,
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import { formatSearchResponse } from './utils/formatSearchResponse';
import axios from 'axios';
import SearchResult from './SearchResult';
import CapturedList from './CapturedList';

import { Pokemon } from './types/pokemon';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchErrorMsg, setSearchErrorMsg] = useState('');
  const [captured, setCaptured] = useState<Pokemon[]>([]);

  const handleSearch = async () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.trim().toLowerCase()}`)
      .then(res => {
        // format so we'll only store the data we need to display
        const formattedResponse = formatSearchResponse(res.data);

        setPokemon(formattedResponse);
      }).catch(e => {
        setPokemon(null);

        if (e.response?.data) return setSearchErrorMsg(`"${searchQuery}" ${e.response.data}`);

        console.error(e);
        setSearchErrorMsg('Something went wrong');
      });
  }

  const handleCapture = () => {
    if (captured.length === 6) return;
    if (pokemon) {
      setCaptured([...captured, pokemon]);
    }
  }

  const removeCapture = (e: any) => {
    const index = parseInt(e.target.value);

    captured.splice(index, 1)

    setCaptured([...captured]);
  }

  return (
    <Center h='100vh'>
      <Box w='full' maxWidth='600px'>
        <Stack flexDir='row' spacing={0}>
          <Stack
            borderWidth={6}
            rounded='xl'
            borderColor='red.800'
            p={4}
            bg='#CE302A'
          >
            <HStack>
              <Input
                borderWidth={4}
                borderColor='red.800'
                bg='white'
                placeholder='name/id'
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchErrorMsg('')}
              />
              <Button borderWidth={4} borderColor='red.800' onClick={handleSearch}>
                Search
              </Button>
            </HStack>
            {searchErrorMsg && <Text color='white'>{searchErrorMsg}</Text>}
            <SearchResult p={pokemon} />
            {
              pokemon &&
              <Box>
                <Button w='full' borderWidth={4} borderColor='red.800' onClick={handleCapture} disabled={captured.length === 6}>
                  Capture
                </Button>
              </Box>
            }
          </Stack>
          {captured.length && <CapturedList captured={captured} removeCapture={removeCapture} />}
        </Stack>
      </Box>
    </Center>
  );
}

export default App;
