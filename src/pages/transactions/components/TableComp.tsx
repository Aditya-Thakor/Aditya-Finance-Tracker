import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FormInputs from "../../../components/formfields/FormInputs";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

interface TableProps {
  data: Array<object>;
  tableHeader: object;
  headLabel?: string;
}

type objString = {
  [x: string]: any;
};

const TableComp = ({ data, tableHeader, headLabel }: TableProps) => {
  const [dataset, setDataset] = useState<Array<object>>(data);
  const [limit, setLimit] = useState();
  const [order, setOrder] = useState({
    order: "",
    field: "",
  });
  const [sort, setSort] = useState();
  useEffect(() => {
    setDataset(() => data);
  }, [data]);

  const dispatch = useDispatch();

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const getvalue = e.target.value;
    let arr: object[] = [];

    data.map((item: any) => {
      if (
        item["transactionDate"].includes(getvalue) ||
        item["transactionDate"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      }
      if (
        item["transactionTo"].includes(getvalue) ||
        item["transactionTo"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      }
      if (
        item["transactionFrom"].includes(getvalue) ||
        item["transactionFrom"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      }
      if (
        item["transactionType"].includes(getvalue) ||
        item["transactionType"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      }
      if (
        item["transactionMY"].includes(getvalue) ||
        item["transactionMY"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      }
      if (
        item["transactionAmount"].toString().includes(getvalue) ||
        item["transactionAmount"].toString().toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      }
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
    let sortArr: object[] = [];
    if (field !== "transactonReceipt")
      if ((order.order === "" && field === "") || field !== order.field) {
        sortArr = dataset
          .slice()
          .sort((a: objString, b: objString) => (a[field] < b[field] ? -1 : 1));
        setOrder({ ...order, order: "asc", field: field });
      } else if (order.order === "asc" && field === order.field) {
        setOrder({ ...order, order: "desc", field: field });
        sortArr = dataset
          .slice()
          .sort((a: objString, b: objString) => (a[field] > b[field] ? -1 : 1));
      } else {
        setOrder({ ...order, order: "", field: "" });
      }

    order.order === "desc" ? setDataset(data) : setDataset(sortArr);
  };

  const onDelete = (id: number) => {
    console.log();

    // if (id) dispatch(deleteTransaction(id));
  };
  return (
    <div className="table-comp">
      <FormInputs
        name="search"
        placeholder="Search"
        type="text"
        className="form-control"
        onchange={onSearch}
      />

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
            {dataset.map((value: any, i: number) => (
              <tr key={i}>
                <td>{value["transactionDate"]}</td>
                <td>{value["transactionMY"]}</td>
                <td>{value["transactionType"]}</td>
                <td>{value["transactionFrom"]}</td>
                <td>{value["transactionTo"]}</td>
                <td>{value["transactionAmount"]}</td>
                <td>{value["transactionNote"]}</td>
                <td>
                  <img src={value["transactionReceipt"]} alt="receipt" />
                </td>
                <td>
                  <Link to={"/transaction/" + value["transactionId"]}>
                    View
                  </Link>
                  |
                  <Link to={"/update-transaction/" + value["transactionId"]}>
                    Edit
                  </Link>
                </td>
                <td
                  className="delete"
                  onClick={() => onDelete(value["transactionId"])}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {data.length === 0 && (
        <nav className="navbar navbar-light bg-light alignment">
          <span className="navbar-text">No data</span>
        </nav>
      )}
    </div>
  );
};

export default TableComp;
