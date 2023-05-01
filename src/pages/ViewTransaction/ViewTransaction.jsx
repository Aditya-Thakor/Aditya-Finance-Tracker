import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import "./css/viewTrans.css";
import TableComp from "../../components/TableComp/TableComp";
import FormSelect from "../../components/DropDownList/FormSelect";

const ViewTransaction = () => {
  const storageValues = JSON.parse(localStorage.getItem("value"));

  const [locals, setLocal] = useState(storageValues);

  const [sortedList, setSortedList] = useState(storageValues);

  const [groupList, setGroupList] = useState([]);

  const [Scroller, setScroller] = useState({
    state: false,
    field: "",
  });
  const [page, setPage] = useState(0);
  let ref = useRef(false);

  // Initials

  const initialValues = {
    transactionDate: "Transaction Date",
    transactionMY: "Month Year",
    transactionType: "Transaction Type",
    transactionFrom: "From Account",
    transactionTo: "To Account",
    transactionAmount: "Transaction Amount",
    transactionReceipt: "Transaction Receipt",
    transactionNotes: "Transaction Note",
  };

  const [order, setOrder] = useState({
    field: "",
    sort: "",
  });

  const handleClick = (e) => {
    let field = e.target.nonce;

    if (sortedList) {
      if ((order.sort === "" && order.field === "") || order.field !== field) {
        setOrder({ ...order, ["field"]: field, ["sort"]: "asc" });
        sortedList.sort((a, b) =>
          a[field].toLowerCase() < b[field].toLowerCase() ? -1 : 1
        );
      } else if (order.sort === "asc" && order.field === field) {
        setOrder({ ...order, ["field"]: field, ["sort"]: "desc" });
        sortedList.sort((a, b) =>
          a[field].toLowerCase() > b[field].toLowerCase() ? -1 : 1
        );
      } else {
        setOrder({ ...order, ["field"]: "", ["sort"]: "" });
      }

      order.sort !== "desc"
        ? setSortedList(sortedList)
        : setSortedList(storageValues);
      return 0;
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

  const pagination = (number) => {
    setPage(number);
  };

  return (
    <>
      <Link to="/add-transaction">Add Transaction</Link>
      <FormSelect options={initialValues} handleChange={groupBy} />
      <span> Field : {order.field === "" ? "Default" : order.field}</span>
      <span> Order : {order.sort === "" ? "Default" : order.sort}</span>
      <table>
        {locals && group.length <= 0 && (
          <>
            {sortedList ? (
              <TableComp
                className="show-data"
                handleClick={handleClick}
                tableHeaders={initialValues}
                tableBody={sortedList}
              />
            ) : (
              <tr className="no-data">
                <td colSpan="10">No data Found </td>
              </tr>
            )}
          </>
        )}

        {group ? (
          <>
            {Object.entries(group).map(([key, value], index) => (
              <>
                {key === "undefined" ? null : <h1>{key}</h1>}

                <TableComp
                  key={index}
                  className="show-data"
                  tableHeaders={initialValues}
                  handleClick={key === "undefined" ? handleClick : null}
                  tableBody={key === "undefined" ? sortedList : value}
                />
              </>
            ))}
          </>
        ) : (
          <tr className="no-data">
            <td colSpan="10">No data Found </td>
          </tr>
        )}
      </table>
    </>
  );
};

export default ViewTransaction;
