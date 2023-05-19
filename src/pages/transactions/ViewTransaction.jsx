import React, { useEffect, useState } from "react";
import TableComp from "./components/TableComp";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormFields/FormInput";
import { useSelector } from "react-redux";
import { viewTableHeader } from "../../utils/const";

const ViewTransaction = () => {
  const transactionsData = useSelector((state) => state.transactions);

  const [cloneData, setCloneData] = useState(transactionsData);
  const [group, setGroups] = useState([]);
  const [groupField, setGroupField] = useState();

  useEffect(() => {
    setCloneData(() => transactionsData);
  }, [transactionsData]);

  useEffect(() => {
    cloneData.reduce((groups, product) => {
      groups[product[groupField]] = groups[product[groupField]] ?? [];
      groups[product[groupField]].push(product);
      setGroups(groups);
      return groups;
    }, {});
  }, [groupField, cloneData]);

  return (
    <>
      <div className="nav">
        <Link className="anchor" to="/add-transaction">
          Add Transaction
        </Link>

        <FormInput
          type="select"
          className="form-select"
          label="Group By : "
          options={viewTableHeader}
          onChange={(e) => setGroupField(e.target.value)}
        />
      </div>

      {group.length === 0 ? (
        <TableComp data={cloneData} tableHeader={viewTableHeader} />
      ) : (
        Object.keys(group).map((item, index) => (
          <div key={index}>
            <TableComp
              data={group[item]}
              tableHeader={viewTableHeader}
              // onDelete={onDelete}
            />
          </div>
        ))
      )}
    </>
  );
};

export default ViewTransaction;
