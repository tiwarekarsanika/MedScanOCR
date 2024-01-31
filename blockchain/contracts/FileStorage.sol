// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FileStorage {
    struct File {
        string fileName;
        string ipfsHash;
    }

    mapping(string => File) private files;

    function upload (string memory fileName, string memory ipfsHash) public {
        files[fileName] = File(fileName, ipfsHash);
    }

    function getIPFSHash(string memory fileName) public view returns (string memory) {
        return files[fileName].ipfsHash;
    }
}
