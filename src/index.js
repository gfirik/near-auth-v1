import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import getConfig from "./config.js";
import * as nearAPI from "near-api-js";

async function initContract() {
  const nearConfig = getConfig(process.env.NODE_ENV || "testnet");

  const near = await nearAPI.connect({
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    },
    ...nearConfig,
  });

  const walletConnection = new nearAPI.WalletConnection(near);

  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    };
  }

  return { currentUser, nearConfig, walletConnection };
}

const root = ReactDOM.createRoot(document.getElementById("root"));

window.nearInitPromise = initContract().then(({ currentUser, nearConfig, walletConnection}) => {
  root.render(
    <React.StrictMode>
      <App currentUser={currentUser} nearConfig={nearConfig} wallet={walletConnection}/>
    </React.StrictMode>
  );
})
