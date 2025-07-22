import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/configApi";
import {
  type CardRequest,
  type CardResponse,
  type DefaultState,
} from "../../types/types";

export const createCard = createAsyncThunk<
  CardResponse,
  { boardId: string; values: CardRequest }
>("cards/createCard", async ({ boardId, values }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/boards/${boardId}/cards`, values);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Create failed!");
  }
});

export const updateCard = createAsyncThunk<
  CardResponse,
  { cardId: string; boardId: string; values: CardRequest }
>(
  "cards/updateCard",
  async ({ cardId, boardId, values }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `boards/${boardId}/cards/${cardId}`,
        values
      );
      return { ...response.data, params: values.params };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Update failed!");
    }
  }
);

export const deleteCard = createAsyncThunk<
  { cardId: string },
  { boardId: string; cardId: string }
>("cards/deleteCard", async ({ boardId, cardId }, { rejectWithValue }) => {
  try {
    await api.delete(`boards/${boardId}/cards/${cardId}`);
    return { cardId };
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Delete failed!");
  }
});

export const getBoardCardByBoardId = createAsyncThunk<CardResponse[], string>(
  "cards/getBoardCardByBoardId",
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/boards/${boardId}/cards`);
      console.log(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Create failed!");
    }
  }
);

const initialState: DefaultState = {
  loading: false,
  boardCard: [],
  error: null,
};

const cardSlice = createSlice({
  name: "cardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //
      .addCase(createCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.loading = false;
        state.boardCard?.push(action.payload);
      })
      .addCase(createCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //
      .addCase(updateCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.loading = false;
        state.boardCard = (state.boardCard ?? []).map((card) =>
          card.id === action.payload.id ? action.payload : card
        );
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.boardCard = (state.boardCard ?? []).filter(
          (board) => board.id !== action.payload.cardId
        );
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //
      .addCase(getBoardCardByBoardId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoardCardByBoardId.fulfilled, (state, action) => {
        state.loading = false;
        state.boardCard = action.payload;
      })
      .addCase(getBoardCardByBoardId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cardSlice.reducer;
