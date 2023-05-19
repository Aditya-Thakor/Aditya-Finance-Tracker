import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { initialValues, selectField, inputFields } from "../../utils/const";
import { FormInput } from "../../components/formFields/FormInput";
import FormSelect from "../../components/formFields/FormSelect";
import FormTextarea from "../../components/formFields/FormTextarea";
import { FormButton } from "../../components/formFields/FormButton";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TransactionContext } from "../../context/TransactionContext";

const AddTransaction = () => {
  const navigate = useNavigate();

  const { transactionsData, setTransactionsData } =
    useContext(TransactionContext);
  const { id } = useParams();

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const FILE_MAX_SIZE = 1024 * 1024;

  const [editData, setEditData] = useState({});

  useEffect(() => {
    transactionsData.filter((item) => {
      if (item.transactionId === id) {
        setEditData({ ...item });
      }
    });
  }, []);

  const schema = Yup.object().shape({
    transactionDate: Yup.string().required("Date is Required"),
    transactionMY: Yup.string().required("Month/Year is Required"),
    transactionType: Yup.string().required("Type is Required"),
    transactionFrom: Yup.string().required("From is Required"),
    transactionTo: Yup.string().required("To is Required"),
    transactionNotes: Yup.string()
      .required("Notes is Required")
      .max(250, "Notes must be at most 250 characters"),
    transactionAmount: Yup.number()
      .typeError("Amount is Required")
      .required()
      .positive()
      .integer()
      .min(1, "Amount must be greater than or equal to 1"),
    transactionReceipt: Yup.mixed()
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: id ? editData : initialValues,
  });

  const submitted = async (data) => {
    const FILE = new FileReader();
    const dataLength = transactionsData.length;
    let counter = 0;
    let filterData = {
      ...initialValues,
      ...data,
      transactionAmount: data.transactionAmount.toString(),
    };

    let arr = transactionsData;
    FILE.readAsDataURL(filterData.transactionReceipt[0]);
    FILE.onloadend = async () => {
      filterData.transactionReceipt = FILE.result;
    };

    counter =
      dataLength > 0
        ? parseInt(transactionsData[dataLength - 1].transactionId) + 1
        : 1;

    filterData = { ...filterData, transactionId: counter.toString() };

    dataLength > 0 ? arr.push(filterData) : (arr = [filterData]);

    console.log(arr);
    setTransactionsData(arr);
    navigate("/view-transactions");
  };

  return (
    <form action="" method="post" onSubmit={handleSubmit(submitted)}>
      <div className="nav">
        <Link className="anchor" to="/view-transactions">
          View Transaction
        </Link>
      </div>
      <div className="container">
        <div className="section">
          <FormInput errors={errors} {...inputFields[0]} register={register} />

          {Object.values(selectField).map((item, index) => (
            <div key={index}>
              <FormSelect
                className="form-select"
                register={register}
                errors={errors}
                {...item}
              />
            </div>
          ))}
          <FormInput errors={errors} {...inputFields[1]} register={register} />
          <FormInput errors={errors} {...inputFields[2]} register={register} />
          <>
            <FormTextarea
              className="form-textarea"
              placeholder="Enter Note about Transaction"
              name="transactionNotes"
              label="Notes :"
              register={register}
              errors={errors}
            />
          </>
          <div className="submit-data">
            <FormButton type="submit" name="add" value="Add Transaction" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTransaction;
