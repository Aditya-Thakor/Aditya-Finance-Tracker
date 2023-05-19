import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Transaction = () => {
  const { id } = useParams();
  const [showTransaction, setData] = useState({});
  const transactionsData = useSelector((state) => state.transactions);

  useEffect(() => {
    transactionsData.filter((item) => {
      if (item.transactionId === id) {
        setData({ ...showTransaction, ...item });
      }
      return 0;
    });
  }, []);

  return (
    <div>
      <div>
        <div className="nav">
          <Link className="anchor" to="/add-transaction">
            Add Transaction
          </Link>
          <Link className="anchor" to="/view-transactions">
            View Transaction
          </Link>
        </div>
        <br />
        <div className="header-div">
          <h1>
            {Object.keys(showTransaction).length > 0
              ? "Transaction No : " + id
              : "No Data Found..."}
          </h1>
        </div>
        <table className="table table-borderless">
          <tbody>
            {Object.entries(showTransaction).map(([field, value], i) => (
              <tr key={i}>
                <td>{field}</td>
                <td>
                  {field === "transactionReceipt" ? (
                    <img alt="transactionReceipt" src={value} />
                  ) : (
                    value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
