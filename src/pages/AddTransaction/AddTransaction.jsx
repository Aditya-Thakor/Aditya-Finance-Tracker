import React, { useState } from "react";
import { DropDownlist } from "../../components/DropDownList/DropDownlist";
import { InputFields } from "../../components/InputFields/InputFields";
import { useNavigate, Link } from "react-router-dom";
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

  const [errmsg, setErrmsg] = useState(InitialValues);
  const [values, setValues] = useState(InitialValues);

  const selectField = {
    1: {
      name: "transactionMY",
      label: "Select Field of month year",
      optionValue: [
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
      label: "Select Transaction Type",
      optionValue: ["Home Expense", "Personal Expense", "Income"],
    },
    3: {
      name: "transactionFrom",
      label: "Select From Account",
      optionValue: [
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
      label: "Select To Account",
      optionValue: [
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
    let arr = [];

    Object.values(errmsg).map((msg) => {
      if (!(msg === "")) arr.push("err");
      return 0;
    });

    if (!(arr.length > 0)) {
      let getvalue = JSON.parse(localStorage.getItem("value"));
      getvalue != null ? getvalue.push(values) : (getvalue = [values]);
      localStorage.setItem("value", JSON.stringify(getvalue));
      navigate("/viewTransaction");
    }
  };

  const onchange = (e) => {
    const name = e.target.name;
    let value = e.target.value.trim();
    let file;

    const emptyField = (name, value) => {
      value === ""
        ? setErrmsg({ ...errmsg, [name]: "Field is Empty" })
        : setErrmsg({ ...errmsg, [name]: "" });
    };

    const checkSelect = (name, value) => {
      value === ""
        ? setErrmsg({ ...errmsg, [name]: "Please Select This Field" })
        : setErrmsg({ ...errmsg, [name]: "" });
    };

    switch (name) {
      case "transactionDate":
        emptyField(name, value);
        break;

      case "transactionAmount":
        if (value === "") {
          emptyField(name, value);
        } else if (!/^[0-9]*$/.test(value)) {
          setErrmsg({ ...errmsg, [name]: "Enter Digits only" });
        } else {
          setErrmsg({ ...errmsg, [name]: "" });
        }
        break;

      case "transactionFrom":
        checkSelect(name, value);
        break;

      case "transactionTo":
        checkSelect(name, value);
        break;

      case "transactionType":
        checkSelect(name, value);
        break;

      case "transactionMY":
        checkSelect(name, value);
        break;

      case "transactionNotes":
        emptyField(name, value);
        if (value.length >= 250)
          setErrmsg({
            ...errmsg,
            [name]: "Length Should be less than 250 letters.",
          });
        break;
      case "transactionReceipt":
        let files = e.target.files[0];
        if (files) {
          if (files.size > 1000000)
            setErrmsg({
              ...errmsg,
              [name]: "Your image file is simply too big",
            });
          else if (
            files.type === "image/jpg" ||
            files.type === "image/png" ||
            files.type === "image/jpeg"
          ) {
            file = new FileReader();
            file.readAsDataURL(files);
            file.onloadend = () => {
              setValues({ ...values, [name]: file.result });
              setErrmsg({ ...errmsg, [name]: "" });
            };
          } else {
            setErrmsg({ ...errmsg, [name]: "The Format is not supported" });
          }
        }
        break;

      default:
    }
    if (!(name === "transactionReceipt")) {
      setValues({ ...values, [name]: value });
    }
  };

  const btnClick = () => {
    let obj = {};
    console.log(values);
    Object.keys(values).map((item) => {
      if (values[item] === "") {
        obj = { ...obj, [item]: "Field is Empty" };
      }
      return 0;
    });
    setErrmsg({ ...errmsg, ...obj });
  };

  return (
    <form action="" method="post" onSubmit={checkSubmit}>
      <Link to="/viewTransaction">View Transaction</Link>
      <div className="container">
        <div className="section">
          <InputFields
            {...inputFields[0]}
            onChange={onchange}
            value={values["name"]}
            errmsg={errmsg.transactionDate}
          />
          {Object.values(selectField).map((item, index) => (
            <div className="section-row" key={index}>
              <DropDownlist {...item} onChange={onchange} errmsg={errmsg} />
            </div>
          ))}
          <InputFields
            {...inputFields[1]}
            onChange={onchange}
            errmsg={errmsg.transactionAmount}
          />
          <InputFields
            {...inputFields[2]}
            onChange={onchange}
            errmsg={errmsg.transactionReceipt}
          />
          <div className="section-row">
            <label htmlFor="note">Notes : </label>
            <textarea
              name="transactionNotes"
              className="inputs-textarea"
              onChange={onchange}
            ></textarea>
            <label className="errmsg" htmlFor="">
              {errmsg.transactionNotes}
            </label>
          </div>
          <div className="section-row">
            <button className="inputs" type="submit" onClick={btnClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTransaction;
