const hre = require("hardhat");
const { Wallet, BigNumber } = require('ethers');
const syabi = require('./smartyieldabi.json');
async function main() {
    const [deployerSign, ...signers] = (await ethers.getSigners());
    const sy = new hre.ethers.Contract("0x4B8d90D68F26DEF303Dcb6CFc9b63A1aAEC15840", syabi, deployerSign);
    console.log(await sy.abondGain());
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
