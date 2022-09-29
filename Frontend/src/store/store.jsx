import { configureStore } from "@reduxjs/toolkit";
import { nftList, nftDetailOne } from "./modules/shop";
export default configureStore({
  reducer: {
    nftList: nftList.reducer,
    nftDetailOne: nftDetailOne.reducer
  },
});
