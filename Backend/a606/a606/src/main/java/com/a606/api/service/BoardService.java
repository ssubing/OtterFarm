package com.a606.api.service;

import com.a606.api.dto.NFTDto;
import com.a606.db.entity.NFT;

import java.util.List;

public interface BoardService {

    List<NFTDto> getNFTList(String tab, String order, int asc, int pageNo, int npp) throws Exception;

    NFTDto getNFTDetail(Long nftId) throws Exception;
}
