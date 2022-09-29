import { createSlice } from "@reduxjs/toolkit";

export const nftList = createSlice({
  name: "nftList",
  initialState: [],
  reducers: {
    setNftList(state, action) {
      return action.payload;
    },
  },
});
export const { setNftList } = nftList.actions;
