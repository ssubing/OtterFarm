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
    public static final String BINARY = "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b61210b806200010e6000396000f3fe6080604052600436106100dd5760003560e01c80637b3c4baa1161007f578063b9a2de3a11610059578063b9a2de3a146102e3578063cda4beef1461030c578063ee9b80a414610349578063f2fde38b14610372576100dd565b80637b3c4baa1461025d5780638da5cb5b1461029c5780639f635120146102c7576100dd565b80631f568b08116100bb5780631f568b081461019b578063571a26a0146101c4578063715018a614610205578063774132671461021c576100dd565b80630bf876c4146100e2578063150b7a021461011f57806316437d211461015c575b600080fd5b3480156100ee57600080fd5b50610109600480360381019061010491906117e2565b61039b565b604051610116919061181e565b60405180910390f35b34801561012b57600080fd5b50610146600480360381019061014191906118fc565b6103b3565b60405161015391906119bf565b60405180910390f35b34801561016857600080fd5b50610183600480360381019061017e91906117e2565b6103c8565b60405161019293929190611b56565b60405180910390f35b3480156101a757600080fd5b506101c260048036038101906101bd9190611ba2565b610682565b005b3480156101d057600080fd5b506101eb60048036038101906101e691906117e2565b6106ce565b6040516101fc959493929190611bf9565b60405180910390f35b34801561021157600080fd5b5061021a610731565b005b34801561022857600080fd5b50610243600480360381019061023e91906117e2565b610745565b604051610254959493929190611bf9565b60405180910390f35b34801561026957600080fd5b50610284600480360381019061027f9190611c4c565b61082a565b60405161029393929190611c8c565b60405180910390f35b3480156102a857600080fd5b506102b1610891565b6040516102be9190611cc3565b60405180910390f35b6102e160048036038101906102dc9190611c4c565b6108ba565b005b3480156102ef57600080fd5b5061030a600480360381019061030591906117e2565b610deb565b005b34801561031857600080fd5b50610333600480360381019061032e9190611cde565b611102565b6040516103409190611d31565b60405180910390f35b34801561035557600080fd5b50610370600480360381019061036b9190611ba2565b6113fb565b005b34801561037e57600080fd5b5061039960048036038101906103949190611ba2565b611447565b005b60056020528060005260406000206000915090505481565b600063150b7a0260e01b905095945050505050565b60608060606000600560008681526020019081526020016000205467ffffffffffffffff8111156103fc576103fb611d4c565b5b60405190808252806020026020018201604052801561042a5781602001602082028036833780820191505090505b5090506000600560008781526020019081526020016000205467ffffffffffffffff81111561045c5761045b611d4c565b5b60405190808252806020026020018201604052801561048a5781602001602082028036833780820191505090505b5090506000600560008881526020019081526020016000205467ffffffffffffffff8111156104bc576104bb611d4c565b5b6040519080825280602002602001820160405280156104ea5781602001602082028036833780820191505090505b50905060005b600560008981526020019081526020016000205481101561066e576004600089815260200190815260200160002081815481106105305761052f611d7b565b5b906000526020600020906003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684828151811061057557610574611d7b565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506004600089815260200190815260200160002081815481106105d4576105d3611d7b565b5b9060005260206000209060030201600101548382815181106105f9576105f8611d7b565b5b60200260200101818152505060046000898152602001908152602001600020818154811061062a57610629611d7b565b5b90600052602060002090600302016002015482828151811061064f5761064e611d7b565b5b602002602001018181525050808061066690611dd9565b9150506104f0565b508282829550955095505050509193909250565b61068a6114ca565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154908060040160009054906101000a900460ff16905085565b6107396114ca565b6107436000611548565b565b600080600080600080600360008881526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152602001600382015481526020016004820160009054906101000a900460ff161515151581525050905080600001518160200151826040015183606001518460800151955095509550955095505091939590929450565b6004602052816000526040600020818154811061084657600080fd5b9060005260206000209060030201600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154905083565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690504260036000858152602001908152602001600020600201541161090357600080fd5b818173ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b815260040161093d9190611cc3565b602060405180830381865afa15801561095a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061097e9190611e36565b1161098857600080fd5b600060046000858152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015610a5957838290600052602060002090600302016040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481525050815260200190600101906109bd565b50505050905060006005600086815260200190815260200160002054905060008103610aa65760036000868152602001908152602001600020600301548411610aa157600080fd5b610add565b81600182610ab49190611e63565b81518110610ac557610ac4611d7b565b5b6020026020010151604001518411610adc57600080fd5b5b8273ffffffffffffffffffffffffffffffffffffffff166323b872dd3330876040518463ffffffff1660e01b8152600401610b1a93929190611e97565b6020604051808303816000875af1158015610b39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b5d9190611efa565b506000811115610c1b57600082600183610b779190611e63565b81518110610b8857610b87611d7b565b5b602002602001015190508373ffffffffffffffffffffffffffffffffffffffff1663a9059cbb826000015183604001516040518363ffffffff1660e01b8152600401610bd5929190611f27565b6020604051808303816000875af1158015610bf4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c189190611efa565b50505b610c23611724565b33816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505042816020018181525050848160400181815250508160046000888152602001908152602001600020805490501115610d245780600460008881526020019081526020016000208381548110610cb357610cb2611d7b565b5b906000526020600020906003020160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020155905050610dbf565b6004600087815260200190815260200160002081908060018154018082558091505060019003906000526020600020906003020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015550505b600182610dcc9190611f50565b6005600088815260200190815260200160002081905550505050505050565b6000600360008381526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152602001600382015481526020016004820160009054906101000a900460ff1615151515815250509050600060046000848152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015610f6d57838290600052602060002090600302016040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152505081526020019060010190610ed1565b5050505090506000600560008581526020019081526020016000205490508260800151610f9957600080fd5b82604001514211610fa957600080fd5b60008111156110bc57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8460000151846001856110039190611e63565b8151811061101457611013611d7b565b5b6020026020010151604001516040518363ffffffff1660e01b815260040161103d929190611f27565b6020604051808303816000875af115801561105c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110809190611efa565b506110b630836001846110939190611e63565b815181106110a4576110a3611d7b565b5b6020026020010151600001518661160c565b506110cd565b6110cb3084600001518661160c565b505b60006003600086815260200190815260200160002060040160006101000a81548160ff02191690831515021790555050505050565b600033846000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636352211e836040518263ffffffff1660e01b8152600401611163919061181e565b602060405180830381865afa158015611180573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111a49190611f99565b90508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146111de57600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342842e0e33308a6040518463ffffffff1660e01b815260040161123d93929190611e97565b600060405180830381600087803b15801561125757600080fd5b505af115801561126b573d6000803e3d6000fd5b5050505061127761175b565b33816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250504281602001818152505086426112c59190611f50565b81604001818152505085816060018181525050600181608001901515908115158152505080600360008a815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201556060820151816003015560808201518160040160006101000a81548160ff0219169083151502179055509050506000600560008a8152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff167f3249a06bd478adf780bb7930214ad005e9cfa517d63221c0b77f27199d1a58b3896040516113e4919061181e565b60405180910390a260019450505050509392505050565b6114036114ca565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b61144f6114ca565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036114be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114b590612049565b60405180910390fd5b6114c781611548565b50565b6114d261171c565b73ffffffffffffffffffffffffffffffffffffffff166114f0610891565b73ffffffffffffffffffffffffffffffffffffffff1614611546576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161153d906120b5565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff1663095ea7b385856040518363ffffffff1660e01b815260040161166f929190611f27565b600060405180830381600087803b15801561168957600080fd5b505af115801561169d573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff166323b872dd8686866040518463ffffffff1660e01b81526004016116de93929190611e97565b600060405180830381600087803b1580156116f857600080fd5b505af115801561170c573d6000803e3d6000fd5b5050505060019150509392505050565b600033905090565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081525090565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600081526020016000151581525090565b600080fd5b600080fd5b6000819050919050565b6117bf816117ac565b81146117ca57600080fd5b50565b6000813590506117dc816117b6565b92915050565b6000602082840312156117f8576117f76117a2565b5b6000611806848285016117cd565b91505092915050565b611818816117ac565b82525050565b6000602082019050611833600083018461180f565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061186482611839565b9050919050565b61187481611859565b811461187f57600080fd5b50565b6000813590506118918161186b565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f8401126118bc576118bb611897565b5b8235905067ffffffffffffffff8111156118d9576118d861189c565b5b6020830191508360018202830111156118f5576118f46118a1565b5b9250929050565b600080600080600060808688031215611918576119176117a2565b5b600061192688828901611882565b955050602061193788828901611882565b9450506040611948888289016117cd565b935050606086013567ffffffffffffffff811115611969576119686117a7565b5b611975888289016118a6565b92509250509295509295909350565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6119b981611984565b82525050565b60006020820190506119d460008301846119b0565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611a0f81611859565b82525050565b6000611a218383611a06565b60208301905092915050565b6000602082019050919050565b6000611a45826119da565b611a4f81856119e5565b9350611a5a836119f6565b8060005b83811015611a8b578151611a728882611a15565b9750611a7d83611a2d565b925050600181019050611a5e565b5085935050505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611acd816117ac565b82525050565b6000611adf8383611ac4565b60208301905092915050565b6000602082019050919050565b6000611b0382611a98565b611b0d8185611aa3565b9350611b1883611ab4565b8060005b83811015611b49578151611b308882611ad3565b9750611b3b83611aeb565b925050600181019050611b1c565b5085935050505092915050565b60006060820190508181036000830152611b708186611a3a565b90508181036020830152611b848185611af8565b90508181036040830152611b988184611af8565b9050949350505050565b600060208284031215611bb857611bb76117a2565b5b6000611bc684828501611882565b91505092915050565b611bd881611859565b82525050565b60008115159050919050565b611bf381611bde565b82525050565b600060a082019050611c0e6000830188611bcf565b611c1b602083018761180f565b611c28604083018661180f565b611c35606083018561180f565b611c426080830184611bea565b9695505050505050565b60008060408385031215611c6357611c626117a2565b5b6000611c71858286016117cd565b9250506020611c82858286016117cd565b9150509250929050565b6000606082019050611ca16000830186611bcf565b611cae602083018561180f565b611cbb604083018461180f565b949350505050565b6000602082019050611cd86000830184611bcf565b92915050565b600080600060608486031215611cf757611cf66117a2565b5b6000611d05868287016117cd565b9350506020611d16868287016117cd565b9250506040611d27868287016117cd565b9150509250925092565b6000602082019050611d466000830184611bea565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611de4826117ac565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611e1657611e15611daa565b5b600182019050919050565b600081519050611e30816117b6565b92915050565b600060208284031215611e4c57611e4b6117a2565b5b6000611e5a84828501611e21565b91505092915050565b6000611e6e826117ac565b9150611e79836117ac565b9250828203905081811115611e9157611e90611daa565b5b92915050565b6000606082019050611eac6000830186611bcf565b611eb96020830185611bcf565b611ec6604083018461180f565b949350505050565b611ed781611bde565b8114611ee257600080fd5b50565b600081519050611ef481611ece565b92915050565b600060208284031215611f1057611f0f6117a2565b5b6000611f1e84828501611ee5565b91505092915050565b6000604082019050611f3c6000830185611bcf565b611f49602083018461180f565b9392505050565b6000611f5b826117ac565b9150611f66836117ac565b9250828201905080821115611f7e57611f7d611daa565b5b92915050565b600081519050611f938161186b565b92915050565b600060208284031215611faf57611fae6117a2565b5b6000611fbd84828501611f84565b91505092915050565b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612033602683611fc6565b915061203e82611fd7565b604082019050919050565b6000602082019050818103600083015261206281612026565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600061209f602083611fc6565b91506120aa82612069565b602082019050919050565b600060208201905081810360008301526120ce81612092565b905091905056fea2646970667358221220a33a601e98f380251f4f36a06a4140a32a83446f2203af7e6ac053b762d7beb264736f6c63430008100033";

    public static final String FUNC_AUCTIONS = "auctions";

    public static final String FUNC_BIDINDEXES = "bidIndexes";

    public static final String FUNC_BIDS = "bids";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_RENOUNCEOWNERSHIP = "renounceOwnership";

    public static final String FUNC_TRANSFEROWNERSHIP = "transferOwnership";

    public static final String FUNC_ONERC721RECEIVED = "onERC721Received";

    public static final String FUNC_SETERC20 = "setErc20";

    public static final String FUNC_SETSUDALFARM = "setSudalFarm";

    public static final String FUNC_CREATEAUCTION = "createAuction";

    public static final String FUNC_GETAUCTIONBYTOKENID = "getAuctionByTokenId";

    public static final String FUNC_BIDONAUCTION = "bidOnAuction";

    public static final String FUNC_GETBIDBYTOKENID = "getBidByTokenId";

    public static final String FUNC_ENDAUCTION = "endAuction";

    public static final Event AUCTIONCREATED_EVENT = new Event("AuctionCreated", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event OWNERSHIPTRANSFERRED_EVENT = new Event("OwnershipTransferred", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}));
    ;

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
        _addresses.put("1337", "0xEdD9801198Ee41e4E84C3785226849a0cF4d0007");
        _addresses.put("202112031219", "0x8B1686593F8f4Df69D9b4dE42C80716703460d06");
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

    public List<AuctionCreatedEventResponse> getAuctionCreatedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(AUCTIONCREATED_EVENT, transactionReceipt);
        ArrayList<AuctionCreatedEventResponse> responses = new ArrayList<AuctionCreatedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            AuctionCreatedEventResponse typedResponse = new AuctionCreatedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.seller = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.tokenId = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<AuctionCreatedEventResponse> auctionCreatedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, AuctionCreatedEventResponse>() {
            @Override
            public AuctionCreatedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(AUCTIONCREATED_EVENT, log);
                AuctionCreatedEventResponse typedResponse = new AuctionCreatedEventResponse();
                typedResponse.log = log;
                typedResponse.seller = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.tokenId = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<AuctionCreatedEventResponse> auctionCreatedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(AUCTIONCREATED_EVENT));
        return auctionCreatedEventFlowable(filter);
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

    public RemoteFunctionCall<TransactionReceipt> setErc20(String _contractAddress) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETERC20, 
                Arrays.<Type>asList(new Address(_contractAddress)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
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

    public RemoteFunctionCall<TransactionReceipt> endAuction(BigInteger _tokenId) {
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

    public static class AuctionCreatedEventResponse extends BaseEventResponse {
        public String seller;

        public BigInteger tokenId;
    }

    public static class OwnershipTransferredEventResponse extends BaseEventResponse {
        public String previousOwner;

        public String newOwner;
    }
}
