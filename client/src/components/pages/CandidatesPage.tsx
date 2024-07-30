import React, { useState } from 'react';
import { Box, Button, Image, Text, Link, Stack, Badge, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetResumesQuery } from '../../services/resumeApi';
import { ResumeType } from '../../types';

export default function CandidatesPage(): JSX.Element {
  const { data: resumes = [], isLoading } = useGetResumesQuery();
  const [limit, setLimit] = useState<number>(5);

  const loadMore = (): void => setLimit((prev) => prev + 5);

  if (isLoading) return <Text>Загрузка...</Text>;

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Кандидаты</Text>
      <Stack spacing={4}>
        {resumes.slice(0, limit).map((resume: ResumeType) => (
          <Box
            key={resume.id}
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            p={4}
            bg="white"
            shadow="md"
          >
            <Flex mb={4}>
              <Image
                boxSize="100px"
                objectFit="cover"
                src={`/img/${resume.img}`}
                alt={resume.fullName}
                borderRadius="full"
                mr={4}
              />
              <Stack>
                <Text fontWeight="bold" fontSize="lg">{resume.fullName}</Text>
                <Text>{resume.preferred}</Text>
                <Text>${resume.salary}</Text>
                <Text>{resume.phone}</Text>
                {Array.isArray(resume.comments) && resume.comments.some(comment => comment.isImportant) && (
                  <Badge colorScheme="red">
                    {resume.comments.filter(comment => comment.isImportant).length} Важные комментарии
                  </Badge>
                )}
              </Stack>
            </Flex>
            <Link as={RouterLink} to={`/candidates/${resume.id}`} color="teal.500">Посмотреть детали</Link>
          </Box>
        ))}
      </Stack>
      <Button mt={4} onClick={loadMore} colorScheme="teal">Загрузить еще</Button>
    </Box>
  );
}
