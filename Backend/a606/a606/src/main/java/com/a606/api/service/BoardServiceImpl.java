package com.a606.api.service;

import com.a606.api.dto.BidBoardDto;
import com.a606.api.dto.LogsDto;
import com.a606.api.dto.NFTDto;
import com.a606.db.entity.*;
import com.a606.db.repository.AppealRepository;
import com.a606.db.repository.BoardRepository;
import com.a606.db.repository.NFTRepository;
import com.a606.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("boardService")
public class BoardServiceImpl implements BoardService{

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    AppealRepository appealRepository;

    @Autowired
    NFTRepository nftRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ContractService contractService;

    @Override
    public List<NFTDto> getNFTList(String tab, String order, int asc, int pageNo, int pageSize) throws Exception {
        String properties = "";
        switch (order) {
            case "likeCount":
                properties = "likeCount";
                break;
            case "id":
                properties = "id";
                break;
            default:
                return null;
        }
        Sort sort = Sort.by(properties);
        if (asc == 1) {
            sort = sort.descending();
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        List<NFT> nfts = new ArrayList<NFT>();
        switch (tab) {
            case "all":
                nfts = nftRepository.findAll(pageable).toList();
                break;
            case "saled":
                nfts = nftRepository.findAllByIsSaled(true, pageable).toList();
                break;
            case "unsaled":
                nfts = nftRepository.findAllByIsSaled(false, pageable).toList();
                break;
            default:
                return null;
        }
        List<NFTDto> list = new ArrayList<NFTDto>();
        for (NFT nft : nfts) {
            NFTDto nftDto = new NFTDto();
            nftDto.setId(nft.getId());
            nftDto.setTokenId(nft.getTokenId());
            nftDto.setSaled(nft.isSaled());
            nftDto.setName(nft.getName());
            nftDto.setLikeCount(nft.getLikeCount());
            nftDto.setTokenURI(contractService.getTokenURIbyTokenId(nft.getTokenId()));
            if (nftDto.isSaled()) {
                // 가격 찾기
                nftDto.setPrice("10000");
            }
            Optional<User> oUser = userRepository.findByWallet(contractService.getAddressbyTokenId(nft.getTokenId()));
            if (oUser.isPresent()) {
                User user = oUser.get();
                nftDto.setUserId(user.getId());
                nftDto.setUserNickname(user.getNickname());
            } else {    // 유저 정보가 없을 떄
                nftDto.setUserId(0l);
                nftDto.setUserNickname("guest");
            }
            list.add(nftDto);
        }
        return list;
    }

    @Override
    public NFTDto getNFTDetail(Long nftId) throws Exception {
        Optional<NFT> oNfts = nftRepository.findById(nftId);
        if (!oNfts.isPresent()) { return null; }
        NFT nft = oNfts.get();
        NFTDto nftDto = new NFTDto();
        nftDto.setId(nft.getId());
        nftDto.setTokenId(nft.getTokenId());
        nftDto.setSaled(nft.isSaled());
        nftDto.setName(nft.getName());
        nftDto.setLikeCount(nft.getLikeCount());
        nftDto.setTokenURI(contractService.getTokenURIbyTokenId(nft.getTokenId()));
        if (nftDto.isSaled()) {
            // 가격 찾기
            nftDto.setPrice("10000");
        }
        Optional<User> oUser = userRepository.findByWallet(contractService.getAddressbyTokenId(nft.getTokenId()));
        if (oUser.isPresent()) {
            User user = oUser.get();
            nftDto.setUserId(user.getId());
            nftDto.setUserNickname(user.getNickname());
        } else {    // 유저 정보가 없을 떄
            nftDto.setUserId(0l);
            nftDto.setUserNickname("guest");
        }

        return nftDto;
    }

    @Override
    public BidBoardDto getBid(Long nftId) {
        Optional<NFT> oNft = nftRepository.findById(nftId);
        if (!oNft.isPresent()) { return null; }
        Optional<Board> oBoard = boardRepository.findByNftAndStartBeforeAndEndAfter(oNft.get(), LocalDateTime.now(), LocalDateTime.now());
        if (!oBoard.isPresent()) { return null; }
        Board board = oBoard.get();
        BidBoardDto bidBoardDto = new BidBoardDto();
        bidBoardDto.setId(board.getId());
        bidBoardDto.setStart(board.getStart());
        bidBoardDto.setEnd(board.getEnd());
        bidBoardDto.setFirst_price(board.getFirst_price());
        List<LogsDto> bidLogsDtos = new ArrayList<>();
        for (BidLog log : board.getBidLogs()) {
            bidLogsDtos.add(new LogsDto(log.getDate(), log.getPrice()));
        }
        bidBoardDto.setBidLogs(bidLogsDtos);

        return bidBoardDto;
    }

    @Override
    public List<LogsDto> getAppeals(Long nftId) {
        Optional<NFT> oNft = nftRepository.findById(nftId);
        if (!oNft.isPresent()) { return null; }
        List<Appeal> appeals = appealRepository.findAllByNft(oNft.get());
        List<LogsDto> logsDtos = new ArrayList<>();
        for (Appeal appeal : appeals) {
            logsDtos.add(new LogsDto(appeal.getDate(), appeal.getPrice()));
        }
        return logsDtos;
    }
}
