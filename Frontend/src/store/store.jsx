import { configureStore } from "@reduxjs/toolkit";
import { nftList } from "./modules/shop";
export default configureStore({
  reducer: {
    nftList: nftList.reducer,
  },
});
