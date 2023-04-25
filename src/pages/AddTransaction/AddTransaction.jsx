import React from "react";
import { DropDownlist } from "../../components/DropDownList/DropDownlist";
import { InputFields } from "../../components/InputFields/InputFields";
import "./css/addTransaction.css";
const AddTransaction = () => {
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
      name: "transactiondate",
    },
    {
      label: "Enter Transaction Amount : ",
      type: "text",
      name: "transactionamount",
      placeholder: "Enter Amount",
    },
    {
      label: "Enter Transaction Receipt : ",
      type: "file",
      name: "transactionreceipt",
    },
  ];

  const checkSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form action="" method="post">
      <div className="container">
        <div className="section">
          <InputFields {...inputFields[0]} />
          {Object.values(selectField).map((item, index) => (
            <div className="section-row" key={index}>
              <DropDownlist {...item} />
            </div>
          ))}
          <InputFields {...inputFields[1]} />
          <InputFields {...inputFields[2]} />
          <div className="section-row">
            <label htmlFor="note">Notes : </label>
            <textarea name="note" className="inputs-textarea"></textarea>
          </div>
          <div className="section-row">
            <button className="inputs" type="submit" onClick={checkSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTransaction;
