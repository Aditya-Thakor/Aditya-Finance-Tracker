import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../components/formfields/FormButton";
import FormInputs from "../../components/formfields/FormInputs";
import { addTransactionField } from "../../utils/const";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/slices/transactionsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AddTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transactionData = useSelector((state: RootState) => state.transactions);

  const FILE_MAX_SIZE = 1024 * 1024;
  const FILE_TYPE = ["image/jpg", "image/jpeg", "image/png"];

  interface TAddTransaction {
    transactionDate: Date;
    transactionMY: string;
    transactionAmount: number;
    transactionNote: string;
    transactionTo: string;
    transactionFrom: string;
    transactionType: string;
    transactionReceipt: any;
  }

  const addSchema: yup.ObjectSchema<TAddTransaction> = yup.object().shape({
    transactionDate: yup.date().required().typeError("Date is required"),
    transactionMY: yup.string().required("Month/Year is Required"),
    transactionAmount: yup
      .number()
      .required()
      .typeError("Amount is Required")
      .positive("Amount should be positive")
      .integer("Amount should be integer"),
    transactionNote: yup.string().required("Note is Required"),
    transactionTo: yup.string().required("To is Required"),
    transactionFrom: yup.string().required("From is Required"),
    transactionType: yup.string().required("Type is Required"),
    transactionReceipt: yup
      .mixed()
      .required()
      .test("transactionReceipt", "Receipt is Required", (file: any) =>
        file.length > 0 ? true : false
      )
      .test(
        "transactionReceipt",
        "Image Format should be JPEG/JPG/PNG",
        (file: any) => {
          if (file.length > 0) {
            return FILE_TYPE.includes(file[0].type) ? true : false;
          }
        }
      )
      .test(
        "transactionReceipt",
        "Size should be less than 1MB",
        (file: any): any => {
          if (file.length > 0)
            return FILE_MAX_SIZE > file[0].size ? true : false;
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addSchema),
  });

  const imageBase64 = async (
    file: FileList
  ): Promise<string | ArrayBuffer | null> => {
    const FILE = new FileReader();
    FILE.readAsDataURL(file[0]);

    return new Promise((resolve, rejects) => {
      FILE.onloadend = () => {
        resolve(FILE.result);
      };
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let filterData = { ...data };

    const dateobj = new Date(data.transactionDate);
    let date: string | number = dateobj.getDate();
    let month: string | number = dateobj.getMonth() + 1;
    const year = dateobj.getFullYear();

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

    dispatch(addTransaction(filterData));
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
