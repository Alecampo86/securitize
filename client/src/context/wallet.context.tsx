import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export interface Wallet {
  _id?: string;
  address: string;
  balance: number;
  isOld: boolean;
  balanceInEur: number;
  balanceInUsd: number;
}

export type WalletContextType = {
  wallets: Wallet[];
  handleWalletAdded: (wallet: Wallet) => void;
  handleWalletDelete: (id: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  warning: string;
  address: string;
  setAddress: (address: string) => void;
  isLoading: boolean;
};

export const WalletContext = createContext<WalletContextType>({
  wallets: [],
  handleWalletAdded: () => {},
  handleWalletDelete: () => {},
  handleSubmit: (event: React.FormEvent) => {},
  warning: "",
  address: "",
  setAddress: () => {},
  isLoading: false,
});

export const WalletContextProvider: React.FC<Props> = (props) => {
  const baseUrl = "http://localhost:3000";

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [warning, setWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addedAddresses, setAddedAddresses] = useState<string[]>([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchWallets = async () => {
      const response = await fetch(`${baseUrl}/wallet/find`);
      const data = await response.json();
      setWallets(data);
    };
    fetchWallets();
  }, []);

  const handleWalletAdded = async (wallet: Wallet) => {
    try {
      // Check if wallet already exists in the database
      const response = await axios.get(
        `${baseUrl}/wallet/find/${wallet.address}`
      );
      const walletExists = response.data;

      if (walletExists) {
        setWarning(`Address ${wallet.address} has already been added`);
        return;
      }

      // Add wallet to the database
      await axios.post(`${baseUrl}/wallet/create`, { ...wallet });

      setWallets([...wallets, wallet]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWalletDelete = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/wallet/delete/${id}`);
      setWallets(wallets.filter((wallet) => wallet._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // validates if the address has been added before
    if (addedAddresses.includes(address)) {
      setWarning(`Address ${address} has already been added`);
      setIsLoading(false);
      return;
    }
    //get the EUR and USD rates
    axios
      .get(`${baseUrl}/wallet/exchange_rates`)
      .then((response) => {
        const rates = response.data;
        // gets the balance of the wallet
        axios.get(`${baseUrl}/wallet/balance/${address}`).then((response) => {
          const wallet = { address, balance: response.data };
          const balanceInEur = Math.floor(wallet.balance * rates.eur);
          const balanceInUsd = Math.floor(wallet.balance * rates.usd);
          console.log("balanceInEur ", balanceInEur);
          console.log("balanceInUsd ", balanceInUsd);
          console.log("address being sent to transactions ", address);

          // checks if wallet is old
          axios
            .get(`${baseUrl}/wallet/transactions/${address}`)
            .then((response) => {
              const isOld = response.data;
              handleWalletAdded({
                ...wallet,
                balanceInEur,
                balanceInUsd,
                isOld,
              });
              setAddress("");
              setWarning("");
              setAddedAddresses([...addedAddresses, address]);
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
              setWarning(
                "There seems to be a problem retrieving transactions with this specific wallet. Please try another."
              );
            });
        });
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <WalletContext.Provider
      value={{
        wallets,
        handleWalletAdded,
        handleWalletDelete,
        handleSubmit,
        warning,
        address,
        setAddress,
        isLoading,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};
export default WalletContextProvider;
