import * as yup from "yup";
import FormInputs from "../../components/formfields/FormInputs";
import FormButton from "../../components/formfields/FormButton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addTransactionField } from "../../utils/const";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { validAddTransaction } from "../../utils/yupValidations";
import { imageBase64 } from "../../utils/helper";
import { TransactionInterface } from "../../modals/transactions";
import {
  addTransaction,
  deleteTransaction,
} from "../../redux/slices/transactionsSlice";

const AddTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [editData, setEditData] = useState<object>({});
  const transactionData = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    if (id) {
      transactionData.filter(
        (transaction) =>
          transaction.transactionId === parseInt(id) &&
          setEditData(() => transaction)
      );
    }
  }, []);

  const addSchema: yup.ObjectSchema<TransactionInterface> = validAddTransaction;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addSchema),
    values: id ? editData : undefined,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let filterData = { ...data };

    const dateobj = new Date(data.transactionDate);
    const year = dateobj.getFullYear();
    let month: string | number = dateobj.getMonth() + 1;
    let date: string | number = dateobj.getDate();

    if (date < 10) date = "0" + date;
    if (month < 10) month = "0" + month;
    const tdate = year + "-" + month + "-" + date;

    const fileBase64: string | ArrayBuffer | null = await imageBase64(
      data.transactionReceipt
    );

    const tlength = transactionData.length + 1;
    filterData = {
      ...filterData,
      transactionDate: tdate,
      transactionReceipt: fileBase64,
      transactionId: tlength,
    };

    if (id) dispatch(deleteTransaction(parseInt(id)));
    dispatch(addTransaction(filterData as TransactionInterface));
    navigate("/view-transactions");
  };

  return (
    <div>
      <div className="nav-link">
        <Link to="/view-transactions">View Transactions</Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {addTransactionField.map((field, i) => (
          <FormInputs
            key={i}
            className="form-control"
            register={register}
            errors={errors}
            {...field}
          />
        ))}
        <FormButton
          type="submit"
          label="Add"
          name="submit"
          className="form-control"
        />
      </form>
    </div>
  );
};

export default AddTransaction;
