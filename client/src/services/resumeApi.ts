// src/services/resumeApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const resumeApi = createApi({
  reducerPath: 'resumeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Замените на ваш реальный базовый URL
  endpoints: (builder) => ({
    getResumes: builder.query({
      query: () => '/resumes',
    }),
    getResumeById: builder.query({
      query: (id) => `/resumes/${id}`,
    }),
    getRandomResume: builder.query({
      query: () => '/resumes/random',
    }),
    deleteResume: builder.mutation({
      query: (id) => ({
        url: `/resumes/${id}`,
        method: 'DELETE',
      }),
    }),
    updateResume: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/resumes/${id}`,
        method: 'PATCH',
        body: rest,
      }),
    }),
    getCommentsByResumeId: builder.query({
      query: (id) => `/resumes/${id}/comments`,
    }),
    addComment: builder.mutation({
      query: ({ id, ...comment }) => ({
        url: `/resumes/${id}/comments`,
        method: 'POST',
        body: comment,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
    }),
    updateComment: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/comments/${id}`,
        method: 'PATCH',
        body: rest,
      }),
    }),
    setCommentImportant: builder.mutation({
      query: ({ id, isImportant }) => ({
        url: `/comments/${id}/important`,
        method: 'PATCH',
        body: { isImportant },
      }),
    }),
    getImportantComments: builder.query({
      query: () => '/comments/important',
    }),
    acceptResume: builder.mutation({
      query: (id) => ({
        url: `/resumes/${id}/accept`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetResumesQuery,
  useGetResumeByIdQuery,
  useGetRandomResumeQuery,
  useDeleteResumeMutation,
  useUpdateResumeMutation,
  useGetCommentsByResumeIdQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useSetCommentImportantMutation,
  useGetImportantCommentsQuery,
  useAcceptResumeMutation,
} = resumeApi;
