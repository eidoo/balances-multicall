const Web3 = require('web3')

const web3 = new Web3()

const buildCreate2Address = (_saltHex, _byteCode) => {
  return `0x${web3.utils
    .sha3(`0x${['ff', _saltHex, web3.utils.sha3(_byteCode)].map((x) => x.replace(/0x/, '')).join('')}`)
    .slice(-40)}`.toLowerCase()
}

const FACTORY_CONTRACT_ADDRESS = ''
const SALT = '0x1'

const main = async () => {
  const factory = new ethers.Contract(
    FACTORY_CONTRACT_ADDRESS,
    [
      {
        inputs: [
          {
            internalType: 'bytes',
            name: 'code',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
        ],
        name: 'deploy',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    await ethers.getSigner()
  )

  const balanceChecker = await ethers.getContractFactory('BalanceChecker')
  await factory.deploy(balanceChecker.bytecode, SALT)
  const deployedAt = buildCreate2Address(balanceChecker.bytecode, SALT)
  console.log(deployedAt)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
