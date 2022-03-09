import web3 from './web3';
import Deploy from "./contracts/deployer.json";
const deployerAddress = '0xeB186e9BA850a710FaA241E48770D5260f9b0ab6';
const deploy = new web3.eth.Contract(Deploy.abi, deployerAddress);
export default deploy;