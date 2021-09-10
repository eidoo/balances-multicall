const buildCreate2Address = (_creatorAddress, _saltHex, _byteCode) => {
  return `0x${ethers.utils
    .keccak256(
      `0x${['ff', _creatorAddress, _saltHex, ethers.utils.keccak256(_byteCode)]
        .map((x) => x.replace(/0x/, ''))
        .join('')}`
    )
    .slice(-40)}`.toLowerCase()
}

const numberToUint256 = (_value) => {
  const hex = _value.toString(16)
  return `0x${'0'.repeat(64 - hex.length)}${hex}`
}

const FACTORY_CONTRACT_ADDRESS = '0xB10CeCcBe00572deE94cF0514581d3695A8Cd596'
const SALT = 1

const main = async () => {
  const signer = await ethers.getSigner()
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
    signer
  )

  const balanceChecker = await ethers.getContractFactory('BalanceChecker')
  await factory.deploy(balanceChecker.bytecode, SALT, { gasLimit: 800000 })
  const deployedAt = buildCreate2Address(FACTORY_CONTRACT_ADDRESS, numberToUint256(SALT), balanceChecker.bytecode)
  console.log(deployedAt)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
