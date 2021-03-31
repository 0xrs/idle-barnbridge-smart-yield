// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { Wallet, BigNumber } = require('ethers');

const A_HOUR = 60 * 60;
const seniorBondCONF = { name: 'BarnBridge IdleDAI sBOND', symbol: 'bbsidleDAI' };
const juniorBondCONF = { name: 'BarnBridge IdleDAI jBOND', symbol: 'bbjidleDAI' };
const juniorTokenCONF = { name: 'BarnBridge IdleDai', symbol: 'bbidleDAI' };
const oracleCONF = { windowSize: A_HOUR, granularity: 4 };
const decimals = 18; // same as DAI
// const dao = '0x0';
// const feesOwner = dao;
const IDLE_DAI_CONTRACT = "0x295CA5bC5153698162dDbcE5dF50E436a58BA21e";
const IDLE_GOV_TOKEN = "0xAB6Bdb5CCF38ECDa7A92d04E86f7c53Eb72833dF";
const DAI_ADDRESS = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
const WETH = '0xd0A1E359811322d97991E03f863a0C30C2cF029C';

const uniswapPath = [IDLE_GOV_TOKEN, WETH, DAI_ADDRESS];

async function main() {
    const [deployerSign, ...signers] = (await ethers.getSigners());
    console.log('Deployer:', deployerSign.address);
    console.log('Others:', signers.map(a => a.address));
    const dao = deployerSign.address;
    const feesOwner = dao;
    const BondModel = await hre.ethers.getContractFactory("BondModelV1");
    const bondModel = await BondModel.deploy();
    await bondModel.deployed();

    const Provider = await hre.ethers.getContractFactory("IdleProvider");
    const pool = await Provider.deploy(IDLE_DAI_CONTRACT, DAI_ADDRESS);
    await pool.deployed();

    const SmartYield = await hre.ethers.getContractFactory("SmartYield");
    const smartYield = await SmartYield.deploy(juniorTokenCONF.name, juniorTokenCONF.symbol, BigNumber.from(decimals));
    await smartYield.deployed();

    const SeniorBond = await hre.ethers.getContractFactory("SeniorBond");
    const seniorBond = await SeniorBond.deploy(smartYield.address, seniorBondCONF.name, seniorBondCONF.symbol);
    await seniorBond.deployed();

    const JuniorBond = await hre.ethers.getContractFactory("JuniorBond");
    const juniorBond = await JuniorBond.deploy(smartYield.address, juniorBondCONF.name, juniorBondCONF.symbol);
    await juniorBond.deployed();

    const Controller = await hre.ethers.getContractFactory("IdleController");
    const controller = await Controller.deploy(pool.address, smartYield.address, bondModel.address, uniswapPath);
    await controller.deployed();

    const Oracle = await hre.ethers.getContractFactory("YieldOracle");
    const oracle = await Oracle.deploy(controller.address, oracleCONF.windowSize, oracleCONF.granularity);
    await oracle.deployed();

    await controller.setOracle(oracle.address);
    await controller.setFeesOwner(feesOwner);
    await smartYield.setup(controller.address, pool.address, seniorBond.address, juniorBond.address);
    await pool.setup(smartYield.address, controller.address);

    await controller.setGuardian(dao);
    await controller.setDao(dao);

    console.log('CONF --------');
    console.log('DAO:', dao);
    console.log('IdleDAI:', IDLE_DAI_CONTRACT);
    console.log('IdleGov:', IDLE_GOV_TOKEN);
    console.log('DAI:', DAI_ADDRESS);
    console.log('WETH:', WETH);
    console.log('uniswapPath:', uniswapPath);
    console.log('');
    console.log('DEPLOYED ----');
    console.log('bondModel:', bondModel.address);
    console.log('compoundProvider:', pool.address);
    console.log('smartYield:', smartYield.address);
    console.log('seniorBond:', seniorBond.address);
    console.log('juniorBond:', juniorBond.address);
    console.log('controller:', controller.address);
    console.log('oracle:', oracle.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
