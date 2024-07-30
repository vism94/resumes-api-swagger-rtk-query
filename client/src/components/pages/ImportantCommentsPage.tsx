import React from 'react';
import { Box, Text, Stack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetImportantCommentsQuery } from '../../services/resumeApi';
import { CommentType } from '../../types';

export default function ImportantCommentsPage(): JSX.Element {
  const { data: comments = [], isLoading } = useGetImportantCommentsQuery();

  if (isLoading) return <Text>Загрузка...</Text>;

  return (
    <Box p={4}>
      <Text fontSize="3xl" mb={6}>Важные Комментарии</Text>
      <Stack spacing={4}>
        {comments.map((comment: CommentType) => (
          <Box key={comment.id} borderWidth="1px" borderRadius="md" p={4} bg="white" shadow="md">
            <Text>{comment.text}</Text>
            <Link as={RouterLink} to={`/candidates/${comment.resumeId}`} color="teal.500">
              Перейти к резюме
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
