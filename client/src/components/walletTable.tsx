import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/wallet.context";

function WalletTable() {
  const { wallets, handleWalletDelete, fetchWallets } =
    useContext(WalletContext);
  const [sort, setSort] = useState<"favorites" | "balance">("balance");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [displayCurrency, setDisplayCurrency] = useState<"eur" | "usd">("eur");

  // Load favorites from local storage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Update favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value as "favorites" | "balance");
  };

  const handleFavoriteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const address = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setFavorites([...favorites, address]);
    } else {
      setFavorites(favorites.filter((a) => a !== address));
    }
  };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayCurrency(event.target.value as "eur" | "usd");
  };

  const sortedWallets = wallets.sort((a, b) => {
    if (sort === "favorites") {
      return favorites.includes(a.address)
        ? -1
        : favorites.includes(b.address)
        ? 1
        : 0;
    } else {
      return b.balance - a.balance;
    }
  });

  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">Address</th>
          <th scope="col">Ether Balance</th>
          <th scope="col">Favorite</th>
          <th scope="col">Status</th>
          <th scope="col">
            Balance
            <select
              style={{ marginLeft: 10 }}
              value={displayCurrency}
              onChange={handleCurrencyChange}
            >
              <option value="eur">EUR</option>
              <option value="usd">USD</option>
            </select>
          </th>
          <th scope="col">
            Order by
            <select
              style={{ marginLeft: 10 }}
              value={sort}
              onChange={handleSortChange}
            >
              <option value="favorites">Favorites</option>
              <option value="balance">Balance</option>
            </select>
          </th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {sortedWallets.map((wallet) => (
          <tr key={wallet.address}>
            <td>{wallet.address}</td>
            <td>{wallet.balance}</td>
            <td>
              <input
                type="checkbox"
                value={wallet.address}
                checked={favorites.includes(wallet.address)}
                onChange={handleFavoriteChange}
              />
            </td>
            <td>{wallet.isOld ? "Old" : "Not old"}</td>
            <td>
              {displayCurrency === "eur" && wallet.balanceInEur}
              {displayCurrency === "usd" && wallet.balanceInUsd}
            </td>
            <td></td>
            <td>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  wallet._id && (await handleWalletDelete(wallet._id));
                  fetchWallets();
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WalletTable;
