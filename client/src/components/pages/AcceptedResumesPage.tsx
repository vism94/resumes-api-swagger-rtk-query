import React from 'react';
import { Box, Text, Stack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetResumesQuery } from '../../services/resumeApi';
import { ResumeType } from '../../types';

export default function AcceptedResumesPage(): JSX.Element {
  const { data: resumes = [] } = useGetResumesQuery();

  const acceptedResumes = resumes.filter((resume: ResumeType) => resume.isAccepted); // `isAccepted` должно быть в типе ResumeType

  return (
    <Box p={4}>
      <Text fontSize="3xl" mb={6}>Принятые Резюме</Text>
      <Stack spacing={4}>
        {acceptedResumes.map((resume: ResumeType) => (
          <Box key={resume.id} borderWidth="1px" borderRadius="md" p={4} bg="white" shadow="md">
            <Text fontWeight="bold" fontSize="lg">{resume.fullName}</Text>
            <Text>${resume.salary}</Text>
            <Link as={RouterLink} to={`/candidates/${resume.id}`} color="teal.500">
              Подробнее
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
