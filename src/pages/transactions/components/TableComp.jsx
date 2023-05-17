import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLocalData } from "../../../utils/helper";
import FormInput from "../../../components/FormFields/FormInput";

const TableComp = (props) => {
  const { data, tableHeader } = props;
  const [getData, setGetData] = useState(data);
  const [dataset, setDataset] = useState(getData);
  const [limit, setLimit] = useState(5);
  const [order, setOrder] = useState({
    field: "",
    sort: "",
  });

  const options = {
    1: 1,
    2: 2,
    5: 5,
    10: 10,
  };

  useEffect(() => {
    if (data) {
      const filter = data.slice(0, limit);
      setDataset(filter);
    }
  }, [data, limit]);

  useEffect(() => {
    setLimit(limit);
  }, [limit]);

  const onSort = (e) => {
    let field = e.target.id;

    if (field !== "transactionReceipt") {
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
    }
  };

  const onSearch = (e) => {
    const getvalue = e.target.value;
    let arr = [];

    data.map((item) => {
      let flag = false;

      Object.keys(item).map((key) => {
        if (
          item[key].includes(getvalue) ||
          item[key].toLowerCase().includes(getvalue)
        ) {
          flag = true;
        }
      });
      if (flag) {
        arr.push(item);
      }
    });

    setDataset(arr);
    if (arr.length === 0) {
      setDataset({});
    }
  };

  const onPageChange = (e) => {
    if (data) {
      const page = e.target.id;
      const start = (page - 1) * limit;
      const end = page * limit;
      const filter = data.slice(start, end);
      setDataset(filter);
    }
  };

  const onDelete = (e) => {
    const id = e.target.id;
    const gettingdata = getLocalData();
    const newData = gettingdata.filter((item) => {
      if (item["transaction"] !== id) {
        return item;
      }
    });
    localStorage.setItem("value", JSON.stringify(newData));

    const group = data.filter((item) => {
      if (item["transaction"] !== id) {
        return item;
      }
    });
    setDataset(() => group);
  };

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
        <FormInput type="select" options={options} handleChange={pageLimit} />
      </div>
      {dataset && dataset.length > 0 ? (
        <div>
          <table className="table table-borderless" border="1px">
            <thead>
              <tr>
                {Object.keys(tableHeader).map((item, index) => (
                  <th onClick={onSort} id={item} key={index}>
                    {item.replace("transaction", "Transaction ")}
                  </th>
                ))}
                <th>Action</th>
                <th>Edit</th>
                <th>Delete</th>
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
                    <img src={item["transactionReceipt"]} alt="" />
                  </td>
                  <td>{item["transactionNotes"]}</td>
                  <td>
                    <Link to={"/transaction/" + item["transaction"]}>View</Link>
                  </td>
                  <td>
                    <Link to={"/update-transaction/" + item["transaction"]}>
                      Edit
                    </Link>
                  </td>
                  <td
                    className="delete"
                    id={item["transaction"]}
                    onClick={onDelete}
                  >
                    Delete
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
                        onClick={onPageChange}
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
