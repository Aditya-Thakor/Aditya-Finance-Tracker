import React, { useEffect, useState } from "react";
import { DropDownlist } from "../../components/DropDownList/DropDownlist";
import { InputFields } from "../../components/InputFields/InputFields";
import { json, useNavigate } from "react-router-dom";
import "./css/addTransaction.css";
const AddTransaction = () => {
  const navigate = useNavigate();
  const InitialValues = {
    transactionDate: "",
    transactionMY: "",
    transactionType: "",
    transactionFrom: "",
    transactionTo: "",
    transactionAmount: "",
    transactionReceipt: "",
    transactionNotes: "",
  };

  const [values, setValues] = useState(InitialValues);
  const [storage, setStorage] = useState([]);
  const [btnClick, setClick] = useState(false);
  const selectField = {
    1: {
      name: "transactionMY",
      label: "Select Field of month year : ",
      optionValue: [
        "Select Month Year",
        "Jan 2023",
        "Feb 2023",
        "Mar 2023",
        "Apr 2023",
        "May 2023",
        "Jun 2023",
        "Jul 2023",
        "Aug 2023",
        "Sep 2023",
        "Oct 2023",
        "Nov 2023",
        "Des 2023",
      ],
    },
    2: {
      name: "transactionType",
      label: "Transaction Type : ",
      optionValue: [
        "Select Type",
        "Home Expense",
        "Personal Expense",
        "Income",
      ],
    },
    3: {
      name: "transactionFrom",
      label: "From Account : ",
      optionValue: [
        "Select Account",
        "Personal Account",
        "Real Living",
        "My Dream Home",
        "Full Circle",
        "Core Realtors",
        "Big Block",
      ],
    },
    4: {
      name: "transactionTo",
      label: "To Account : ",
      optionValue: [
        "Select Account",
        "Personal Account",
        "Real Living",
        "My Dream Home",
        "Full Circle",
        "Core Realtors",
        "Big Block",
      ],
    },
  };

  const inputFields = [
    {
      label: "Enter Transaction Date : ",
      type: "date",
      name: "transactionDate",
    },
    {
      label: "Enter Transaction Amount : ",
      type: "text",
      name: "transactionAmount",
      placeholder: "Enter Amount",
    },
    {
      name: "transactionReceipt",
      label: "Upload Transaction Receipt : ",
      type: "file",
    },
  ];

  const checkSubmit = (e) => {
    e.preventDefault();
    let isVAlid = true;
    if (isVAlid) {
      setClick(true);
    }
  };

  useEffect(() => {
    if (btnClick) {
      let getvalue = JSON.parse(localStorage.getItem("value"));
      getvalue != null ? getvalue.push(values) : (getvalue = [values]);
      localStorage.setItem("value", JSON.stringify(getvalue));
      navigate("/viewTransaction");
    }
  }, [btnClick]);

  const onchange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    let file;

    if (name === "transactionReceipt") {
      let files = e.target.files[0];
      console.log(files.type);
      if (files.size > 1000000) alert("size exceed");
      if (
        files.type == "image/jpg" ||
        files.type == "image/png" ||
        files.type == "image/jpeg"
      ) {
        file = new FileReader();
        file.readAsDataURL(files);
        file.onloadend = () => {
          setValues({ ...values, [name]: file.result });
        };
      } else {
        alert("type not match");
      }
    } else {
      setValues({ ...values, [name]: value });
    }
  };
  return (
    <form action="" method="post">
      <div className="container">
        <div className="section">
          <InputFields
            {...inputFields[0]}
            onChange={onchange}
            value={values["name"]}
          />
          {Object.values(selectField).map((item, index) => (
            <div className="section-row" key={index}>
              <DropDownlist {...item} onChange={onchange} />
            </div>
          ))}
          <InputFields {...inputFields[1]} onChange={onchange} />
          <InputFields {...inputFields[2]} onChange={onchange} />
          <div className="section-row">
            <label htmlFor="note">Notes : </label>
            <textarea
              name="transactionNotes"
              className="inputs-textarea"
              onChange={onchange}
            ></textarea>
            <label htmlFor="">A</label>
          </div>
          <div className="section-row">
            <button className="inputs" type="submit" onClick={checkSubmit}>
              Submit
            </button>
            <label htmlFor="">A</label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTransaction;
