import { configureStore } from "@reduxjs/toolkit";
import { nftList, nftDetailOne, nftUnsoldOne, nftOnsaleOne} from "./modules/shop";
export default configureStore({
  reducer: {
    nftList: nftList.reducer,
    nftDetailOne: nftDetailOne.reducer,
    nftUnsoldOne: nftUnsoldOne.reducer,
    nftOnsaleOne: nftOnsaleOne.reducer
  },
});
