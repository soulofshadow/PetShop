const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
  let adoption;
  let expectedAdopter;

  let amount
  const acc1 = accounts[0]
  const acc2 = accounts[1]

  before(async () => {
      adoption = await Adoption.deployed();
  });

  describe("adopting a pet and retrieving account addresses", async () => {
    before("adopt a pet using accounts[0]", async () => {
      await adoption.adopt(8, { from: accounts[0] });
      expectedAdopter = accounts[0];
    });
    it("can fetch the address of an owner by pet id", async () => {
        const adopter = await adoption.adopters(8);
        assert.equal(adopter, expectedAdopter, "The owner of the adopted pet should be the first account.");
      });

    it("can fetch the collection of all pet owners' addresses", async () => {
        const adopters = await adoption.getAdopters();
        assert.equal(adopters[8], expectedAdopter, "The owner of the adopted pet should be in the collection.");
    });

    it('Should get the amount required for sending', async () => {
      const { contract: { methods }}= await adoption;
      amount = await methods.amount().call()
    });
  
    it(`Should send the amount to a the receiver contract`, async () => {
      const { contract: { methods }} = await adoption;
      const { address } = await adoption;
      console.log("contract address: " + address);
      const recBalanceBefore = await web3.eth.getBalance(address)
      await methods.send(address).send({from: acc1, value: amount})
      const recBalanceAfter = await web3.eth.getBalance(address)
      console.log("contract balance: " + recBalanceAfter);
      assert.isTrue(parseInt(recBalanceAfter) - parseInt(recBalanceBefore) == amount)
    });
  
    it(`Should send the amount to another address`, async () => {
      const { contract: { methods }} = await adoption
      const acc2BalanceBefore = await web3.eth.getBalance(acc2)
      await methods.send(acc2).send({from: acc1, value: amount})
      const acc2BalanceAfter = await web3.eth.getBalance(acc2)
      assert.isTrue(parseInt(acc2BalanceAfter) - parseInt(acc2BalanceBefore) == amount)
    });
  });
});
