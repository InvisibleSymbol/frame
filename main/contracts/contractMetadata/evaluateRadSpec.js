const { toChecksumAddress } = require('web3-utils')
const abiDecoder = require('abi-decoder')
const radspec = require('radspec')
// const provider = require('../main/provider')
const Web3 = require('web3')
const mapping = require('./mapping.json')
const openzeppelinContracts = require('./openzeppelin-contracts')

// TODO: Make async
const evaluateRadSpec = async ({ chainId = '0x1', data = '0x', to = '0x' }) => {
  const contractsInChain = mapping[chainId]
  if (!contractsInChain || Object.keys(contractsInChain).length === 0) return null
  const metaDataPath = contractsInChain[to] || contractsInChain[toChecksumAddress(to)]
  if (!metaDataPath) return null
  const metaData = openzeppelinContracts[metaDataPath]
  if (!metaData) return null
  abiDecoder.addABI(metaData.abi)
  const decoded = abiDecoder.decodeMethod(data)
  const signature = `${decoded.name}(${decoded.params.map(param => param.type).join(',')})`

  const expression =
    metaData.userdoc &&
    metaData.userdoc.methods &&
    metaData.userdoc.methods[signature] &&
    metaData.userdoc.methods[signature].notice

  if (!expression) return null

  const call = {
    transaction: { data, to },
    abi: metaData.abi
  }

  const web3 = new Web3(require('../main/provider'))
  return radspec.evaluate(expression, call, { eth: web3.eth })
}

module.exports = evaluateRadSpec
