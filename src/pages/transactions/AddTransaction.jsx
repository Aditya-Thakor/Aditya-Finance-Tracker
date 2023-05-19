import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useNavigate, Link, useParams } from "react-router-dom";
import { addtransationField, initialValues } from "../../utils/const";
import { get, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  deleteTransaction,
} from "../../redux-dux/slices/transactionSlice";
import FormButton from "../../components/FormFields/FormButton";
import FormInput from "../../components/FormFields/FormInput";

const AddTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(addTransaction);

  const { id } = useParams();
  const [editData, setEditData] = useState({});
  const [imageDisplay, setImageDisplay] = useState(true);
  const transactionsData = useSelector((state) => state.transactions);

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const FILE_MAX_SIZE = 1024 * 1024;

  const schema = yup.object().shape({
    transactionDate: yup.date().required().typeError("Date is Required"),
    transactionMY: yup.string().required("Month/Year is Required"),
    transactionType: yup.string().required("Type is Required"),
    transactionFrom: yup.string().required("From is Required"),
    transactionTo: yup
      .string()
      .required("To is Required")
      .not(
        [yup.ref("transactionFrom")],
        "From and To account should be not same"
      ),
    transactionAmount: yup
      .number()
      .required()
      .typeError("Amount is Required")
      .positive()
      .min(1),
    transactionNotes: yup.string().required("Notes is Required").max(250),
    transactionReceipt: yup
      .mixed()
      .required()
      .test("transactionReceipt", "File is required", (File) => {
        return File.length > 0 ? true : false;
      })
      .test(
        "transactionReceipt",
        "Image Format should be JPEG/JPG/PNG",
        (File) => {
          if (File.length > 0) {
            return SUPPORTED_FORMATS.includes(File[0].type);
          }
        }
      )
      .test("transactionReceipt", "Size should be less than 1MB", (File) => {
        if (File.length > 0) return File[0].size > FILE_MAX_SIZE ? false : true;
      }),
  });

  useEffect(() => {
    if (id) {
      transactionsData.filter((transaction) => {
        return (
          transaction.transactionId === id && setEditData(() => transaction)
        );
      });
    }
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: id ? editData : null,
  });

  // Functions
  const onSubmit = async (data) => {
    const FILE = new FileReader();
    const dataLength = transactionsData.length;
    let counter = 0;
    let filterData = {
      ...data,
      transactionAmount: data.transactionAmount.toString(),
    };

    FILE.readAsDataURL(filterData.transactionReceipt[0]);
    FILE.onloadend = async () => {
      filterData.transactionReceipt = FILE.result;
    };

    counter =
      dataLength > 0
        ? parseInt(transactionsData[dataLength - 1].transactionId) + 1
        : 1;

    const date = new Date(data.transactionDate);
    let getdate = date.getDate();
    let getmonth = date.getMonth();
    let getyear = date.getFullYear();

    if (getdate < 10) {
      getdate = "0" + getdate;
    }

    if (getmonth < 10) {
      getmonth = "0" + getmonth;
    }

    const fullDate = getyear + "-" + getmonth + "-" + getdate;
    filterData = {
      ...filterData,
      transactionId: id ? id : counter.toString(),
      transactionDate: fullDate,
    };

    setTimeout(() => {
      id && dispatch(deleteTransaction(id));
      dispatch(addTransaction({ ...filterData }));
      navigate("/view-transactions");
    }, 100);
  };

  return (
    <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
      <div className="nav">
        <Link className="anchor" to="/view-transactions">
          View Transaction
        </Link>
      </div>

      <div className="container">
        <div className="section">
          {addtransationField.map((field, i) => (
            <div key={i}>
              {id && imageDisplay && field.name === "transactionReceipt" ? (
                <div className="edit-data">
                  <label htmlFor="inputPassword6" className="col-form-label">
                    Enter Transaction Receipt :
                  </label>
                  <img
                    alt="transactionReceipt"
                    src={editData["transactionReceipt"]}
                  />
                  <span onClick={() => setImageDisplay(() => false)}> X </span>
                </div>
              ) : (
                <FormInput register={register} errors={errors} {...field} />
              )}
            </div>
          ))}

          <div className="submit-data">
            <FormButton type="submit" name="add transaction" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTransaction;
