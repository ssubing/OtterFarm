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

export const nftDetailOne = createSlice({
  name: "nftDetailOne",
  initialState: [],
  reducers: {
    setNftDetailOne(state, action) {
      return action.payload;
    },
  },
  // initialState: [
  //   {
  //     tokenId: 0,
  //     name: '',
  //     likeCount: 0,
  //     tokenURI: '',
  //     price: 0,
  //     userId: '',
  //     userNickname: '',
  //     liked: false,
  //     saled: false
  //   }
  // ],
  // reducers: {
  //   setNftDetailOne(state, action) {
  //     state.tokenId = action.payload
  //     state.name = action.payload
  //     state.likeCount = action.payload
  //     state.tokenURI = action.payload
  //     state.price = action.payload
  //     state.userId = action.payload
  //     state.userNickname = action.payload
  //     state.liked = action.payload
  //     state.saled = action.payload
  //   }
  // },
})

export const { setNftList } = nftList.actions;
export const { setNftDetailOne } = nftDetailOne.actions;
