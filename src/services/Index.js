import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  tagTypes: ["Student"],
  /// to get All students
  endpoints: (builder) => ({
    getAllstudents: builder.query({
      query: () => "students",
      providesTags: ["Student"],
    }),
    /// to add a student
    addStudent: builder.mutation({
      query: (student) => ({
        url: "students",
        method: "Post",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    /// to update a student
    updateStudent: builder.mutation({
      query: ({ id, ...student }) => ({
        url: `students/${id}`,
        method: "PUT",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    /// to delete a student
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetAllstudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
