import React, { useEffect, useState } from "react";
import TableComp from "./components/TableComp";
import { Link } from "react-router-dom";
import { getLocalData } from "../../utils/helper";
import FormSelect from "../../components/FormFields/FormSelect";

const ViewTransaction = () => {
  const [locals, setLocal] = useState(() => getLocalData());
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

  const onGroupBy = (e) => {
    const name = e.target.value;

    locals.reduce((groups, product) => {
      groups[product[name]] = groups[product[name]] ?? [];
      groups[product[name]].push(product);
      setGroups(groups);
      console.log(group);
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
          handleChange={onGroupBy}
        />
      </div>

      {group.length === 0 ? (
        <TableComp data={locals} tableHeader={initialValues} />
      ) : (
        Object.keys(group).map((item, index) => (
          <div key={index}>
            <TableComp data={group[item]} tableHeader={initialValues} />
          </div>
        ))
      )}
    </>
  );
};

export default ViewTransaction;
