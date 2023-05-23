import * as yup from "yup";
import { Link } from "react-router-dom";
import FormButton from "../../components/formfields/FormButton";
import FormInputs from "../../components/formfields/FormInputs";
import { addTransactionField } from "../../utils/const";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AddTransaction = () => {
  const FILE_MAX_SIZE = 1024 * 1024;
  const FILE_TYPE = ["image/jpg", "image/jpeg", "image/png"];

  type TAddTransaction = {
    transactionDate: Date;
    transactionMY: string;
    transactionAmount: number | string;
    transactionNote: string;
    transactionTo: string;
    transactionFrom: string;
    transactionType: string;
    transactionReceipt: object;
  };

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
      .test("transactionReceipt", "Receipt is Required", (file: any): boolean =>
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
        (file: any) => {
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

  const onSubmit: SubmitHandler<TAddTransaction> = (data): void => {};

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
