const _routeWallet = env.ROUTER_WALLET


function login (contract) {
  const token = window.btoa(JSON.stringify({
    action: "connect",
    domain: window.location.host,
    contract: contract,
    success: window.location.origin + window.location.pathname,
  }))

  window.open(_routeWallet+"/execute?token="+token, "_self");
}

function call (json) {
  /*
    JSON EXAMPLE:
      {
        contractId: "contract_id",
        methodName: "create_account",
        args: {
          new_account_id: nickname,
          new_public_key: publicKey,
        },
        gas: "300000000000000",
        attachedDeposit: "10000000000000000000",
      }
  */
  const token = window.btoa(JSON.stringify({
    action: "call",
    domain: window.location.host,
    contract: json.contractId,
    from: localStorage.getItem("session"),
    json: json,
    success: window.location.origin + window.location.pathname,
    error: window.location.origin + window.location.pathname,
  }))

  window.open(_routeWallet+"/execute?token="+token, "_self");
}


export default {
  login,
  call
}
