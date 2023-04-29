import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Transaction = (props) => {
  let id = useParams().number;

  const [hold, setHold] = useState(null);
  const stoarge = JSON.parse(localStorage.getItem("value"));
  let Data = stoarge[id - 1];
  let total = stoarge.length;
  let navigate = useNavigate();

  useEffect(() => {
    setHold(true);
    if (id > total || isNaN(id)) {
      navigate("/viewTransaction");
    } else {
      setHold(false);
    }
  });

  return (
    !hold &&
    hold != null && (
      <div>
        <div>
          <div className="header-div">
            <h1>Transaction No. : {id}</h1>
            <div className="links">
              <Link to="/viewTransaction">View Transaction</Link>
              <Link to="/addTransaction">Add Transaction</Link>
            </div>
          </div>
          <table className="show-data">
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
