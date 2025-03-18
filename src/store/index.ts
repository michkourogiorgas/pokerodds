import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import U from "./utils";
import C from "./constants";

const initialDeckState = U.getDeck();
const initialTableState = C.table;
const initialValidationState = C.VALIDATION;
const initialResultState = C.INITIAL_RESULT_STATE;

export const updateTableAsync = createAsyncThunk(
  "table/updateTableAsync",
  () => {
    return "tableAsync complete";
  }
);

export const removeCardAsync = createAsyncThunk("table/removeCardAsync", () => {
  return "removeCardAsync complete";
});

export const validateAsync = createAsyncThunk(
  "validation/validateAsync",
  (_, { getState }) => {
    return getState();
  }
);

const deckSlice = createSlice({
  name: "deck",
  initialState: initialDeckState,
  reducers: {
    reset: () => initialDeckState,
    updateDeck(state, action) {
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
      U.removeCard(state, action.meta.arg);
    });
  },
});

const validationSlice = createSlice({
  name: "validation",
  initialState: initialValidationState,
  reducers: {
    reset: () => initialValidationState,
    validate: (state, action) => {
      U.runValidation(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(validateAsync.fulfilled, (state, action) => {
      U.runValidation(state, action.payload);
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

export default store;
