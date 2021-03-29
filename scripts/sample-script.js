// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const A_HOUR = 60 * 60;
const seniorBondCONF = { name: 'BarnBridge cUSDC sBOND', symbol: 'bbscUSDC' };
const juniorBondCONF = { name: 'BarnBridge cUSDC jBOND', symbol: 'bbjcUSDC' };
const juniorTokenCONF = { name: 'BarnBridge cUSDC', symbol: 'bbcUSDC' };
const oracleCONF = { windowSize: A_HOUR, granularity: 4 };
const decimals = 18; // same as DAI
const dao = '0x0';
const feesOwner = dao;
const IdleDaiContract = "0x295CA5bC5153698162dDbcE5dF50E436a58BA21e";
const IdleGovToken = "0xAB6Bdb5CCF38ECDa7A92d04E86f7c53Eb72833dF";

async function main() {
    const [deployerSign, ...signers] = (await ethers.getSigners()) as unknown[] as Wallet[];
    
    // const Greeter = await hre.ethers.getContractFactory("Greeter");
    // const greeter = await Greeter.deploy("Hello, Hardhat!");
    // await greeter.deployed();
    // console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
