import {
  configureStore,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Card, Table, ValidationTable, Results } from "../types";
import U from "./utils";
import C from "./constants";

const initialDeckState: Card[] = U.getDeck();
const initialTableState: Table = C.table;
const initialValidationState: ValidationTable = C.VALIDATION;
const initialResultState: Results = C.INITIAL_RESULT_STATE;

export const updateTableAsync = createAsyncThunk(
  "table/updateTableAsync",
  (args: { card: Card; position: string; slotIndex: number }) => {
    return args;
  }
);

export const removeCardAsync = createAsyncThunk(
  "table/removeCardAsync",
  (args: { cardIndex: number }) => {
    return args;
  }
);

export const validateAsync = createAsyncThunk(
  "validation/validateAsync",
  (_, { getState }) => {
    return getState() as RootState;
  }
);

const deckSlice = createSlice({
  name: "deck",
  initialState: initialDeckState,
  reducers: {
    reset: () => initialDeckState,
    updateDeck(
      state,
      action: PayloadAction<{ cardIndex: number; isSelected: boolean }>
    ) {
      U.updateDeck(state, action.payload);
    },
  },
});

const tableSlice = createSlice({
  name: "table",
  initialState: initialTableState,
  reducers: {
    reset: () => initialTableState,
  },
  extraReducers: (builder) => {
    builder.addCase(updateTableAsync.fulfilled, (state, action) => {
      const { position, slotIndex, card } = action.meta.arg;
      state[position][slotIndex] = card;
    });
    builder.addCase(removeCardAsync.fulfilled, (state, action) => {
      const { cardIndex } = action.meta.arg;
      U.removeCard(state, cardIndex);
    });
  },
});

const validationSlice = createSlice({
  name: "validation",
  initialState: initialValidationState,
  reducers: {
    reset: () => initialValidationState,
  },
  extraReducers: (builder) => {
    builder.addCase(validateAsync.fulfilled, (state, action) => {
      U.runValidation(state, action.payload.table);
    });
  },
});

const resultsSlice = createSlice({
  name: "results",
  initialState: initialResultState,
  reducers: {
    reset: () => initialResultState,
    updateResults: (state, action) => {
      state.winners = action.payload.winners;
      state.ties = action.payload.ties;
      state.ranking = action.payload.ranking;
    },
  },
});

const store = configureStore({
  reducer: {
    deck: deckSlice.reducer,
    table: tableSlice.reducer,
    validation: validationSlice.reducer,
    results: resultsSlice.reducer,
  },
});

export const deckActions = deckSlice.actions;
export const tableActions = tableSlice.actions;
export const validationActions = validationSlice.actions;
export const resultsActions = resultsSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type PokerDispatch = typeof store.dispatch;

export default store;
