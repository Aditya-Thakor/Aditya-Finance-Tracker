import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./css/addTransaction.css";
import { initialValues, selectField, inputFields } from "../../utils/const";
import FormSelect from "../../components/DropDownList/FormSelect";
import FormInputs from "../../components/DropDownList/FormInputs";
import FormButton from "../../components/DropDownList/FormButton";
import FormTextarea from "../../components/DropDownList/FormTextarea";

const AddTransaction = () => {
  const navigate = useNavigate();

  const [errmsg, setErrmsg] = useState(initialValues);
  const [values, setValues] = useState(initialValues);
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
      navigate("/view-transactions");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    let value = e.target.value.trim();
    const emptyField = (name, value) => {
      value === ""
        ? type === "select-one"
          ? setErrmsg({ ...errmsg, [name]: "Please Select This Field" })
          : setErrmsg({ ...errmsg, [name]: "Field is Empty" })
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
        emptyField(name, value);
        break;

      case "transactionTo":
        emptyField(name, value);
        break;

      case "transactionType":
        emptyField(name, value);
        break;

      case "transactionMY":
        emptyField(name, value);
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

        if (files === undefined)
          setErrmsg({
            ...errmsg,
            [name]: "Field is Empty",
          });

        if (files && files !== undefined) {
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
            let file = new FileReader();
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
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleClick = () => {
    let obj = {};
    let count = 1;
    let getvalue = JSON.parse(localStorage.getItem("value"));
    getvalue !== null ? (count = getvalue.length + 1) : (count = 1);
    setValues({ ...values, ["transaction"]: count.toString() });
    Object.keys(values).map((item) => {
      if (item !== "transaction") {
        if (values[item] === "") {
          obj = { ...obj, [item]: "Field is Empty" };
        }
      }
      return 0;
    });
    setErrmsg({ ...errmsg, ...obj });
  };

  return (
    <form action="" method="post" onSubmit={checkSubmit}>
      <Link to="/view-transactions">View Transaction</Link>
      <div className="container">
        <div className="section">
          <FormInputs
            {...inputFields[0]}
            className="form-inputs"
            errmsg={errmsg}
            handleChange={handleChange}
          />

          {Object.values(selectField).map((item, index) => (
            <>
              <FormSelect
                key={index}
                {...item}
                className="form-select"
                handleChange={handleChange}
                errmsg={errmsg}
              />
            </>
          ))}
          <FormInputs
            className="form-inputs"
            {...inputFields[1]}
            errmsg={errmsg}
            handleChange={handleChange}
          />
          <FormInputs
            className="form-inputs"
            {...inputFields[2]}
            errmsg={errmsg}
            handleChange={handleChange}
          />
          <>
            <FormTextarea
              className="form-textarea"
              placeholder="Enter Note about Transaction"
              name="transactionNotes"
              handleChange={handleChange}
              label="Notes :"
              errmsg={errmsg}
            />
          </>
          <>
            <FormButton
              className="inputs"
              type="submit"
              name="ADD TRANSACTION"
              handleClick={handleClick}
            />
          </>
        </div>
      </div>
    </form>
  );
};

export default AddTransaction;
