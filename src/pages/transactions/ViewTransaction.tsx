import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TransactionInterface, tableHeader } from "../../utils/const";
import { Link } from "react-router-dom";
import TableComp from "./components/TableComp";
import FormInputs from "../../components/formfields/FormInputs";

const ViewTransaction = () => {
  const transactionsData = useSelector(
    (state: RootState) => state.transactions
  );

  const [cloneData, setCloneData] =
    useState<Array<TransactionInterface>>(transactionsData);
  const [groupData, setGroupData] = useState<any>({});

  const onGroupBy = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const field = e.target.value;
    cloneData.reduce((group: Record<string, any>, val: any): any => {
      group[val[field]] = group[val[field]] ?? [];
      group[val[field]].push(val);
      setGroupData(group);
      return group;
    }, {});
  };

  return (
    <>
      <div className="nav-link">
        <Link to="/add-transaction">Add Transaction</Link>
      </div>
      <div>
        <FormInputs
          label="Group By : "
          type="select"
          name="groupby"
          options={tableHeader}
          onchange={onGroupBy}
        />
      </div>
      <div>
        {Object.keys(groupData).length === 0 ? (
          <TableComp data={cloneData} tableHeader={tableHeader} />
        ) : (
          Object.keys(groupData).map((key) => (
            <TableComp
              data={groupData[key]}
              headLabel={key}
              tableHeader={tableHeader}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ViewTransaction;
