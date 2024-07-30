import React from 'react';
import { Box, Button, Text, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function HomePage(): JSX.Element {
  return (
    <Box p={4}>
      <Text fontSize="3xl" mb={6}>Главная страница</Text>
      <Stack spacing={4}>
        <Button as={RouterLink} to="/candidates" colorScheme="blue">
          Кандидаты
        </Button>
        <Button as={RouterLink} to="/comments/important" colorScheme="teal">
          Важные комментарии
        </Button>
        <Button as={RouterLink} to="/accepted" colorScheme="orange">
          Принятые резюме
        </Button>
      </Stack>
    </Box>
  );
}
