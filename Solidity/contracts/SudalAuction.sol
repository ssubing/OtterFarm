// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./SudalFarm.sol";

contract SudalAuction is Ownable {

    address private _erc20ContractAddress = address(0x0c54E456CE9E4501D2c43C38796ce3F06846C966);
    address private _sudalFarmContractAddress;

    // 토큰 id와 경매 매핑
    mapping(uint => Auction) public auctions;

    // 토큰 id와 입찰 매핑
    mapping(uint => Bid[]) public bids;


    struct Auction {
        address seller;
        uint start;
        uint end;
        uint firstPrice;
        bool isActive;
    }

        struct Bid {
        address bidder;
        uint bidTime;
        uint price;
    }

    modifier isSudalOwner(address _addr , uint _tokenId) {
        address _tokenOwner = SudalFarm(_sudalFarmContractAddress).ownerOf(_tokenId);
        require(_tokenOwner == _addr);
        _;
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function setSudalFarm(address _contractAddress) public onlyOwner {
        // 수달 농장 contract 연결
        _sudalFarmContractAddress = _contractAddress;
    }

    
    function createAuction(uint _tokenId, uint _time, uint _firstPrice) public isSudalOwner(msg.sender, _tokenId) returns(bool) {
        // NFT 전송 받기
        SudalFarm(_sudalFarmContractAddress).safeTransferFrom(msg.sender, address(this), uint256(_tokenId));

        // 경매 정보 저장
        Auction memory newAuction;
        newAuction.seller = msg.sender;
        newAuction.start = block.timestamp;
        newAuction.end = block.timestamp + _time;
        newAuction.firstPrice = _firstPrice;
        newAuction.isActive = true;

        auctions[_tokenId] = newAuction;

        // emit AuctionCreated(msg.sender, _tokenId);
        return true;
    }

    function bidOnAuction(uint _tokenId, uint _price) public payable {
        IERC20 erc20 = IERC20(_sudalFarmContractAddress);

        // 경매 마감 전인지 확인
        require(auctions[_tokenId].end > block.timestamp);
        // 토큰이 충분한지 확인
        require(erc20.balanceOf(msg.sender) > _price);

        // 시작가 또는 마지막 입찰가를 넘겼는지 확인
        if (bids.length == 0) {
            require(_price > nftAuction[_tokenId].firstPrice);
        } else {
            require(_price > bids[bids.length - 1].price);
        }

        erc20.transferFrom(msg.sender, address(this), _price);

        // 마지막 입찰 환불
        if (bids.length > 0) {
            lastBid = bids[bids.length - 1];
            erc20.transfer(lastBid.bidder, lastBid.price);
        }

        // 입찰 정보 저장
        Bid memory newBid;
        newBid.bidder = msg.sender;
        newBid.bidTime = block.timestamp;
        newBid.price = _price;

        auctionBids[_tokenId].push(newBid);
    }

    function approveAndTransfer(address _from, address _to, uint _tokenId) internal returns(bool) {
        SudalFarm sudalFarm = SudalFarm(_sudalFarmContractAddress);
        sudalFarm.approve(_to, _tokenId);
        sudalFarm.transferFrom(_from, _to, _tokenId);
        return true;
    }

    function endAuction(uint _tokenId) public {
        Auction memory auction = auctions[_tokenId];
        Bid[] memory bid = bids[_tokenId];

        approveAndTransfer(address(this), auction.seller, _tokenId);
    }

}