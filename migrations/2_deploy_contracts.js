/*THIS IS WORKING ON THE TESTNET*/ 

//Grab the artifacts, so the compiled code from the templateToken
//const templateToken = artifacts.require("templateToken_requester");
const CocktailToken = artifacts.require("CocktailToken_Contract")
//Deploy the contract
module.exports = function (deployer) {
    deployer.deploy(CocktailToken);
  };
  