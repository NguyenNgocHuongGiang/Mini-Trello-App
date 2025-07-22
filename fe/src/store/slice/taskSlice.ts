import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/configApi";
import { type DefaultState, type TaskResponse } from "../../types/types";

// export const createNewPost = createAsyncThunk<PostsType, PostsType>(
//   "posts/createNewPost",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await api.post(`posts`, credentials);
//       return response.data.content;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Create failed!");
//     }
//   }
// );

export const getTaskByBoardIdCardId = createAsyncThunk<
  TaskResponse[],
  { boardId: string; cardId: string }
>(
  "cards/getTaskByBoardIdCardId",
  async ({ boardId, cardId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/boards/${boardId}/cards/${cardId}/tasks`
      );
      console.log(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Get failed!");
    }
  }
);

const initialState: DefaultState = {
  loading: false,
  taskList: {},
  error: null,
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaskByBoardIdCardId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskByBoardIdCardId.fulfilled, (state, action) => {
        state.loading = false;
        const { cardId } = action.meta.arg;
        if (!state.taskList) {
          state.taskList = {};
        }
        state.taskList[cardId] = action.payload;
      })
      .addCase(getTaskByBoardIdCardId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
