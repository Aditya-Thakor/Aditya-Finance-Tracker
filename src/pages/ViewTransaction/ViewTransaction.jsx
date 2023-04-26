import React from "react";
import { Link } from "react-router-dom";
import "./css/viewTrans.css";
const ViewTransaction = () => {
  let storageValues = JSON.parse(localStorage.getItem("value"));

  return (
    <>
      <div>
        <table className="show-data">
          <tr className="show-data-header">
            <th>Transaction Date</th>
            <th>Month Year</th>
            <th>Transaction Type</th>
            <th>From Account </th>
            <th>To Account </th>
            <th>Transaction Amount</th>
            <th>Transaction Receipt</th>
            <th>Transaction Note</th>
            <th>Action</th>
          </tr>

          {storageValues.map((item, index) => (
            <tr className="show-data-content">
              <td>{item.transactionDate}</td>
              <td>{item.transactionMY}</td>
              <td>{item.transactionType}</td>
              <td>{item.transactionFrom}</td>
              <td>{item.transactionTo}</td>
              <td>Rs. {item.transactionAmount}</td>
              <td>{item.transactionReceipt}</td>
              <td>{item.transactionNotes}</td>
              <td>
                <Link to="/view">View</Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default ViewTransaction;
