import React from "react";
import { Link } from "react-router-dom";

const TableComp = (props) => {
  const { tableHeaders, tableBody, className, handleClick } = props;

  return (
    <>
      {tableHeaders && (
        <thead className={className}>
          <tr>
            <th>Transaction Id</th>
            {Object.entries(tableHeaders).map(([name, text], index) =>
              name !== "transactionReceipt" ? (
                <th key={index} nonce={name} name={name} onClick={handleClick}>
                  {text}
                </th>
              ) : (
                <th key={index} name={name}>
                  {text}
                </th>
              )
            )}
            <th>Action</th>
            <th>Edit</th>
          </tr>
        </thead>
      )}
      {tableBody && (
        <tbody className="show-data-content">
          {tableBody.map((name, index) => (
            <tr key={index}>
              {Object.entries(name).map(([key, value], index) =>
                value.includes("data:image") ? (
                  <td key={index}>
                    <img className="base64-img" src={value} alt="transaction" />
                  </td>
                ) : (
                  <td key={index}>{value}</td>
                )
              )}
              <td>
                <Link to={"/transaction/" + name["transaction"]}>View</Link>{" "}
              </td>
              <td>Edit</td>
            </tr>
          ))}
        </tbody>
      )}
    </>
  );
};

export default TableComp;
