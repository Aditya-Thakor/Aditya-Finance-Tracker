import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FormInputs from "../../../components/formfields/FormInputs";
import { deleteTransaction } from "../../../redux/slices/transactionsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { TransactionInterface } from "../../../modals/transactions";
import { objkey } from "../../../modals/objectKey";

interface TableProps {
  data: TransactionInterface[];
  tableHeader: object;
  headLabel?: string;
}

const TableComp = ({ data, tableHeader, headLabel }: TableProps) => {
  const dispatch = useDispatch();
  const transactionData = useSelector((state: RootState) => state.transactions);

  const [dataset, setDataset] = useState<TransactionInterface[]>(data);
  const [limit, setLimit] = useState(5);
  const [order, setOrder] = useState({
    order: "",
    field: "",
  });

  useEffect(() => {
    if (data) {
      const filter = data.slice(0, limit);
      setDataset(filter);
    }
  }, [data, limit]);

  useEffect(() => {
    setLimit(limit);
    setDataset(data);
  }, [limit]);

  const options = {
    1: 1,
    2: 2,
    5: 5,
    10: 10,
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const getvalue = e.target.value;
    let arr: TransactionInterface[] = [];

    data.map((item) => {
      if (
        item["transactionDate"].toString().includes(getvalue) ||
        item["transactionDate"].toString().toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      } else if (
        item["transactionTo"].includes(getvalue) ||
        item["transactionTo"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      } else if (
        item["transactionFrom"].includes(getvalue) ||
        item["transactionFrom"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      } else if (
        item["transactionType"].includes(getvalue) ||
        item["transactionType"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      } else if (
        item["transactionMY"].includes(getvalue) ||
        item["transactionMY"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      } else if (
        item["transactionAmount"].toString().includes(getvalue) ||
        item["transactionAmount"].toString().toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      }
      return 0;
    });

    setDataset(arr);

    if (getvalue.trim() === "") {
      setDataset(data);
    }
    if (arr.length === 0) {
      setDataset([]);
    }
  };

  const onSort = (field: string) => {
    let sortArr: TransactionInterface[] = [];
    if (field !== "transactonReceipt")
      if ((order.order === "" && field === "") || field !== order.field) {
        sortArr = dataset
          .slice()
          .sort((a: objkey, b: objkey) => (a[field] < b[field] ? -1 : 1));
        setOrder({ ...order, order: "asc", field: field });
      } else if (order.order === "asc" && field === order.field) {
        setOrder({ ...order, order: "desc", field: field });
        sortArr = dataset
          .slice()
          .sort((a: objkey, b: objkey) => (a[field] > b[field] ? -1 : 1));
      } else {
        setOrder({ ...order, order: "", field: "" });
      }

    order.order === "desc" ? setDataset(dataset) : setDataset(sortArr);
  };

  const onDelete = (id: number) => {
    const updatedData = dataset.filter((item) => id !== item["transactionId"]);
    setDataset(updatedData);
    dispatch(deleteTransaction(id));
  };

  const onLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(() => parseInt(e.target.value) || 5);
  };

  const onPageChange = (e: MouseEvent<HTMLElement>) => {
    const getLimit: number = parseInt((e.target as HTMLSpanElement).id);
    const start = (getLimit - 1) * limit;
    const end = getLimit * limit;
    const filter = data.slice(start, end);
    setDataset(filter);
  };

  return (
    <div className="table-comp">
      <div className="novalidate-field">
        <FormInputs
          name="search"
          placeholder="Search"
          type="text"
          className="form-control"
          onchange={onSearch}
        />
        <FormInputs
          name="limit"
          type="select"
          options={options}
          onchange={onLimit}
        />
      </div>

      {headLabel && headLabel !== "undefined" && (
        <h4 className="head-label">{headLabel}</h4>
      )}
      <table className="table table-borderless">
        <thead>
          <tr>
            {Object.entries(tableHeader).map(([key, value], i) => (
              <th key={i} onClick={() => onSort(key)} id={key}>
                {value}
              </th>
            ))}

            <th className="table-header">Action </th>
            <th className="table-header">Delete</th>
          </tr>
        </thead>
        {data.length > 0 && (
          <tbody>
            {dataset.map((value, i) => (
              <tr key={i}>
                <td>{value.transactionDate as string}</td>
                <td>{value["transactionMY"]}</td>
                <td>{value["transactionType"]}</td>
                <td>{value["transactionFrom"]}</td>
                <td>{value["transactionTo"]}</td>
                <td>{value["transactionAmount"]}</td>
                <td>{value["transactionNote"]}</td>
                <td>
                  <img
                    src={value["transactionReceipt"] as string}
                    alt="receipt"
                  />
                </td>
                <td>
                  <Link to={"/update-transaction/" + value["transactionId"]}>
                    Edit
                  </Link>
                </td>
                <td
                  className="delete"
                  onClick={() => onDelete(value["transactionId"] as number)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {data.length === 0 ? (
        <nav className="navbar navbar-light bg-light alignment">
          <span className="navbar-text">No data</span>
        </nav>
      ) : (
        <div className="pagination">
          {Array(Math.ceil(data.length / limit))
            .fill(undefined)
            .map((_, index) => (
              <nav aria-label="..." key={index}>
                <ul className="pagination pagination-sl">
                  <li className="page-item">
                    <span
                      key={index}
                      id={(index + 1).toString()}
                      className="page-link"
                      onClick={onPageChange}
                    >
                      {index + 1}
                    </span>
                  </li>
                </ul>
              </nav>
            ))}
        </div>
      )}
    </div>
  );
};

export default TableComp;
