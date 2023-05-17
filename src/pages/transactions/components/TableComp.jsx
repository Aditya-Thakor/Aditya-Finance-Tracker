import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { array } from "yup";
import FormNoValidateSelect from "../../../components/formFields/FormNoValidateSelect";

const TableComp = ({ data }) => {
  const [getData, setGetData] = useState(data);
  const [dataset, setDataset] = useState(data);
  const [limit, setLimit] = useState(5);
  const [order, setOrder] = useState({
    field: "",
    sort: "",
  });

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

  useEffect(() => {
    if (data) {
      const filter = data.slice(0, limit);
      setDataset(filter);
    }
  }, [data, limit]);

  const handleClick = (e) => {
    let field = e.target.id;

    if ((order.sort === "" && order.field === "") || order.field !== field) {
      setOrder({ ...order, field: field, sort: "asc" });
      dataset.sort((a, b) => (a[field] < b[field] ? -1 : 1));
    } else if (order.sort === "asc" && order.field === field) {
      setOrder({ ...order, field: field, sort: "desc" });
      dataset.sort((a, b) => (a[field] > b[field] ? -1 : 1));
    } else {
      setOrder({ ...order, field: "", sort: "" });
    }
    order.sort !== "desc" ? setDataset(dataset) : setDataset(dataset);
    return 0;
  };

  const onSearch = (e) => {
    const getvalue = e.target.value;
    let arr = [];

    data.map((item) => {
      if (getvalue.includes(item["transactionDate"])) {
        arr.push(item);
      } else if (
        item["transactionMY"].includes(getvalue) ||
        item["transactionMY"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      } else if (
        item["transactionType"].includes(getvalue) ||
        item["transactionType"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      } else if (
        item["transactionFrom"].includes(getvalue) ||
        item["transactionFrom"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      } else if (
        item["transactionTo"].includes(getvalue) ||
        item["transactionTo"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      } else if (
        item["transactionNotes"].includes(getvalue) ||
        item["transactionNotes"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      } else if (
        item["transactionAmount"].includes(getvalue) ||
        item["transactionAmount"].toLowerCase().includes(getvalue)
      ) {
        arr.push(item);
      }
    });

    setDataset(arr);
    if (arr.length === 0) {
      setDataset({});
    }
  };

  const options = {
    1: 1,
    2: 2,
    5: 5,
    10: 10,
  };
  const pagination = (e) => {
    console.log(e.target);
    if (data) {
      const page = e.target.id;
      const start = (page - 1) * limit;
      const end = page * limit;
      const filter = data.slice(start, end);
      setDataset(filter);
    }
  };
  useEffect(() => {
    setLimit(limit);
  }, [limit]);
  const pageLimit = (e) => {
    const page = e.target.value || 5;
    setLimit(page);
  };

  return (
    <div className="table-component">
      <div className="search-row">
        <div className="input-group rounded search-control">
          <input
            onChange={onSearch}
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
        </div>
        <FormNoValidateSelect options={options} handleChange={pageLimit} />
      </div>
      {dataset && dataset.length > 0 ? (
        <div>
          <table className="table table-borderless" border="1px">
            <thead>
              <tr>
                {Object.keys(initialValues).map((item, index) => (
                  <th onClick={handleClick} id={item} key={index}>
                    {item.replace("transaction", "Transaction ")}
                  </th>
                ))}
                <th>Action</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {dataset.map((item, index) => (
                <tr key={index}>
                  <td>{item["transactionDate"]}</td>
                  <td>{item["transactionMY"]}</td>
                  <td>{item["transactionType"]}</td>
                  <td>{item["transactionFrom"]}</td>
                  <td>{item["transactionTo"]}</td>
                  <td>{item["transactionAmount"]}</td>
                  <td>
                    <img
                      src={item["transactionReceipt"]}
                      alt="imagess"
                      width="100px"
                      height="60px"
                    />
                  </td>
                  <td>{item["transactionNotes"]}</td>

                  <td>
                    <Link to={"/transaction/" + item["transactionId"]}>
                      View
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <Link to={"/update-transaction/" + item["transactionId"]}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div></div>
          <div className="pagination">
            {Array(Math.ceil(data.length / limit))
              .fill()
              .map((_, index) => (
                <nav aria-label="..." key={index}>
                  <ul className="pagination pagination-sl">
                    <li className="page-item">
                      <span
                        key={index}
                        id={index + 1}
                        className="page-link"
                        onClick={pagination}
                      >
                        {index + 1}
                      </span>
                    </li>
                  </ul>
                </nav>
              ))}
          </div>
        </div>
      ) : (
        <nav className="navbar navbar-light bg-light alignment">
          <span className="navbar-text">No data</span>
        </nav>
      )}
    </div>
  );
};

export default TableComp;
