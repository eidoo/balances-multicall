# balances-multicall

Simple contract to get token balances in one single call. The contract is created using CREATE2 in order to have the same address on all chains.

&nbsp;

### Addresses

```js
Factory: 0xB10CeCcBe00572deE94cF0514581d3695A8Cd596
BalanceChecker: 0x07c7BBC98a251C85f1dD7958BA4786dc5eacF24d
```

&nbsp;

### Available Chains

* Ethereum
* Binance Smart Chain
* Polygon
* Fantom
* Avalance C-Chain

&nbsp;

***

&nbsp;

## :rocket: How to use it

```js
const web3 = new Web3(provider)
const contract = new web3.eth.Contract(
[
    {
    inputs: [
        {
        internalType: 'address[]',
        name: '_users',
        type: 'address[]'
        },
        {
        internalType: 'address[]',
        name: '_tokens',
        type: 'address[]'
        }
    ],
    name: 'balances',
    outputs: [
        {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
        }
    ],
    stateMutability: 'view',
    type: 'function'
    }
],
'0x07c7BBC98a251C85f1dD7958BA4786dc5eacF24d'
)
const balances = await contract.methods.balances(_addresses, _tokens).call()
```

&nbsp;

***

&nbsp;

## :white_check_mark: Publish & Verify

Create an __.env__ file with the following fields:

```
MAINNET_PRIVATE_KEY=
ROPSTEN_PRIVATE_KEY=
ROSPTENT_NODE=
ETH_MAINNET_NODE=
ETHERSCAN_API_KEY=
BSC_MAINNET_NODE=
BSC_MAINNET_PRIVATE_KEY=
POLYGON_MAINNET_NODE=
POLYGON_MAINNET_PRIVATE_KEY=
FANTOM_MAINNET_NODE=
FANTOM_MAINNET_PRIVATE_KEY=
AVALANCHEC_MAINNET_NODE=
AVALANCHEC_MAINNET_PRIVATE_KEY=
```


### publish


```
❍ npx hardhat run --network mainnet scripts/deploy-script.js
```

### verify

```
❍ npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
```
