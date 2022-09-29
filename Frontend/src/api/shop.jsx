import api from "./api";

const END_POINT = "board";

const shop = {
  nftList(params) {
    return api({
      method: "get",
      url: `${END_POINT}/list`,
      params: params,
    });
  },
};

export default shop;
