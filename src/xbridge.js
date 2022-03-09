import web3 from './xdc3';
import Bridge from "./contracts/bridge.json";


const bridgeAddress = '0xE4200cbf10ea0D3F8FE35B59cF9fCF21e911a743';
const xbridge = new web3.eth.Contract(Bridge.abi, bridgeAddress);


export default xbridge;
