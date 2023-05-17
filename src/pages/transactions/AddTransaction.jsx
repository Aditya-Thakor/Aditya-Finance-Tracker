import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import { initialValues, selectField, inputFields } from "../../utils/const";
import FormInputs from "../../components/FormFields/FormInputs";
import FormSelect from "../../components/FormFields/FormSelect";
import FormButton from "../../components/FormFields/FormButton";
import FormTextarea from "../../components/FormFields/FormTextarea";

const AddTransaction = () => {
  const navigate = useNavigate();
  const [errmsg, setErrmsg] = useState(initialValues);
  const [values, setValues] = useState(initialValues);

  const id = useParams().id;
  const store = JSON.parse(localStorage.getItem("value"));
  useEffect(() => {
    if (id) {
      setValues(store[id - 1]);
    }
  }, [id]);

  useEffect(() => {
    if (store) {
      store.filter((item) => {
        if (item.transaction === id) {
          setValues({ ...values, ...item });
        }
      });
    }
  }, []);
  const checkSubmit = (e) => {
    e.preventDefault();
    let arr = [];

    Object.values(errmsg).map((msg, index) => {
      if (!(msg === "")) arr.push("err");
      return 0;
    });

    if (!(arr.length > 0)) {
      let getvalue = JSON.parse(localStorage.getItem("value"));
      if (id) {
        if (getvalue) {
          getvalue.splice(id - 1, 1);
        }
      }
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
          ? setErrmsg({
              ...errmsg,
              [name]: name.replace("transaction", "") + " is Required ",
            })
          : setErrmsg({
              ...errmsg,
              [name]: name.replace("transaction", "") + " is Required",
            })
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
            [name]: name.replace("transaction", "") + " is Required",
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
    id
      ? (count = id)
      : getvalue !== null
      ? (count = getvalue.length + 1)
      : (count = 1);

    setValues({ ...values, transaction: count.toString() });
    Object.keys(values).map((item, index) => {
      if (item !== "transaction") {
        if (values[item] === "") {
          obj = {
            ...obj,
            [item]: item.replace("transaction", "") + " is Required",
          };
        }
      }
      return 0;
    });
    setErrmsg({ ...errmsg, ...obj });
  };

  return (
    <form action="" method="post" onSubmit={checkSubmit}>
      <div className="nav">
        <Link className="anchor" to="/view-transactions">
          View Transaction
        </Link>
      </div>
      <div className="container">
        <div className="section">
          <FormInputs
            errmsg={errmsg}
            handleChange={handleChange}
            value={values}
            {...inputFields[0]}
          />

          {Object.values(selectField).map((item, index) => (
            <div key={index}>
              <FormSelect
                className="form-select"
                value={values}
                handleChange={handleChange}
                errmsg={errmsg}
                {...item}
              />
            </div>
          ))}
          <FormInputs
            errmsg={errmsg}
            handleChange={handleChange}
            value={values}
            {...inputFields[1]}
          />
          <FormInputs
            errmsg={errmsg}
            handleChange={handleChange}
            value={values}
            {...inputFields[2]}
          />
          <>
            <FormTextarea
              className="form-textarea"
              placeholder="Enter Note about Transaction"
              name="transactionNotes"
              handleChange={handleChange}
              label="Notes :"
              errmsg={errmsg}
              value={values}
            />
          </>
          <div className="submit-data">
            <FormButton
              type="submit"
              name="ADD TRANSACTION"
              handleClick={handleClick}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTransaction;
