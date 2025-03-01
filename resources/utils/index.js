import { addHexPrefix } from 'ethereumjs-util'

const weiToGwei = v => v / 1e9
const weiToHex = wei => addHexPrefix(wei.toString(16))
const gweiToWei = v => v * 1e9
const gweiToHex = gwei => weiToHex(gwei * 1e9)
const intToHex = v => '0x' + v.toString(16)
const hexToInt = v => parseInt(v, 'hex')
const weiHexToGweiInt = v => hexToInt(v) / 1e9
const gweiToWeiHex = v => intToHex(gweiToWei(v))

function randomLetters (num) {
  return [...Array(num)].map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')
}

export {
  randomLetters,
  weiToGwei,
  weiToHex,
  gweiToWei,
  gweiToHex,
  intToHex,
  hexToInt,
  weiHexToGweiInt, 
  gweiToWeiHex
}
