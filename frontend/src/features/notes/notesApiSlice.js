import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({});
const initialState = notesAdapter.getInitialState();

export const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => '/notes',
      validatesStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id;
          return note;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Notes', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Notes', id })),
          ];
        } else {
          return [{ type: 'Note', id: 'LIST' }];
        }
      },
    }),
  }),
});

export const {
  useGetNotesQuery,
} = noteApiSlice;

export const selectNoteResult = noteApiSlice.endpoints.getNotes.select();

const selectNotesData = createSelector(
  selectNoteResult,
  (notesResult) => notesResult.data
);

export const {
  selectAll: selectAllNotes,
  selectById: selectById,
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors((state) => selectNotesData(state) ?? initialState);