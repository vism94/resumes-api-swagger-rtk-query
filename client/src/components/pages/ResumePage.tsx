import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Image, Text, Textarea, Stack, Tag, Flex } from '@chakra-ui/react';
import {
  useGetResumeByIdQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useAcceptResumeMutation,
} from '../../services/resumeApi';
import { CommentType, ResumeType } from '../../types';

export default function ResumePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const resumeId = Number(id);
  const { data: resume, isLoading, isError, refetch } = useGetResumeByIdQuery(resumeId, {
    refetchOnMountOrArgChange: true, // Обновление данных при изменении аргументов
  });
  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [acceptResume] = useAcceptResumeMutation();
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    if (resume) {
      console.log('Updated resume data:', resume);
    }
  }, [resume]);

  const handleAddComment = async (): Promise<void> => {
    if (!resume) return;
    try {
      const newCommentData = { resumeId, text: newComment, isImportant: false };
      await addComment(newCommentData).unwrap();
      setNewComment(''); // Очистка поля ввода после успешного добавления
      await refetch(); // Обновление данных резюме после добавления комментария
      console.log('Comment added and data refetched:', resume);
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
      alert('Не удалось добавить комментарий');
    }
  };

  const handleAcceptResume = async (): Promise<void> => {
    try {
      await acceptResume(resumeId).unwrap();
      await refetch(); // Обновление данных резюме после принятия резюме
    } catch (error) {
      console.error('Ошибка при принятии резюме:', error);
      alert('Произошла ошибка при принятии резюме');
    }
  };

  const handleDeleteComment = async (commentId: number): Promise<void> => {
    try {
      await deleteComment(commentId).unwrap();
      await refetch(); // Обновление данных резюме после удаления комментария
    } catch (error) {
      console.error('Ошибка при удалении комментария:', error);
      alert('Не удалось удалить комментарий');
    }
  };

  if (isLoading) return <Text>Загрузка...</Text>;
  if (isError) return <Text>Ошибка при загрузке резюме</Text>;

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>{resume?.fullName}</Text>
      <Flex mb={4}>
        <Image
          boxSize="150px"
          objectFit="cover"
          src={`/img/${resume?.img}`}
          alt={resume?.fullName}
          borderRadius="full"
          mr={4}
        />
        <Stack>
          <Text fontWeight="bold" fontSize="lg">{resume?.fullName}</Text>
          <Text>{resume?.about}</Text>
          <Box>
            <Text fontWeight="bold">Technologies:</Text>
            {resume?.technologies?.map((tech) => (
              <Tag key={tech} colorScheme="teal" mr={2}>{tech}</Tag>
            )) || <Text>No technologies listed</Text>}
          </Box>
        </Stack>
      </Flex>
      <Box>
        <Text fontWeight="bold" mb={2}>Комментарии</Text>
        <Stack spacing={4}>
          {Array.isArray(resume?.comments) && resume.comments.length > 0 ? (
            resume.comments.map((comment: CommentType) => (
              <Box
                key={comment.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                bg={comment.isImportant ? 'yellow.50' : 'white'}
              >
                <Text>{comment.text}</Text>
                <Button mt={2} onClick={() => updateComment({ id: comment.id, isImportant: !comment.isImportant })}>
                  Toggle Importance
                </Button>
                <Button mt={2} ml={2} colorScheme="red" onClick={() => handleDeleteComment(comment.id)}>
                  Удалить
                </Button>
              </Box>
            ))
          ) : (
            <Text>Комментарии отсутствуют</Text>
          )}
        </Stack>
        <Textarea
          mt={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Добавить новый комментарий"
        />
        <Button mt={2} colorScheme="teal" onClick={handleAddComment}>Добавить комментарий</Button>
      </Box>
      <Button mt={4} colorScheme="teal" onClick={handleAcceptResume}>Принять</Button>
    </Box>
  );
}
