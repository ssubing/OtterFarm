package com.a606.api.controller;

import com.a606.api.dto.BidBoardDto;
import com.a606.api.dto.LogsDto;
import com.a606.api.dto.NFTDto;
import com.a606.api.service.BoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Board API", tags = {"Board."})
@RestController
@RequestMapping("/api/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @GetMapping("/list")
    @ApiOperation(value = "NFT 목록 조회",
            notes = "탭(전체(all)/분양중(saled)/미분양(unsaled)), 정렬기준(좋아요순(likeCount)/등록순(id)), 정렬순서(높은순/낮은순), 페이지 번호, 페이지 당 NFT 수 로 NFT 목록을 조회한다.")
    public List<?> searchList(@RequestParam String tab, @RequestParam String order, @RequestParam int asc, @RequestParam int pageNo, @RequestParam int pageSize) throws Exception {
        return boardService.getNFTList(tab, order, asc, pageNo, pageSize);
    }

    @GetMapping("/details/{nftId}")
    @ApiOperation(value = "NFT 상세 조회",
            notes = "nftId로 NFT 상세 정보를 조회한다.")
    public NFTDto getNFTDetails(@PathVariable Long nftId) throws Exception {
        return boardService.getNFTDetail(nftId);
    }

    @GetMapping("/bid/{nftId}")
    @ApiOperation(value = "분양중인 NFT 분양 정보 조회",
            notes = "nftId로 NFT 분양 정보를 조회한다.")
    public BidBoardDto getBid(@PathVariable Long nftId) throws Exception {
        return boardService.getBid(nftId);
    }

    @GetMapping("/appeal/{nftId}")
    @ApiOperation(value = "미분양중인 NFT 요청 내역 정보 조회",
            notes = "nftId로 NFT 분양 정보를 조회한다.")
    public List<LogsDto> getAppeals(@PathVariable Long nftId) throws Exception {
        return boardService.getAppeals(nftId);
    }

}
