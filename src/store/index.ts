import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { UICard } from "../types";
import U from "./utils";
import C from "./constants";

const initialDeckState = U.getDeck();
const initialTableState = C.table;

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
    updateTable(state, action) {
      const { position, slotIndex, cardIndex } = action.payload;
      state[position][slotIndex] = cardIndex;
    },
    // updateCommunity(state, action) {
    //   const card = state.community[action.payload.slot];
    //   card.cardId = action.payload.cardId;
    // },
    removeCard(state, action) {
      U.removeCard(state, action.payload);
    },
    // addPlayer: {},
    // removelayer: {},
  },
});

const store = configureStore({
  reducer: { deck: deckSlice.reducer, table: tableSlice.reducer },
});

export const deckActions = deckSlice.actions;
export const tableActions = tableSlice.actions;
export default store;
