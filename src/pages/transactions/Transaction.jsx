import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TransactionContext } from "../../context/TransactionContext";

const Transaction = (props) => {
  let id = useParams().number;

  const [Data, setData] = useState({});
  const [hold, setHold] = useState(null);
  const { transactionsData } = useContext(TransactionContext);

  useEffect(() => {
    transactionsData.filter((item) => {
      if (item.transactionId === id) {
        setData({ ...Data, ...item });
      }
    });
  }, []);

  let total = transactionsData.length;
  let navigate = useNavigate();

  useEffect(() => {
    setHold(true);
    if (id > total || isNaN(id)) {
      navigate("/view-transactions");
    } else {
      setHold(false);
    }
  });

  return (
    !hold &&
    hold != null && (
      <div>
        <div className="nav">
          <Link className="anchor" to="/add-transaction">
            Add Transaction
          </Link>{" "}
          <Link className="anchor" to="/view-transactions">
            View Transaction
          </Link>
        </div>
        <div>
          <div className="header-div">
            <h1>Transaction : {id}</h1>
          </div>
          <table className="table table-borderless">
            <tbody>
              {Object.entries(Data).map((item, index) => (
                <tr key={index} className="show-data-content">
                  <td>{[item[0]]}</td>
                  {item[1].includes("data:image") ? (
                    <td>
                      <img
                        src={item[1]}
                        height="60px"
                        width="100px"
                        alt="imagea"
                      />
                    </td>
                  ) : (
                    <td>{[item[1]]}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default Transaction;
