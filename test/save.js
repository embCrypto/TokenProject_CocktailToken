/*
describe('Minting Test', async() =>
    {
        it('creates a new token', async() =>
        {
            const mint_result = await contract.mint('https...1')
            const contract_totalSupply = await contract.totalSupply

            //check that now the total supply is 1, so first minting was successful
            assert.equal(contract_totalSupply, 1)

            //catch the event from Transfer, raised by the mint function
            const event = mint_result.logs[0].arg;
            //check the data of the logs
            //check that they are sent from address 0
            assert.equal(event._from, '0x0000000000000000000000000000000000000000', 'from the contract')
            //check that they are sent to the address 0f the contract owner
            assert.equal(event._to, accounts[0], 'to is msg.sender')

            //Failure
            await contract.mint('https...1').should.be.rejected;
        })
    }
})*/