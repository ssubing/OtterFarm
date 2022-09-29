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
  nftDetailOne(params) {
    return api({
      method: "get",
      url: `${END_POINT}/details/${params}`
    })
  },
  nftUnsoldOne(params) {
    return api({
      method: "get",
      url: `${END_POINT}/appeal/${params}`
    })
  }
};

export default shop;
