import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TransactionInterface } from "../../utils/const";
import { Link } from "react-router-dom";

const ViewTransaction = () => {
  const transactionsData = useSelector(
    (state: RootState) => state.transactions
  );

  const [cloneData, setCloneData] =
    useState<Array<TransactionInterface>>(transactionsData);

  return (
    <>
      <div className="nav-link">
        <Link to="/add-transaction">Add Transaction</Link>
      </div>
      <div>
        <h1>a</h1>
      </div>
    </>
  );
};

export default ViewTransaction;
