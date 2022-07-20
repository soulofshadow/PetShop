pragma solidity ^0.5.0;

contract Adoption {
    address[16] public adopters;
    uint public amount = 5 ether;
    
    // Adopting a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId <= 15);
        adopters[petId] = msg.sender;
        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }

    // Abondon
    function abondon(uint petId) public returns (uint) {
        address expected = msg.sender;
        address onwer = adopters[petId];
        require(expected == onwer);
        delete adopters[petId];
        return petId;
    }

    //Send
    function send(address payable _addr) payable public {
        //require(balanceOf() >= amount);
        _addr.transfer(amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function() external payable {
    // this function enables the contract to receive funds
    }
}
