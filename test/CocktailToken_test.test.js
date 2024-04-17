//get the chai library
const {assert} = require('chai')

//get the contract
const myToken = artifacts.require("src/abis/CocktailToken_Contract");


// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

//add the test data
test_contractName = 'CocktailToken'
test_contractSymbol = 'CCK'
test_contractSupply = 1000000000 * 10 **18
test_owner = "0xeC221865CAfafdbf84d364DB639984e04DD77E77"

test_transfer_fee = 5;
test_burn_fee = 10;

totalAmount = 1000000000 * 10 **18
transferFee = 5;


//grabs the contract and the accounts from Ganache
contract('myToken', (accounts) => {
    let contract
    // before tells our tests to run this first before anything else 
    before( async () => {
    contract = await myToken.deployed() 
    })
    
    // testing container - describe 
    //check that the contract is deployed correctly
    describe('Deployment Test', async() => 
    {
        it('Deploys successfully, address of the contract is valid', async() =>
        {
            //same like writing in the terminal
            const address = contract.address;

            //test that the address is not empty
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })
        it('Deploys successfully, name of the token contract is correct', async() =>
        {
            const contract_name = await contract.name()
            assert.equal(contract_name, test_contractName)
        })

        it('deploys successfully, symbol of the token contract is valid', async() =>
        {
            const contract_symbol = await contract.symbol()
            assert.equal(contract_symbol, test_contractSymbol)
        })

        it('deploys successfully, total supply of the token contract is correct', async() =>
        {
            const contract_totalSupply = await contract.totalSupply()
            assert.equal(contract_totalSupply, test_contractSupply)
        })
    })


        
    describe('Static function test', async ()=>
    {
        it('static function - check the correct owner address', async () => {
            const ownerThis = await contract.owner()
            assert.equal(ownerThis, test_owner)
        })
    })

    describe('Functional tests', async ()=>
    {
        it('Test - mint function', async () => {
            const result = await contract.mint(50)
            const totalSupply = await contract.totalSupply()
            assert.equal(totalSupply, test_contractSupply+50)
        })

        it('Test - transfer and blacklist function', async () => {
            //give amount to account3
            await contract.transfer(accounts[3], 1000)
            const amonut_acc3 = await contract.balanceOf(accounts[3]) //950

            transferFeeAmount = (1000 * transferFee) / 100 //50
            assert.equal(transferFeeAmount, 50, 'transferFee must equal 50')

            assert.equal(amonut_acc3, 1000-transferFeeAmount, 'transfer to Account3 is not successful')

             
            //add account to blacklist
            await contract.addToBlackList(accounts[3]);
            //check that the transfer is now blocked
            await contract.transfer(accounts[3], 100).should.be.rejected;


            //remove account from blacklist
            await contract.removeFromBlacklist(accounts[3]);
            //check that the transfer is now blocked
            await contract.transfer(accounts[3], 300)
            const amonut_acc3_sec = await contract.balanceOf(accounts[3]) //1235
            transferFeeAmount2 = (300 * transferFee) / 100 //15
            expectedAmount = amonut_acc3.words[0] + 350 - transferFeeAmount2
            //assert.equal(amonut_acc3_sec, expectedAmount, 'transfer to and removal from blacklist of Account3 is successful')
            
        })

        it('Test - transferFrom ', async () => {
            await contract.transfer(accounts[2], 800)
            amonut_acc2 = await contract.balanceOf(accounts[2])
            transferFeeAmount = (800 * transferFee) / 100
            assert.equal(amonut_acc2.words[0], 800-transferFeeAmount, 'normal transfer to Account2 is successful')

            amonut_acc1 = await contract.balanceOf(accounts[1])
            assert.equal(amonut_acc1, 0, 'account1 is empty, as expected')

            contract.approve(accounts[2],300)
            //await contract.transferFrom(accounts[2],accounts[1], 15)
            /*
            amonut_acc2_second = await contract.balanceOf(accounts[2])
            assert.equal(amonut_acc2, 790, 'reduced amount from account2 with sent amount')
            amonut_acc1 = await contract.balanceOf(accounts[1])
            assert.equal(amonut_acc1, 10, 'increased amount from account2 with received amount')
            */
        })

        it('Test - burn ', async () => {
            initAmount = contract.balanceOf(accounts[0])
            contract.burn(500)
            burnAmountFee = (500 * test_burn_fee) / 100
            secAmount = contract.balanceOf(accounts[0])
           
            //assert.equal(secAmount, initAmount - burnAmountFee-500, "Error")
        })
    
    })

}) 