import FormInputs from "../../components/formfields/FormInputs";
import TableComp from "./components/TableComp";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { tableHeader } from "../../utils/const";
import { Link } from "react-router-dom";
import { TransactionInterface } from "../../modals/transactions";
import { objkey } from "../../modals/objectKey";

const ViewTransaction = () => {
  const transactionsData = useSelector(
    (state: RootState) => state.transactions
  );

  const [groupField, setGroupField] = useState<string>("");
  const [cloneData, setCloneData] =
    useState<TransactionInterface[]>(transactionsData);
  const [groupData, setGroupData] = useState<objkey>({});

  useEffect(() => {
    setCloneData(() => transactionsData);
  }, [transactionsData]);

  useEffect(() => {
    cloneData.reduce((group: objkey, val: objkey) => {
      group[val[groupField]] = group[val[groupField]] ?? [];
      group[val[groupField]].push(val);
      setGroupData(group);
      return group;
    }, {});
  }, [groupField, cloneData]);

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
          onchange={(e: ChangeEvent<HTMLSelectElement>) =>
            setGroupField(e.target.value)
          }
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
