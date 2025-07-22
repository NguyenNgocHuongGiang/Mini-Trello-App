import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/configApi";
import { type BoardResponse, type DefaultState } from "../../types/types";

export const createBoard = createAsyncThunk<BoardResponse, BoardResponse>(
  "boards/createBoard",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`boards`, credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Create failed!");
    }
  }
);

export const inviteToBoard = createAsyncThunk<
  {
    success: boolean;
  },
  {
    invite_id: string;
    board_owner_id: string;
    email_member: string;
    status: string;
    boardId:string
  }
>("boards/inviteToBoard", async (credentials, { rejectWithValue }) => {
  try {
    const {boardId, ...values} = credentials
    const response = await api.post(`boards/${boardId}/invite`, values);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Create failed!");
  }
});

export const updateBoard = createAsyncThunk<BoardResponse, BoardResponse>(
  "boards/updateBoard",
  async ({ id, name, description }, { rejectWithValue }) => {
    try {
      const response = await api.put(`boards/${id}`, { name, description });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Update failed!");
    }
  }
);

export const deleteBoard = createAsyncThunk<{ id: string }, string>(
  "boards/deleteBoard",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`boards/${id}`);
      return { id };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Delete failed!");
    }
  }
);

export const getBoardByUserId = createAsyncThunk<BoardResponse[], void>(
  "boards/getBoardByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`boards`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Create failed!");
    }
  }
);

export const getBoardDetail = createAsyncThunk<BoardResponse, string>(
  "boards/getBoardDetail",
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/boards/${boardId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Create failed!");
    }
  }
);

const initialState: DefaultState = {
  loading: false,
  userBoard: [],
  boardDetail: undefined,
  error: null,
};

const boardSlice = createSlice({
  name: "boardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.userBoard) state.userBoard = [];
        state.userBoard.push(action.payload);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //-----------------------------
      .addCase(updateBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.userBoard = (state.userBoard ?? []).map((board) =>
          board.id === action.payload.id ? action.payload : board
        );
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //--------------------------------
      .addCase(deleteBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.userBoard = (state.userBoard ?? []).filter(
          (board) => board.id !== action.payload.id
        );
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //--------------------------------
      .addCase(getBoardByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoardByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userBoard = action.payload;
      })
      .addCase(getBoardByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //------------------------------------
      .addCase(getBoardDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoardDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.boardDetail = action.payload;
      })
      .addCase(getBoardDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default boardSlice.reducer;
