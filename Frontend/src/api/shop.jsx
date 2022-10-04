import api from "./api";

const END_POINT = "board";

const shop = {
  //nft 전체 목록 조회(수달샵)
  nftList(params) {
    return api({
      method: "get",
      url: `${END_POINT}/list`,
      params: params,
    });
  },
  //nft 상세 조회
  nftDetailOne(params) {
    return api({
      method: "get",
      url: `${END_POINT}/details/${params}`
    })
  },
  //미분양 nft 요청 내역 정보 조회
  nftUnsoldOne(params) {
    return api({
      method: "get",
      url: `${END_POINT}/appeal/${params}`
    })
  },
  //좋아요 클릭
  nftLikeOne(params) {
    console.log(params)
    const formData = new FormData()
    formData.append('nftId', params.nftId)
    return api({
      method: "post",
      url: `${END_POINT}/likes`,
      data: formData
    })
  }
};

export default shop;
