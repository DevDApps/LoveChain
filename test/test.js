const LoveChain = artifacts.require('./LoveChain.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('LoveChain', ([deployer, author, tipper]) => {
  let LoveChain

  before(async () => {
    LoveChain = await LoveChain.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await LoveChain.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await LoveChain.name()
      assert.equal(name, 'LoveChain')
    })
  })

  describe('images', async () => {
    let result, imageCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

    before(async () => {
      result = await LoveChain.uploadImage(hash, 'test@test.net', { from: author })
      imageCount = await LoveChain.imageCount()
    })

    //check event
    it('creates images', async () => {
      // SUCESS
      assert.equal(imageCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.email, 'test@test.net', 'email address is correct')
      assert.equal(event.author, author, 'author is correct')


      // FAILURE: Image must have hash
      await LoveChain.uploadImage('', 'test@test.net', { from: author }).should.be.rejected;

      // FAILURE: Image must have description
      await LoveChain.uploadImage('Image hash', '', { from: author }).should.be.rejected;
    })

    //check from Struct
    it('lists images', async () => {
      const image = await edCeLoveChainrt.images(imageCount)
      assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(image.hash, hash, 'Hash is correct')
      assert.equal(image.email, 'email address', 'description is correct')
      assert.equal(image.author, author, 'author is correct')
    })

  })
})
