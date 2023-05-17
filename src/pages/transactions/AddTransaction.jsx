import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { initialValues, selectField, inputFields } from "../../utils/const";
import FormButton from "../../components/FormFields/FormButton";
import { getLocalData } from "../../utils/helper";
import FormInput from "../../components/FormFields/FormInput";

const AddTransaction = () => {
  const navigate = useNavigate();
  const [errmsg, setErrmsg] = useState(initialValues);
  const [values, setValues] = useState(initialValues);
  const { id } = useParams();
  const store = getLocalData();

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

  const onSubmit = (e) => {
    e.preventDefault();
    let arr = [];

    Object.values(errmsg).map((msg, index) => {
      if (!(msg === "")) arr.push("err");
      return 0;
    });

    if (!(arr.length > 0)) {
      let getvalue = getLocalData();

      if (id) {
        if (getvalue) {
          let counter = 0;
          getvalue.forEach((element) => {
            counter++;
            if (element["transaction"] === getvalue[id - 1]["transaction"]) {
              getvalue.splice(counter - 1, 1);
            }
          });
        }
      }
      getvalue != null ? getvalue.push(values) : (getvalue = [values]);
      localStorage.setItem("value", JSON.stringify(getvalue));
      navigate("/view-transactions");
    }
  };

  const onSelect = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    let value = e.target.value.trim();

    // const bool = validation()

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

  const onButtonClick = () => {
    let obj = {};
    let count = 1;
    let getvalue = getLocalData();

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
    <form action="" method="post" onSubmit={onSubmit}>
      <div className="nav">
        <Link className="anchor" to="/view-transactions">
          View Transaction
        </Link>
      </div>

      <div className="container">
        <div className="section">
          {Object.values(selectField).map((item, index) => (
            <div key={index}>
              <FormInput
                type="select"
                className="form-select"
                value={values}
                onSelect={onSelect}
                errmsg={errmsg}
                {...item}
              />
            </div>
          ))}

          {inputFields.map((attr, i) => (
            <div key={i}>
              <FormInput
                className="form-control rounded"
                errmsg={errmsg}
                onSelect={onSelect}
                value={values}
                {...attr}
              />
            </div>
          ))}

          <div className="submit-data">
            <FormButton
              type="submit"
              name="add transaction"
              handleClick={onButtonClick}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTransaction;
