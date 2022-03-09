import web3 from './web3';
import Bridge from "./contracts/bridge.json";

const bridgeAddress = '0x19Dcc5d3753404Db0b98016f32557A9f3b54572a';
const ebridge = new web3.eth.Contract(Bridge.abi, bridgeAddress);

export default ebridge;
