import React, { useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import { WalletContext } from "../context/wallet.context";

function AddWalletForm() {
  const { handleSubmit, warning, isLoading, address, setAddress } =
    useContext(WalletContext);

  return (
    <form onSubmit={handleSubmit}>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <div className="formContainer form-group">
          <label>Wallet address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter wallet Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          {warning && <small className="form-text text-muted">{warning}</small>}
          <button
            style={{ width: "15%" }}
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            Add Wallet
          </button>
        </div>
      )}
    </form>
  );
}

export default AddWalletForm;
