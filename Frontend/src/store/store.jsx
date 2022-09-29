import { configureStore } from "@reduxjs/toolkit";
import { nftList, nftDetailOne, nftUnsoldOne } from "./modules/shop";
export default configureStore({
  reducer: {
    nftList: nftList.reducer,
    nftDetailOne: nftDetailOne.reducer,
    nftUnsoldOne: nftUnsoldOne.reducer
  },
});
