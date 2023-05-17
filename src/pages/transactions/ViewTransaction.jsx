import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import TableComp from "./components/TableComp";
import { defaultTransactions } from "../../defaults/default.transactions";
import { TransactionContext } from "../../context/TransactionContext";
import FormNoValidateSelect from "../../components/formFields/FormNoValidateSelect";

const ViewTransaction = () => {
  const { transactionsData } = useContext(TransactionContext);
  const [locals, setLocal] = useState(transactionsData);
  const [group, setGroups] = useState([]);

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
        <FormNoValidateSelect
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
