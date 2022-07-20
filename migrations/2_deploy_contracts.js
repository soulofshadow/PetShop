var Adoption = artifacts.require("Adoption");
// var Receiver = artifacts.require("Receiver");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
  // deployer.deploy(Receiver);
};
