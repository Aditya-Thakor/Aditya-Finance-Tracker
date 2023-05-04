import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormInputs from "../../../components/FormFields/FormInputs";
import FormSelect from "../../../components/FormFields/FormSelect";

const TableComp = ({ data }) => {
  const [dataset, setDataset] = useState(data);
  const [searchdata, setSearchData] = useState([]);
  const [order, setOrder] = useState({
    field: "",
    sort: "",
  });

  const [pageno, setPage] = useState(1);

  const [limit, setLimit] = useState(2);

  useEffect(() => {
    setDataset(data);
    const filter = data.slice(0, limit);

    setDataset(filter);
  }, [data]);

  const handleClick = (e) => {
    let field = e.target.id;

    if ((order.sort === "" && order.field === "") || order.field !== field) {
      setOrder({ ...order, field: field, sort: "asc" });
      data.sort((a, b) => (a[field] < b[field] ? -1 : 1));
    } else if (order.sort === "asc" && order.field === field) {
      setOrder({ ...order, field: field, sort: "desc" });
      data.sort((a, b) => (a[field] > b[field] ? -1 : 1));
    } else {
      setOrder({ ...order, field: "", sort: "" });
    }

    order.sort !== "desc" ? setDataset(data) : setDataset(data);
    return 0;
  };

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

  const searching = (e) => {
    const getvalue = e.target.value;

    let arr = [];

    data.map((item) => {
      if (item["transactionDate"].includes(getvalue)) {
        arr.push(item);
      } else if (item["transactionMY"].includes(getvalue)) {
        arr.push(item);
      } else if (item["transactionType"].includes(getvalue)) {
        arr.push(item);
      } else if (item["transactionFrom"].includes(getvalue)) {
        arr.push(item);
      } else if (item["transactionTo"].includes(getvalue)) {
        arr.push(item);
      } else if (item["transactionNotes"].includes(getvalue)) {
        arr.push(item);
      } else if (item["transactionAmount"].includes(getvalue)) {
        arr.push(item);
      }
    });

    setDataset(arr);
    if (arr.length === 0) {
      setDataset({});
    }
  };

  const pagination = (e) => {
    const page = e.target.id;
    const start = (page - 1) * limit;
    const end = page * limit;

    const filter = data.slice(start, end);
    console.log(filter);
    setDataset(filter);
    setPage(page);
  };

  const options = {
    1: 1,
    2: 2,
    5: 5,
  };

  return (
    <>
      Search : <FormInputs handleChange={searching} />
      {dataset.length > 0 ? (
        <div>
          <table border="1px">
            <thead>
              <tr>
                {Object.keys(initialValues).map((item, index) => (
                  <th onClick={handleClick} id={item} key={index}>
                    {item}
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
                      alt=""
                      width="100px"
                      height="60px"
                    />
                  </td>
                  <td>{item["transactionNotes"]}</td>

                  <td>
                    <Link to={"/transaction/" + item["transaction"]}>View</Link>
                  </td>
                  <td>
                    {" "}
                    <Link to={"/update-transaction/" + item["transaction"]}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span>No Data</span>
      )}
      <div className="pageno">
        {Array(Math.ceil(data.length / limit))
          .fill()
          .map((number, index) => (
            <span
              key={index}
              id={index + 1}
              className="no"
              onClick={pagination}
            >
              {index + 1}
            </span>
          ))}
      </div>
    </>
  );
};

export default TableComp;
// {
//   /* <thead>
//           <tr>
//             {Object.entries(locals).map(([name, text], index) =>
//               name !== "transactionReceipt" ? (
//                 <th key={index} id={name} name={name} onClick={handleClick}>
//                   {text}
//                 </th>
//               ) : (
//                 <th key={index} name={name}>
//                   {text}
//                 </th>
//               )
//             )}
//             <th>Action</th>
//             <th>Edit</th>
//           </tr>
//         </thead> */
// }
// {
//   /* {tableBody && (
//           <tbody className="show-data-content">
//             {tableBody.map((name, index) => (
//               <tr key={index}>
//                 {Object.entries(name).map(
//                   ([key, value], index) =>
//                     key !== "transaction" &&
//                     (value.includes("data:image") ? (
//                       <td key={index}>
//                         <img
//                           className="base64-img"
//                           src={value}
//                           alt="transaction"
//                           width="100px"
//                           height="60px"
//                         />
//                       </td>
//                     ) : (
//                       <td key={index}>{value}</td>
//                     ))
//                 )}
//                 <td>
//                   <Link to={"/transaction/" + name["transaction"]}>View</Link>{" "}
//                 </td>
//                 <td>
//                   <Link to={"/update-transaction/" + name["transaction"]}>
//                     Edit
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         )} */
// }
