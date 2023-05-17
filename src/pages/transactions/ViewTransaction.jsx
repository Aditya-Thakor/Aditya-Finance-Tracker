import React, { useState } from "react";
import TableComp from "./components/TableComp";
import { Link } from "react-router-dom";
import { getLocalData } from "../../utils/helper";
import FormInput from "../../components/FormFields/FormInput";

const ViewTransaction = () => {
  const [locals, setLocal] = useState(() => getLocalData());
  const [group, setGroups] = useState([]);
  const [groupField, setGroupField] = useState();

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
    setGroupField(name);

    locals.reduce((groups, product) => {
      groups[product[name]] = groups[product[name]] ?? [];
      groups[product[name]].push(product);
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

        <FormInput
          type="select"
          label="Group by Field Name : "
          options={initialValues}
          onSelect={onGroupBy}
        />
      </div>

      {group.length === 0 ? (
        <TableComp
          data={locals}
          tableHeader={initialValues}
          groupField={groupField}
        />
      ) : (
        Object.keys(group).map((item, index) => (
          <div key={index}>
            <TableComp
              data={group[item]}
              tableHeader={initialValues}
              groupField={groupField}
              // onDelete={onDelete}
            />
          </div>
        ))
      )}
    </>
  );
};

export default ViewTransaction;
