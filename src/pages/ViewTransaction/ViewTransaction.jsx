import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import "./css/viewTrans.css";

const ViewTransaction = () => {
  const storageValues = JSON.parse(localStorage.getItem("value"));

  // Hooks
  const [locals, setLocal] = useState(storageValues);
  const [Lastfiled, setLastfield] = useState("");
  const [Scroller, setScroller] = useState({
    state: false,
    field: "",
  });
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

  const [group, setGroups] = useState([]);

  const groupBy = (e) => {
    let name = e.target.value;
    // eslint-disable-next-line
    setScroller({ ...Scroller, ["state"]: true, ["name"]: name });

    locals.reduce((groups, product) => {
      let transactionFrom = product[name];
      groups[transactionFrom] = groups[transactionFrom] ?? [];
      groups[transactionFrom].push(product);
      setGroups(groups);
      return groups;
    }, {});
  };

  return (
    <>
      <div>
        <table className="show-data">
          <tbody>
            <tr>
              <td colSpan="7">
                <Link to="/addTransaction">Add Transaction</Link>
              </td>
              <td>
                <select name="" id="" onChange={groupBy}>
                  <option value="">Select Field</option>
                  {th.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.text}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <>
              {!Scroller["state"] && (
                <>
                  <tr className="show-data-header">
                    {th.map((item, index) => (
                      <th key={index} onClick={FuncSort} nonce={item.name}>
                        {item.text}
                      </th>
                    ))}
                    <th>Action</th>
                  </tr>

                  <>
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
                  </>
                </>
              )}
            </>
          </tbody>
        </table>

        <table>
          <tbody>
            <tr>
              {Object.values(group).map((item) => (
                <tr>
                  <h2>{item[0][Scroller["name"]]}</h2>
                  <tr className="show-data-header">
                    {th.map((item, index) => (
                      <th key={index} onClick={FuncSort} nonce={item.name}>
                        {item.text}
                      </th>
                    ))}
                    <th>Action</th>
                  </tr>
                  {Object.values(item).map((name) => (
                    <tr className="show-data-content">
                      {console.log(name)}
                      <td>{name.transactionDate}</td>
                      <td>{name.transactionMY}</td>
                      <td>{name.transactionType}</td>
                      <td>{name.transactionFrom}</td>
                      <td>{name.transactionTo}</td>
                      <td>Rs. {name.transactionAmount}</td>
                      <td>
                        <img
                          src={name.transactionReceipt}
                          height="60px"
                          width="100px"
                          alt="imagea"
                        ></img>
                      </td>
                      <td>{name.transactionNotes}</td>
                      <td>
                        <Link to="/view">View</Link>
                      </td>
                    </tr>
                  ))}
                </tr>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewTransaction;
