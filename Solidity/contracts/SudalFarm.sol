// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./@openzeppelin/contracts/utils/Counters.sol";
import "./@openzeppelin/contracts/access/Ownable.sol";
import "./@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SudalFarm is ERC721URIStorage, Ownable {

    event NewSudal(address indexed owner, uint id, uint dna);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Sudal {
        string name;
        uint id;
        uint dna;
    }

    Sudal[] public sudals;


    constructor() ERC721("SudalNFT", "NFT") {}

    function withdraw() external payable onlyOwner() {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function _createSudal(string memory _name, uint _dna)
        public onlyOwner
        returns (uint256)
    {
        Sudal memory newSudal = Sudal(_name, _tokenIds.current(), _dna);
        sudals.push(newSudal);

        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
//        _setTokenURI(newItemId, tokenURI);

        emit NewSudal(msg.sender, newItemId, _dna);

        _tokenIds.increment();

        return newItemId;
    }

    function getSudals() external view returns(string[] memory, uint[] memory, uint[] memory) {
        string[] memory names = new string[](sudals.length);
        uint[] memory ids = new uint[](sudals.length);
        uint[] memory dnas = new uint[](sudals.length);
        uint256 count = 0;
        for (uint i = 0; i < sudals.length; i++){
            names[count] = sudals[i].name;
            ids[count] = sudals[i].id;
            dnas[count] = sudals[i].dna;
            count++;
        }
        return (names, ids, dnas);
    }

    function getSudalsByOwner(address _owner) external view returns(string[] memory, uint[] memory, uint[] memory) {
        string[] memory names = new string[](balanceOf(_owner));
        uint[] memory ids = new uint[](balanceOf(_owner));
        uint[] memory dnas = new uint[](balanceOf(_owner));
        uint256 count = 0;
        for (uint i = 0; i < sudals.length; i++){
            if (ownerOf(i) == _owner) {
                names[count] = sudals[i].name;
                ids[count] = sudals[i].id;
                dnas[count] = sudals[i].dna;
                count++;
            }
        }
        return (names, ids, dnas);
    }
}
