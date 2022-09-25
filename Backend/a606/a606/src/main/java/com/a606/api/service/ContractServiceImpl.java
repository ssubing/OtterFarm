package com.a606.api.service;

import com.a606.api.dto.MyNFTDto;
import com.a606.contract.SudalFarm;
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
import org.web3j.tx.FastRawTransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.tx.gas.StaticGasProvider;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service("contractService")
public class ContractServiceImpl implements ContractService{

//    로컬 테스트
//    private String contract = "0xD732B50c0490965279C482fa5C44B358A0467f32";
//    private String key = "7de9b804253e76a421515313536b138ca1addd3e9aaaf07152d9155b71edaafa";
//    private String url = "http://localhost:7545";

//    싸피 네트워크
    private String contract = "0xB816Cb6893dB99A599896AFa400bcB2581bfd7F4";
    private String key = "2c835aeb997e4d1269513a83efadc44de96a30a56c1b58cb7f8ce8897511c79f";
    private String url = "http://20.196.209.2:8545";

    @Override
    public List<MyNFTDto> getNFTbyAddress(String Address) throws Exception {
        Web3j web3j = Web3j.build(new HttpService(url));
        Credentials credentials = Credentials.create(key);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        FastRawTransactionManager manager = new FastRawTransactionManager(web3j, credentials,
                new PollingTransactionReceiptProcessor(web3j, 3000, 3));

        SudalFarm sudalFarm = SudalFarm.load(contract, web3j, manager, gasProvider);

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

        SudalFarm sudalFarm = SudalFarm.load(contract, web3j, manager, gasProvider);

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

        SudalFarm sudalFarm = SudalFarm.load(contract, web3j, manager, gasProvider);

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

        SudalFarm sudalFarm = SudalFarm.load(contract, web3j, manager, gasProvider);

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

}
