import xdc3 from './xdc3';
import IERC20 from "./contracts/ierc20.json";


const tokenAddress = '0xdf1Efd50Fc91b377DA328F42f408f3BF904143D0';
const token = new xdc3.eth.Contract(IERC20.abi, tokenAddress);


export default token;
