# WIP

# Idle Barnbridge Smart Yield

## Specs

[SPEC.md](./SPEC.md)

## Local Mainnet Fork

## Deploy

`npx hardhat run scripts/deploy-mainnet-fork-idle-dai.js --network hardhat`

```
================EXTERNAL ADDRESSES=================
DAO: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
IdleDAI: 0x3fe7940616e5bc47b0775a0dccf6237893353bb4
IdleGov: 0x875773784Af8135eA0ef43b5a374AaD105c5D39e
DAI: 0x6b175474e89094c44da98b954eedeac495271d0f
WETH: 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
===================================================
=====================DEPLOYED======================
bondModel: 0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1
idleProvider: 0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44
smartYield: 0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f
seniorBond: 0x4A679253410272dd5232B3Ff7cF5dbB88f295319
juniorBond: 0x7a2088a1bFc9d81c55368AE168C2C02570cB814F
idleController: 0x09635F643e140090A9A8Dcd712eD6285858ceBef
oracle: 0xc5a5C42992dECbae36851359345FE25997F5C42d
===================================================
Tranfer DAI from DAI millionaire to deployer...
Approve Idle Provider to spend DAI...
Buying Junior Tokens...
Buying Senior Bond...
Check senior bond added...
Owner of Senior Bond NFT 1: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Approving junior tokens...
Junior Tokens Sale...
Buy Junior Bond...
Idle Average APR: 11365230874445107601
SY abondGain: 6550097644035748
SY abondPaid: 644396180258
SY abondDebt: 6549453247855490
```

##
