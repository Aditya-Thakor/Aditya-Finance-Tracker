import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getLocalData } from "../../utils/helper";

const Transaction = (props) => {
  let id = useParams().number;
  const [Data, setData] = useState({});
  const [hold, setHold] = useState(null);
  const stoarge = getLocalData();

  useEffect(() => {
    stoarge.filter((item) => {
      if (item.transaction === id) {
        setData({ ...Data, ...item });
      }
    });
  }, []);

  let total = stoarge.length;
  let navigate = useNavigate();

  useEffect(() => {
    setHold(true);
    if (id > total || isNaN(id)) {
      navigate("/view-transactions");
    } else {
      setHold(false);
    }
  }, []);

  return (
    !hold &&
    hold != null && (
      <div>
        <div>
          <div className="header-div">
            <h1>Transaction No. : {id}</h1>
            <div className="links">
              <Link to="/view-transactions">View Transaction</Link>
              <Link to="/add-transaction">Add Transaction</Link>
            </div>
          </div>
          <table className="table table-borderless">
            <tbody>
              {Object.entries(Data).map((item, index) => (
                <>
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
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default Transaction;
