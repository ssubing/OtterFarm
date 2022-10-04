package com.a606.api.service;

import com.a606.api.dto.MyNFTDto;
import com.a606.contract.SudalAuction;
import com.a606.contract.SudalFarm;
import com.a606.db.entity.BidLog;
import com.a606.db.entity.Board;
import com.a606.db.entity.NFT;
import com.a606.db.entity.User;
import com.a606.db.repository.BidLogRepository;
import com.a606.db.repository.BoardRepository;
import com.a606.db.repository.NFTRepository;
import com.a606.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Uint;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tuples.generated.Tuple2;
import org.web3j.tuples.generated.Tuple3;
import org.web3j.tuples.generated.Tuple5;
import org.web3j.tx.FastRawTransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.tx.gas.StaticGasProvider;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;

import java.math.BigInteger;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;

@Service("contractService")
public class ContractServiceImpl implements ContractService{

    @Autowired
    BoardRepository boardRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    NFTRepository nftRepository;
    @Autowired
    BidLogRepository bidLogRepository;

    @Value("${web3.sudalFarmAddress}")
//    싸피 네트워크
    private String sudalFarmContract = "0x9739CC7f01F5eb1FA5f2B1D4045d2153e6b44066";
    private String sudalAuctionContract = "0xB033DBf0943B4439cE45f41C51b925F1F06C780D";
    private String key = "2c835aeb997e4d1269513a83efadc44de96a30a56c1b58cb7f8ce8897511c79f";
    private String url = "http://20.196.209.2:8545";

    @Override
    public List<MyNFTDto> getNFTbyAddress(String Address) throws Exception {
        Web3j web3j = Web3j.build(new HttpService(url));
        Credentials credentials = Credentials.create(key);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        FastRawTransactionManager manager = new FastRawTransactionManager(web3j, credentials,
                new PollingTransactionReceiptProcessor(web3j, 3000, 3));

        SudalFarm sudalFarm = SudalFarm.load(sudalFarmContract, web3j, manager, gasProvider);

        Tuple2<List<BigInteger>, List<BigInteger>> tuple2 = sudalFarm.getSudalsByOwner(Address).send();

        List<BigInteger> ids = (List<BigInteger>) tuple2.component1();
        List<BigInteger> dnas = (List<BigInteger>) tuple2.component2();

        List<MyNFTDto> mynfts = new ArrayList<MyNFTDto>();

        for(int i = 0; i < ids.size(); i++){
            MyNFTDto mynft = new MyNFTDto();
            mynft.setTokenId(String.valueOf(ids.get(i)));
            mynft.setTokenURI(sudalFarm.tokenURI(ids.get(i)).send());
            mynfts.add(mynft);
        }

        return mynfts;
    }

    @Override
    public String getAddressbyTokenId(String tokenId) throws Exception {
        Web3j web3j = Web3j.build(new HttpService(url));
        Credentials credentials = Credentials.create(key);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        FastRawTransactionManager manager = new FastRawTransactionManager(web3j, credentials,
                new PollingTransactionReceiptProcessor(web3j, 3000, 3));

        SudalFarm sudalFarm = SudalFarm.load(sudalFarmContract, web3j, manager, gasProvider);

        String address = sudalFarm.ownerOf(new BigInteger(tokenId)).send();

        return address;
    }

    @Override
    public String getTokenURIbyTokenId(String tokenId) throws Exception {
        Web3j web3j = Web3j.build(new HttpService(url));
        Credentials credentials = Credentials.create(key);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        FastRawTransactionManager manager = new FastRawTransactionManager(web3j, credentials,
                new PollingTransactionReceiptProcessor(web3j, 3000, 3));

        SudalFarm sudalFarm = SudalFarm.load(sudalFarmContract, web3j, manager, gasProvider);

        String address = sudalFarm.tokenURI(new BigInteger(tokenId)).send();
        return address;
    }

    @Override
    public String createNFT(String toAddress, String sudalDNA, String tokenURI) throws Exception {
        Web3j web3j = Web3j.build(new HttpService(url));
        Credentials credentials = Credentials.create(key);
        ContractGasProvider gasProvider = new StaticGasProvider(BigInteger.ZERO, DefaultGasProvider.GAS_LIMIT);
        FastRawTransactionManager manager = new FastRawTransactionManager(web3j, credentials,
                new PollingTransactionReceiptProcessor(web3j, 3000, 3));


        SudalFarm sudalFarm = SudalFarm.load(sudalFarmContract, web3j, manager, gasProvider);

        TransactionReceipt transactionReceipt = sudalFarm.createSudal(toAddress, new BigInteger(sudalDNA), tokenURI).send();
        List<Log> logs =  transactionReceipt.getLogs();

        String tokenId = "";

        // 트랜잭션 영수증에서 event log
        Event newSudal = new Event("NewSudal", Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Uint>(false) {}, new TypeReference<Uint>(false) {}));
        String newSudalHash = EventEncoder.encode(newSudal);
        for(Log log : logs) {
            if (newSudalHash.equals(log.getTopics().get(0))){
                String address = FunctionReturnDecoder.decodeIndexedValue(log.getTopics().get(1), new TypeReference<Address>() {}).toString();
                List<Type> datas = FunctionReturnDecoder.decode(log.getData(), newSudal.getNonIndexedParameters());
                tokenId = String.valueOf(datas.get(0).getValue());
                String dna = String.valueOf(datas.get(1).getValue());
            }
        }

        return tokenId;
    }

    @Override
    public void checkAuction(String tokenId) throws Exception {
        Web3j web3j = Web3j.build(new HttpService(url));
        Credentials credentials = Credentials.create(key);
        ContractGasProvider gasProvider = new StaticGasProvider(BigInteger.ZERO, DefaultGasProvider.GAS_LIMIT);
        FastRawTransactionManager manager = new FastRawTransactionManager(web3j, credentials,
                new PollingTransactionReceiptProcessor(web3j, 3000, 3));
        SudalFarm sudalFarm = SudalFarm.load(sudalFarmContract, web3j, manager, gasProvider);
        SudalAuction sudalAuction = SudalAuction.load(sudalAuctionContract, web3j, manager, gasProvider);

        // 경매 정보
        Tuple5<String, BigInteger, BigInteger, BigInteger, Boolean> tuple5 = sudalAuction.getAuctionByTokenId(new BigInteger(tokenId)).send();
        // 입찰 정보
        Tuple3<List<String>, List<BigInteger>, List<BigInteger>> tuple3 = sudalAuction.getBidByTokenId(new BigInteger(tokenId)).send();

        // 경매 진행 중이 아닐 때
        if (!tuple5.component5()){ return; }
        LocalDateTime endTime = LocalDateTime.ofInstant(Instant.ofEpochSecond(tuple5.component3().longValue()), TimeZone.getDefault().toZoneId());
        
        // 경매 종료 시간이 지난 경우 경매 종료 처리
        if (endTime.isAfter(LocalDateTime.now())) {
            sudalAuction.endAuction(new BigInteger(tokenId));
        }

        Optional<NFT> oNft = nftRepository.findByTokenId(tokenId);
        if (oNft.isPresent()) {
            Optional<Board> oBoard = boardRepository.findByNftAndStart(oNft.get(), LocalDateTime.ofInstant(Instant.ofEpochSecond(tuple5.component2().longValue()), TimeZone.getDefault().toZoneId()));
            Optional<User> oUser = userRepository.findByWallet(sudalFarm.ownerOf(new BigInteger(tokenId)).send());
            // 새로운 경매일 때 경매글 추가
            if (!oBoard.isPresent() && oUser.isPresent()) {
                Board newBoard = new Board();
                newBoard.setNft(oNft.get());
                newBoard.setStart(LocalDateTime.ofInstant(Instant.ofEpochSecond(tuple5.component2().longValue()), TimeZone.getDefault().toZoneId()));
                newBoard.setEnd(LocalDateTime.ofInstant(Instant.ofEpochSecond(tuple5.component3().longValue()), TimeZone.getDefault().toZoneId()));
                newBoard.setFirst_price(tuple5.component4().doubleValue());
                newBoard.setUser(oUser.get());
                boardRepository.save(newBoard);
            }

            // 입찰 내역 확인
            if (oBoard.isPresent()) {
                int idx = -1;
                for (String bidder : tuple3.component1()) {
                    idx++;
                    oUser = userRepository.findByWallet(bidder);
                    if (oUser.isPresent()) {
                        LocalDateTime ldt = LocalDateTime.ofInstant(Instant.ofEpochSecond(tuple3.component2().get(idx).longValue()), TimeZone.getDefault().toZoneId());
                        Optional<BidLog> oBidLog = bidLogRepository.findByUserAndBoardAndDate(oUser.get(), oBoard.get(), ldt);
                        // 새로운 입찰 내역일 경우 추가
                        if (!oBidLog.isPresent()) {
                            BidLog newBidLog = new BidLog();
                            newBidLog.setDate(ldt);
                            newBidLog.setPrice(tuple3.component3().get(idx).doubleValue());
                            newBidLog.setUser(oUser.get());
                            newBidLog.setBoard(oBoard.get());
                            newBidLog.setNft(oBoard.get().getNft());
                            bidLogRepository.save(newBidLog);
                        }
                    }
                }
            }
        }

    }

}
