import React, { useEffect, useState } from "react";
import TableComp from "./components/TableComp";
import FormSelect from "../../components/FormFields/FormSelect";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { getLocalData } from "../../utils/helper";

const ViewTransaction = () => {
  const [locals, setLocal] = useState(() => getLocalData());
  const [group, setGroups] = useState([]);
  const [Scroller, setScroller] = useState({
    state: false,
    field: "",
  });

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

  useEffect(() => {}, [group, locals]);

  const groupBy = (e) => {
    let name = e.target.value;

    setScroller({ ...Scroller, state: true, name: name });
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
      <div className="nav">
        <Link className="anchor" to="/add-transaction">
          Add Transaction
        </Link>
        <FormSelect
          label="Group by Field Name : "
          options={initialValues}
          handleChange={groupBy}
        />
      </div>

      {group.length === 0 ? (
        <TableComp data={locals} />
      ) : (
        Object.keys(group).map((item, index) => (
          <div key={index}>
            <TableComp data={group[item]} />
          </div>
        ))
      )}
    </>
  );
};

export default ViewTransaction;
