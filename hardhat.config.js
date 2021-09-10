require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-waffle')
require('hardhat-gas-reporter')

const getEnvironmentVariable = (_envVar) => process.env[_envVar]

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.7.3',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    local: {
      /*forking: {
        url: `${getEnvironmentVariable('ETH_MAINNET_NODE')}`,
      },*/
      url: `http://127.0.0.1:8545`,
    },
    ropsten: {
      url: `${getEnvironmentVariable('ROPSTEN_NODE')}`,
      accounts: [getEnvironmentVariable('ROPSTEN_PRIVATE_KEY')],
      gas: 200e9,
      gasPrice: 10e9,
    },
    mainnet: {
      url: `${getEnvironmentVariable('ETH_MAINNET_NODE')}`,
      accounts: [getEnvironmentVariable('MAINNET_PRIVATE_KEY')],
      gasPrice: 85e9,
      gas: 200e9,
    },
    bsc: {
      url: getEnvironmentVariable('BSC_MAINNET_NODE'),
      accounts: [getEnvironmentVariable('BSC_MAINNET_PRIVATE_KEY')],
      gasPrice: 7e9,
      gas: 200e9,
    },
  },
  etherscan: {
    apiKey: getEnvironmentVariable('ETHERSCAN_API_KEY'),
  },
  gasReporter: {
    enabled: true,
  },
  mocha: {
    timeout: 200000,
  },
}
