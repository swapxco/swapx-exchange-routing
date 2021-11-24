const Router = artifacts.require("FlatSwapXRouter.sol");
const WBNB = artifacts.require("WBNB.sol");

module.exports = async function (deployer, network, addresses) {
  let WBNBReference;
  let FACTORY_ADDRESS;

  if (network == 'testnet') {
    FACTORY_ADDRESS = '0xAd6944925b6c88613908748562A00200E7AD6cAE'; // The factory depoyed on the BSC testnet
    // Next I deploy the wrapped BNB token 
    await deployer.deploy(WBNB);
    WBNBReference = await WBNB.deployed();
  } else if (network == 'bsc') {
    FACTORY_ADDRESS = ''; // The already deployed factory
    // this is the actual WBNB token address
    WBNBReference = WBNB.at('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'); 
  } else {
    FACTORY_ADDRESS = '0xFFc4BBa6ABd4aC45a041b9725f8B7b795fAd6923'; // The factory deployed on Ganache
    // Next I deploy the wrapped BNB token 
    await deployer.deploy(WBNB);
    WBNBReference = await WBNB.deployed();
  }

  // I deploy the router with the factory address and the wrapped bnb address.
  await deployer.deploy(Router, FACTORY_ADDRESS, WBNBReference.address);
};
