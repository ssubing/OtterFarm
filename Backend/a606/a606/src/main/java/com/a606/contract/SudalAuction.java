package com.a606.contract;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Bytes4;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple3;
import org.web3j.tuples.generated.Tuple5;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.4.1.
 */
@SuppressWarnings("rawtypes")
public class SudalAuction extends Contract {
    public static final String BINARY = "0x6080604052730c54e456ce9e4501d2c43c38796ce3f06846c966600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561006557600080fd5b5061008261007761008760201b60201c565b61008f60201b60201c565b610153565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b61202d80620001636000396000f3fe6080604052600436106100c25760003560e01c8063774132671161007f5780639f635120116100595780639f635120146102ac578063b9a2de3a146102c8578063cda4beef146102f1578063f2fde38b1461032e576100c2565b806377413267146102015780637b3c4baa146102425780638da5cb5b14610281576100c2565b80630bf876c4146100c7578063150b7a021461010457806316437d21146101415780631f568b0814610180578063571a26a0146101a9578063715018a6146101ea575b600080fd5b3480156100d357600080fd5b506100ee60048036038101906100e99190611704565b610357565b6040516100fb9190611740565b60405180910390f35b34801561011057600080fd5b5061012b6004803603810190610126919061181e565b61036f565b60405161013891906118e1565b60405180910390f35b34801561014d57600080fd5b5061016860048036038101906101639190611704565b610384565b60405161017793929190611a78565b60405180910390f35b34801561018c57600080fd5b506101a760048036038101906101a29190611ac4565b61063e565b005b3480156101b557600080fd5b506101d060048036038101906101cb9190611704565b61068a565b6040516101e1959493929190611b1b565b60405180910390f35b3480156101f657600080fd5b506101ff6106ed565b005b34801561020d57600080fd5b5061022860048036038101906102239190611704565b610701565b604051610239959493929190611b1b565b60405180910390f35b34801561024e57600080fd5b5061026960048036038101906102649190611b6e565b6107e6565b60405161027893929190611bae565b60405180910390f35b34801561028d57600080fd5b5061029661084d565b6040516102a39190611be5565b60405180910390f35b6102c660048036038101906102c19190611b6e565b610876565b005b3480156102d457600080fd5b506102ef60048036038101906102ea9190611704565b610da7565b005b3480156102fd57600080fd5b5061031860048036038101906103139190611c00565b6110be565b6040516103259190611c53565b60405180910390f35b34801561033a57600080fd5b5061035560048036038101906103509190611ac4565b611369565b005b60056020528060005260406000206000915090505481565b600063150b7a0260e01b905095945050505050565b60608060606000600560008681526020019081526020016000205467ffffffffffffffff8111156103b8576103b7611c6e565b5b6040519080825280602002602001820160405280156103e65781602001602082028036833780820191505090505b5090506000600560008781526020019081526020016000205467ffffffffffffffff81111561041857610417611c6e565b5b6040519080825280602002602001820160405280156104465781602001602082028036833780820191505090505b5090506000600560008881526020019081526020016000205467ffffffffffffffff81111561047857610477611c6e565b5b6040519080825280602002602001820160405280156104a65781602001602082028036833780820191505090505b50905060005b600560008981526020019081526020016000205481101561062a576004600089815260200190815260200160002081815481106104ec576104eb611c9d565b5b906000526020600020906003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684828151811061053157610530611c9d565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506004600089815260200190815260200160002081815481106105905761058f611c9d565b5b9060005260206000209060030201600101548382815181106105b5576105b4611c9d565b5b6020026020010181815250506004600089815260200190815260200160002081815481106105e6576105e5611c9d565b5b90600052602060002090600302016002015482828151811061060b5761060a611c9d565b5b602002602001018181525050808061062290611cfb565b9150506104ac565b508282829550955095505050509193909250565b6106466113ec565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154908060040160009054906101000a900460ff16905085565b6106f56113ec565b6106ff600061146a565b565b600080600080600080600360008881526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152602001600382015481526020016004820160009054906101000a900460ff161515151581525050905080600001518160200151826040015183606001518460800151955095509550955095505091939590929450565b6004602052816000526040600020818154811061080257600080fd5b9060005260206000209060030201600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154905083565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050426003600085815260200190815260200160002060020154116108bf57600080fd5b818173ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016108f99190611be5565b602060405180830381865afa158015610916573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093a9190611d58565b1161094457600080fd5b600060046000858152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015610a1557838290600052602060002090600302016040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152505081526020019060010190610979565b50505050905060006005600086815260200190815260200160002054905060008103610a625760036000868152602001908152602001600020600301548411610a5d57600080fd5b610a99565b81600182610a709190611d85565b81518110610a8157610a80611c9d565b5b6020026020010151604001518411610a9857600080fd5b5b8273ffffffffffffffffffffffffffffffffffffffff166323b872dd3330876040518463ffffffff1660e01b8152600401610ad693929190611db9565b6020604051808303816000875af1158015610af5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b199190611e1c565b506000811115610bd757600082600183610b339190611d85565b81518110610b4457610b43611c9d565b5b602002602001015190508373ffffffffffffffffffffffffffffffffffffffff1663a9059cbb826000015183604001516040518363ffffffff1660e01b8152600401610b91929190611e49565b6020604051808303816000875af1158015610bb0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd49190611e1c565b50505b610bdf611646565b33816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505042816020018181525050848160400181815250508160046000888152602001908152602001600020805490501115610ce05780600460008881526020019081526020016000208381548110610c6f57610c6e611c9d565b5b906000526020600020906003020160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020155905050610d7b565b6004600087815260200190815260200160002081908060018154018082558091505060019003906000526020600020906003020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015550505b600182610d889190611e72565b6005600088815260200190815260200160002081905550505050505050565b6000600360008381526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152602001600382015481526020016004820160009054906101000a900460ff1615151515815250509050600060046000848152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015610f2957838290600052602060002090600302016040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152505081526020019060010190610e8d565b5050505090506000600560008581526020019081526020016000205490508260800151610f5557600080fd5b82604001514211610f6557600080fd5b600081111561107857600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb846000015184600185610fbf9190611d85565b81518110610fd057610fcf611c9d565b5b6020026020010151604001516040518363ffffffff1660e01b8152600401610ff9929190611e49565b6020604051808303816000875af1158015611018573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061103c9190611e1c565b50611072308360018461104f9190611d85565b815181106110605761105f611c9d565b5b6020026020010151600001518661152e565b50611089565b6110873084600001518661152e565b505b60006003600086815260200190815260200160002060040160006101000a81548160ff02191690831515021790555050505050565b600033846000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636352211e836040518263ffffffff1660e01b815260040161111f9190611740565b602060405180830381865afa15801561113c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111609190611ebb565b90508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461119a57600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342842e0e33308a6040518463ffffffff1660e01b81526004016111f993929190611db9565b600060405180830381600087803b15801561121357600080fd5b505af1158015611227573d6000803e3d6000fd5b5050505061123361167d565b33816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250504281602001818152505086426112819190611e72565b81604001818152505085816060018181525050600181608001901515908115158152505080600360008a815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201556060820151816003015560808201518160040160006101000a81548160ff0219169083151502179055509050506000600560008a81526020019081526020016000208190555060019450505050509392505050565b6113716113ec565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036113e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113d790611f6b565b60405180910390fd5b6113e98161146a565b50565b6113f461163e565b73ffffffffffffffffffffffffffffffffffffffff1661141261084d565b73ffffffffffffffffffffffffffffffffffffffff1614611468576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161145f90611fd7565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff1663095ea7b385856040518363ffffffff1660e01b8152600401611591929190611e49565b600060405180830381600087803b1580156115ab57600080fd5b505af11580156115bf573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff166323b872dd8686866040518463ffffffff1660e01b815260040161160093929190611db9565b600060405180830381600087803b15801561161a57600080fd5b505af115801561162e573d6000803e3d6000fd5b5050505060019150509392505050565b600033905090565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081525090565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600081526020016000151581525090565b600080fd5b600080fd5b6000819050919050565b6116e1816116ce565b81146116ec57600080fd5b50565b6000813590506116fe816116d8565b92915050565b60006020828403121561171a576117196116c4565b5b6000611728848285016116ef565b91505092915050565b61173a816116ce565b82525050565b60006020820190506117556000830184611731565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006117868261175b565b9050919050565b6117968161177b565b81146117a157600080fd5b50565b6000813590506117b38161178d565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f8401126117de576117dd6117b9565b5b8235905067ffffffffffffffff8111156117fb576117fa6117be565b5b602083019150836001820283011115611817576118166117c3565b5b9250929050565b60008060008060006080868803121561183a576118396116c4565b5b6000611848888289016117a4565b9550506020611859888289016117a4565b945050604061186a888289016116ef565b935050606086013567ffffffffffffffff81111561188b5761188a6116c9565b5b611897888289016117c8565b92509250509295509295909350565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6118db816118a6565b82525050565b60006020820190506118f660008301846118d2565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6119318161177b565b82525050565b60006119438383611928565b60208301905092915050565b6000602082019050919050565b6000611967826118fc565b6119718185611907565b935061197c83611918565b8060005b838110156119ad5781516119948882611937565b975061199f8361194f565b925050600181019050611980565b5085935050505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6119ef816116ce565b82525050565b6000611a0183836119e6565b60208301905092915050565b6000602082019050919050565b6000611a25826119ba565b611a2f81856119c5565b9350611a3a836119d6565b8060005b83811015611a6b578151611a5288826119f5565b9750611a5d83611a0d565b925050600181019050611a3e565b5085935050505092915050565b60006060820190508181036000830152611a92818661195c565b90508181036020830152611aa68185611a1a565b90508181036040830152611aba8184611a1a565b9050949350505050565b600060208284031215611ada57611ad96116c4565b5b6000611ae8848285016117a4565b91505092915050565b611afa8161177b565b82525050565b60008115159050919050565b611b1581611b00565b82525050565b600060a082019050611b306000830188611af1565b611b3d6020830187611731565b611b4a6040830186611731565b611b576060830185611731565b611b646080830184611b0c565b9695505050505050565b60008060408385031215611b8557611b846116c4565b5b6000611b93858286016116ef565b9250506020611ba4858286016116ef565b9150509250929050565b6000606082019050611bc36000830186611af1565b611bd06020830185611731565b611bdd6040830184611731565b949350505050565b6000602082019050611bfa6000830184611af1565b92915050565b600080600060608486031215611c1957611c186116c4565b5b6000611c27868287016116ef565b9350506020611c38868287016116ef565b9250506040611c49868287016116ef565b9150509250925092565b6000602082019050611c686000830184611b0c565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611d06826116ce565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611d3857611d37611ccc565b5b600182019050919050565b600081519050611d52816116d8565b92915050565b600060208284031215611d6e57611d6d6116c4565b5b6000611d7c84828501611d43565b91505092915050565b6000611d90826116ce565b9150611d9b836116ce565b9250828203905081811115611db357611db2611ccc565b5b92915050565b6000606082019050611dce6000830186611af1565b611ddb6020830185611af1565b611de86040830184611731565b949350505050565b611df981611b00565b8114611e0457600080fd5b50565b600081519050611e1681611df0565b92915050565b600060208284031215611e3257611e316116c4565b5b6000611e4084828501611e07565b91505092915050565b6000604082019050611e5e6000830185611af1565b611e6b6020830184611731565b9392505050565b6000611e7d826116ce565b9150611e88836116ce565b9250828201905080821115611ea057611e9f611ccc565b5b92915050565b600081519050611eb58161178d565b92915050565b600060208284031215611ed157611ed06116c4565b5b6000611edf84828501611ea6565b91505092915050565b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611f55602683611ee8565b9150611f6082611ef9565b604082019050919050565b60006020820190508181036000830152611f8481611f48565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611fc1602083611ee8565b9150611fcc82611f8b565b602082019050919050565b60006020820190508181036000830152611ff081611fb4565b905091905056fea2646970667358221220f808f4c2ca1fb6bb21e4c23522ad99a4866bf115820985041328a2f3c75172a864736f6c63430008100033";

    public static final String FUNC_AUCTIONS = "auctions";

    public static final String FUNC_BIDINDEXES = "bidIndexes";

    public static final String FUNC_BIDS = "bids";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_RENOUNCEOWNERSHIP = "renounceOwnership";

    public static final String FUNC_TRANSFEROWNERSHIP = "transferOwnership";

    public static final String FUNC_ONERC721RECEIVED = "onERC721Received";

    public static final String FUNC_SETSUDALFARM = "setSudalFarm";

    public static final String FUNC_CREATEAUCTION = "createAuction";

    public static final String FUNC_GETAUCTIONBYTOKENID = "getAuctionByTokenId";

    public static final String FUNC_BIDONAUCTION = "bidOnAuction";

    public static final String FUNC_GETBIDBYTOKENID = "getBidByTokenId";

    public static final String FUNC_ENDAUCTION = "endAuction";

    public static final Event OWNERSHIPTRANSFERRED_EVENT = new Event("OwnershipTransferred", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}));
    ;

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
        _addresses.put("1337", "0xEdD9801198Ee41e4E84C3785226849a0cF4d0007");
        _addresses.put("202112031219", "0xB033DBf0943B4439cE45f41C51b925F1F06C780D");
    }

    @Deprecated
    protected SudalAuction(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected SudalAuction(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected SudalAuction(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected SudalAuction(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<OwnershipTransferredEventResponse> getOwnershipTransferredEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(OWNERSHIPTRANSFERRED_EVENT, transactionReceipt);
        ArrayList<OwnershipTransferredEventResponse> responses = new ArrayList<OwnershipTransferredEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            OwnershipTransferredEventResponse typedResponse = new OwnershipTransferredEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.previousOwner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.newOwner = (String) eventValues.getIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<OwnershipTransferredEventResponse> ownershipTransferredEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, OwnershipTransferredEventResponse>() {
            @Override
            public OwnershipTransferredEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(OWNERSHIPTRANSFERRED_EVENT, log);
                OwnershipTransferredEventResponse typedResponse = new OwnershipTransferredEventResponse();
                typedResponse.log = log;
                typedResponse.previousOwner = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.newOwner = (String) eventValues.getIndexedValues().get(1).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<OwnershipTransferredEventResponse> ownershipTransferredEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(OWNERSHIPTRANSFERRED_EVENT));
        return ownershipTransferredEventFlowable(filter);
    }

    public RemoteFunctionCall<Tuple5<String, BigInteger, BigInteger, BigInteger, Boolean>> auctions(BigInteger param0) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_AUCTIONS, 
                Arrays.<Type>asList(new Uint256(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Bool>() {}));
        return new RemoteFunctionCall<Tuple5<String, BigInteger, BigInteger, BigInteger, Boolean>>(function,
                new Callable<Tuple5<String, BigInteger, BigInteger, BigInteger, Boolean>>() {
                    @Override
                    public Tuple5<String, BigInteger, BigInteger, BigInteger, Boolean> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple5<String, BigInteger, BigInteger, BigInteger, Boolean>(
                                (String) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue(), 
                                (Boolean) results.get(4).getValue());
                    }
                });
    }

    public RemoteFunctionCall<BigInteger> bidIndexes(BigInteger param0) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_BIDINDEXES, 
                Arrays.<Type>asList(new Uint256(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Tuple3<String, BigInteger, BigInteger>> bids(BigInteger param0, BigInteger param1) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_BIDS, 
                Arrays.<Type>asList(new Uint256(param0),
                new Uint256(param1)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple3<String, BigInteger, BigInteger>>(function,
                new Callable<Tuple3<String, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple3<String, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple3<String, BigInteger, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue());
                    }
                });
    }

    public RemoteFunctionCall<String> owner() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> renounceOwnership() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_RENOUNCEOWNERSHIP, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> transferOwnership(String newOwner) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_TRANSFEROWNERSHIP, 
                Arrays.<Type>asList(new Address(newOwner)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<byte[]> onERC721Received(String param0, String param1, BigInteger param2, byte[] param3) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ONERC721RECEIVED, 
                Arrays.<Type>asList(new Address(param0),
                new Address(param1),
                new Uint256(param2),
                new org.web3j.abi.datatypes.DynamicBytes(param3)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bytes4>() {}));
        return executeRemoteCallSingleValueReturn(function, byte[].class);
    }

    public RemoteFunctionCall<TransactionReceipt> setSudalFarm(String _contractAddress) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETSUDALFARM, 
                Arrays.<Type>asList(new Address(_contractAddress)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> createAuction(BigInteger _tokenId, BigInteger _time, BigInteger _firstPrice) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_CREATEAUCTION, 
                Arrays.<Type>asList(new Uint256(_tokenId),
                new Uint256(_time),
                new Uint256(_firstPrice)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple5<String, BigInteger, BigInteger, BigInteger, Boolean>> getAuctionByTokenId(BigInteger _tokenId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETAUCTIONBYTOKENID, 
                Arrays.<Type>asList(new Uint256(_tokenId)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Bool>() {}));
        return new RemoteFunctionCall<Tuple5<String, BigInteger, BigInteger, BigInteger, Boolean>>(function,
                new Callable<Tuple5<String, BigInteger, BigInteger, BigInteger, Boolean>>() {
                    @Override
                    public Tuple5<String, BigInteger, BigInteger, BigInteger, Boolean> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple5<String, BigInteger, BigInteger, BigInteger, Boolean>(
                                (String) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue(), 
                                (Boolean) results.get(4).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> bidOnAuction(BigInteger _tokenId, BigInteger _price, BigInteger weiValue) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_BIDONAUCTION, 
                Arrays.<Type>asList(new Uint256(_tokenId),
                new Uint256(_price)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function, weiValue);
    }

    public RemoteFunctionCall<Tuple3<List<String>, List<BigInteger>, List<BigInteger>>> getBidByTokenId(BigInteger _tokenId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETBIDBYTOKENID, 
                Arrays.<Type>asList(new Uint256(_tokenId)),
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Address>>() {}, new TypeReference<DynamicArray<Uint256>>() {}, new TypeReference<DynamicArray<Uint256>>() {}));
        return new RemoteFunctionCall<Tuple3<List<String>, List<BigInteger>, List<BigInteger>>>(function,
                new Callable<Tuple3<List<String>, List<BigInteger>, List<BigInteger>>>() {
                    @Override
                    public Tuple3<List<String>, List<BigInteger>, List<BigInteger>> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple3<List<String>, List<BigInteger>, List<BigInteger>>(
                                convertToNative((List<Address>) results.get(0).getValue()), 
                                convertToNative((List<Uint256>) results.get(1).getValue()), 
                                convertToNative((List<Uint256>) results.get(2).getValue()));
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> endAuction(BigInteger  _tokenId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_ENDAUCTION, 
                Arrays.<Type>asList(new Uint256(_tokenId)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static SudalAuction load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new SudalAuction(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static SudalAuction load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new SudalAuction(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static SudalAuction load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new SudalAuction(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static SudalAuction load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new SudalAuction(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<SudalAuction> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(SudalAuction.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<SudalAuction> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(SudalAuction.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<SudalAuction> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(SudalAuction.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<SudalAuction> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(SudalAuction.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static class OwnershipTransferredEventResponse extends BaseEventResponse {
        public String previousOwner;

        public String newOwner;
    }
}
