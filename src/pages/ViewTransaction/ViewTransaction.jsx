import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/viewTrans.css";
const ViewTransaction = () => {
  const storageValues = JSON.parse(localStorage.getItem("value"));

  // Hooks
  const [locals, setLocal] = useState(storageValues);
  const [Lastfiled, setLastfield] = useState("");
  let ref = useRef(false);

  // Initials
  let th = [
    { name: "transactionDate", text: "Transaction Date" },
    { name: "transactionMY", text: "Month Year" },
    { name: "transactionType", text: "Transaction Type" },

    { name: "transactionFrom", text: "From Account" },
    { name: "transactionTo", text: "To Account" },
    { name: "transactionAmount", text: "Transaction Amount" },
    { name: "transactionReceipt", text: "Transaction Receipt" },
    { name: "transactionNotes", text: "Transaction Note" },
  ];

  const FuncSort = (e) => {
    let field = e.target.nonce;

    if (Lastfiled !== field) {
      ref.current = false;
    }

    let storageValues1 = JSON.parse(localStorage.getItem("value"));

    if (!(field === "transactionReceipt")) {
      if (storageValues1) {
        if (!ref.current) {
          ref.current = true;
          setLastfield(field);

          storageValues1.sort((a, b) =>
            a[field].toLowerCase() < b[field].toLowerCase() ? -1 : 1
          );
        } else if (ref.current) {
          setLastfield("");

          storageValues1.sort((a, b) =>
            a[field].toLowerCase() > b[field].toLowerCase() ? -1 : 1
          );
        }
        setLocal(storageValues1);
        return 0;
      }
    }
  };

  return (
    <>
      <div>
        <table className="show-data">
          <tbody>
            <tr>
              <td>
                <Link to="/addTransaction">Add Transaction</Link>
              </td>
            </tr>
            <tr className="show-data-header">
              {th.map((item, index) => (
                <th key={index} onClick={FuncSort} nonce={item.name}>
                  {item.text}
                </th>
              ))}
              <th>Action</th>
            </tr>

            {locals ? (
              locals.map((item, index) => (
                <tr key={index} className="show-data-content">
                  <td>{item.transactionDate}</td>
                  <td>{item.transactionMY}</td>
                  <td>{item.transactionType}</td>
                  <td>{item.transactionFrom}</td>
                  <td>{item.transactionTo}</td>
                  <td>Rs. {item.transactionAmount}</td>
                  <td>
                    <img
                      src={item.transactionReceipt}
                      height="60px"
                      width="100px"
                      alt="imagea"
                    ></img>
                  </td>
                  <td>{item.transactionNotes}</td>
                  <td>
                    <Link to="/view">View</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-data">
                <td colSpan="9">No data Found </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewTransaction;
