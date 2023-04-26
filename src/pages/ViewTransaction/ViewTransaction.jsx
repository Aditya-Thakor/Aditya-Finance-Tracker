import React from "react";
import { Link } from "react-router-dom";
import "./css/viewTrans.css";
const ViewTransaction = () => {
  let storageValues = JSON.parse(localStorage.getItem("value"));

  let th = [
    { name: "transactionDate", text: "Transaction Date" },
    { name: "transactionMY", text: "Month Year" },
    { name: "transactionType", text: "Transaction Type" },
    { name: "transactionFrom", text: "From Account" },
    { name: "transactionTo", text: "To Account" },
    { name: "transactionAmount", text: "Transaction Amount" },
    { name: "transactionReceipt", text: "Transaction Receipt" },
    { name: "transactionNotes", text: "Transaction Note" },
    { name: "", text: "Action" },
  ];

  let aa = [
    { name: "sad", value: "sad" },
    { name: "sad", value: "sad" },
    { name: "sad", value: "sad" },
  ];
  // aa.map((item) => {
  //   console.log(item.name);
  // });

  let array = [];

  const FuncSort = (e) => {
    let field = e.target.nonce;
    let appending = [];

    storageValues.map((item) => {
      console.log(item);

      // appending.push(Object.entries(item));
      // [["you",100],["me",75],["foo",116],["bar",15]]
    });
    // let sorted = appending.sort((a, b) => a[1] - b[1]);
    // console.log(sorted);
    // let obj = { you: 100, me: 75, foo: 116, bar: 115 };

    // let entries = Object.entries(obj);
    // // [["you",100],["me",75],["foo",116],["bar",15]]

    // let sorted = entries.sort((a, b) => a[1] - b[1]);
    // console.log(sorted);
  };

  return (
    <>
      <div>
        <table className="show-data">
          <tbody>
            <tr className="show-data-header">
              {th.map((item, index) => (
                <th key={index} onClick={FuncSort} nonce={item.name}>
                  {item.text}
                </th>
              ))}
            </tr>

            {storageValues ? (
              storageValues.map((item, index) => (
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
