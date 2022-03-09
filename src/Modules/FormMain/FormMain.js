import React, { useState } from 'react';

import exchange from "../../assets/exchange.png";
import ethereum_img from "../../assets/ethereum.svg";

import { toast } from "react-toastify";
import xdc3 from "../../xdc3";
import web3 from "../../web3";
import token from "../../xtoken";
import xbridge from "../../xbridge";
import ebridge from '../../ebridge';
import deploy from '../../deploy';

import "./FormMain.css";
import { matchRoutes } from "react-router-dom";

let debridgeId, submissionId;

function FormMain ()  {



  const [submissionId , setSubmissionId] = useState("");
  const [buttonText , setButtonText] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [hash , setHash] = useState("");
  const [hasher , setHasher] = useState("");



  web3.eth.getAccounts(function(err, accounts){
    if (err != null) console.error("An error occurred: "+err);
    else if (accounts.length == 0   ) setButtonText("Connect Wallet");
    else setButtonText("Send Amount");
});
  const  OnSubmit = async (event) => {
  event.preventDefault();


  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x33' }],
    });
  const accounts = await xdc3.eth.getAccounts();
console.log("accounts", accounts[0]);
await token.methods.approve(address, xdc3.utils.toWei(amount, "ether")).send({ from: accounts[0] });

  let result = await xbridge.methods.send(
        "0xdf1Efd50Fc91b377DA328F42f408f3BF904143D0",//address _tokenAddress,
        xdc3.utils.toWei(amount, "ether"), // token _amount
        '42',// _chainIdTo
        address, //_receiver
        "0x", // _permit
      false, //_useAssetFee
      0, //_referralCode
      "0x" //_autoParams
  ).send({
    from: accounts[0],
    value: xdc3.utils.toWei(amount, "ether"),
  });
  alert();
  setSubmissionId(result.events.Sent.returnValues[0]);
   const debridgeId = result.events.Sent.returnValues[1];
   setHash(result.transactionHash);

  console.log(submissionId, debridgeId);
  // console.log(submissionId);
};



const onClick = async (event) => {

  event.preventDefault();




await window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x3' }],
  });
  
  console.log(submissionId, debridgeId);
  const accounts = await web3.eth.getAccounts();
  console.log("",accounts);
  const isSubmissionUsed = await ebridge.methods.isSubmissionUsed(submissionId).call();
  const debridge_id = await ebridge.methods.getDebridgeId(51, '0xeAe46f035CfAA057D31F9a3777285beC69d9679C').call();
  alert();
  console.log("debridgeId", debridge_id);
  const deployAsset = await deploy.methods.deployAsset(debridge_id, 'Token Mapped with XDC Chain', 'WXDC1', 18).call();
  const _token = '0xA6B1E581234E95963148E6Ea5Bbf9410C7971061'
  console.log(debridge_id, deployAsset, isSubmissionUsed, _token);
    
  const autoParamsFrom = await _packSubmissionAutoParamsFrom(web3, '0x');
  
  let result = await ebridge.methods.claim(
    debridge_id,
    amount,
    '51',
    address,
    submissionId,
    '0x',
    autoParamsFrom,
    _token
).send({
  from: accounts[0],
  value: '0',
});
console.log("",submissionId);
alert();
setHasher(result.transactionHash);




async function _packSubmissionAutoParamsFrom(web3, autoParams) {
  if (autoParams !== '0x' && autoParams !== '') {
      const decoded = web3.eth.abi.decodeParameters(
          ['tuple(uint256,uint256, bytes, bytes)'], autoParams
      );
      const encoded = web3.eth.abi.encodeParameter(
          'tuple(uint256,uint256, address, bytes, bytes)',
          [decoded[0][0], decoded[0][1], decoded[0][2], decoded[0][3]]
      );
      return encoded;
  }
  return '0x';
}

};


function abc () {
if (window.ethereum) {
window.ethereum
.request({ method: "eth_requestAccounts" })
.then((result) => {
// accountChangeHandler(result[0]); //accounts can be a array we just wanna grab first one
console.log(result[0]);
// window.location.pathname = "/wallet";
})
.catch((e) => {
console.log(e);
});
} else {
alert("Install Metamask");
// setErrorMssg("Install Metamask");
toast.success("Connect Wallet");  
}
}

function XDC() {
  window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
        chainId: "0x33",
        rpcUrls: ["https://rpc.apothem.network"],
        chainName: "XDC ",
        nativeCurrency: {
            name: "XDC",
            symbol: "XDC",
            decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"]
    }]
  });
  }

  function bsc() {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0x89",
          rpcUrls: ["https://rpc-mainnet.matic.network/"],
          chainName: "Matic Mainnet",
          nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18
          },
          blockExplorerUrls: ["https://polygonscan.com/"]
      }]
    });
    }

  function xdc() {
    window.ethereum.request({
      method: "wallet_addApothemhain",
      params: [{
          chainId: "0x33",
          rpcUrls: ["https://rpc.apothem.network/"],
          chainName: "XDC",
          nativeCurrency: {
              name: "XDC",
              symbol: "XDC",
              decimals: 18
          },
          blockExplorerUrls: ["https://explorer.apothem.network/"]
      }]
    });
    }

   
  return (
    <div>
      <form>
        <div className="parent-row">
          <div className="fl">
            <div className="fs-12  c-b pt-3  left-label">Source</div>
            {/* <Link>Create</Link> */}
            <div className="block-chain-container">
              <div>
                <img src={ethereum_img} height="35px" />
              </div>
              <div className="block-chain-right ">
                <select className="input-box-1 fs-12 fw-b rm-border">
                  <option style={{ color: "#707070" }}>Select Category</option>

                  <option >2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
          </div>

          <img className="exchane-img fl-img" src={exchange} />

          <div className="fl">
            <div className="fs-12  c-b pt-3  left-label">Destination</div>
            {/* <Link>Create</Link> */}
            <div className="block-chain-container">
              <div>
                <img src={ethereum_img} height="35px" />
              </div>
              <div className="block-chain-right ">
                <select className="input-box-1 fs-12 fw-b rm-border">
                  <option style={{ color: "#707070" }}> Select Category</option>

                  <option  >2</option>
                  <option >3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="fs-12  c-b pt-3    left-label ">Select Token*</div>
          <div className="block-chain-container">
            <div>
              <img src={ethereum_img} height="35px" />
            </div>
            <div className="block-chain-right ">
              <select className="input-box-1 rm-border fs-12 fw-b">
                <option value="">Select Category</option>
                <option selected value="Ethereum">
                  Select Token
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="hint-label fs-10  c-b ">Copy XETH Token Address </div>
        <div className="fs-12  c-b pt-3  left-label">Amount*</div>
        <div>
          <input 
          type="text"
            className="input-box-1 fs-12 fw-b"
            placeholder="0"
            onChange={(e) => setAmount(e.target.value)}
           
          />
        </div>

        <div className="fs-12  c-b pt-3  left-label">Destination Address*</div>
        <div>
          <input             
          // value={this.state.toAddress}
            // onChange={(event) => this.setState({ value: event.target.toAddress })}
            type="name"
            className="input-box-1 fs-12 fw-b"
            placeholder="Wallet Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit" onClick={OnSubmit}  className="submit-button">
          {buttonText}
        </button>
        <p style={{color: "black" , fontsize : "9px"}}> {hash}</p>
        <button type="submit" onClick={onClick}  className="submit-button"> Recieve button</button>
        <p style={{color: "black" , fontsize : "9px"}}> {hasher}</p>
      </form>
    </div>
  );
}

export default FormMain;
