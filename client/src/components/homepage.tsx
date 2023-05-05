import React from "react";

import AddWalletForm from "./walletInput";
import WalletTable from "./walletTable";

function Header() {
  return <h1>Securitize Wallets Analytics</h1>;
}

function App() {
  return (
    <div className="container">
      <Header />
      <AddWalletForm />
      <WalletTable />
    </div>
  );
}

export default App;
