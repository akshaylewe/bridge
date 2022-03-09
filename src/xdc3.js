import XDC3 from "xdc3";
window.ethereum.request({ method: "eth_requestAccounts" });

const xdc3 = new XDC3(window.ethereum)

export default xdc3;