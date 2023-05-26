import * as yup from "yup";

const FILE_MAX_SIZE = 1024 * 1024;
const FILE_TYPE = ["image/jpg", "image/jpeg", "image/png"];

export const validAddTransaction = yup.object().shape({
  transactionId: yup.mixed(),
  transactionDate: yup.date().required().typeError("Date is required"),
  transactionMY: yup.string().trim().required("Month/Year is Required"),
  transactionNote: yup.string().trim().required("Note is Required"),
  transactionTo: yup.string().trim().required("To is Required"),
  transactionFrom: yup.string().trim().required("From is Required"),
  transactionType: yup.string().trim().required("Type is Required"),
  transactionAmount: yup
    .number()
    .required()
    .typeError("Amount is Required")
    .positive("Amount should be positive")
    .integer("Amount should be integer"),
  transactionReceipt: yup
    .mixed<FileList>()
    .required()
    .test("transactionReceipt", "Receipt is Required", (file) =>
      file.length > 0 ? true : false
    )
    .test("transactionReceipt", "Image Format should be JPEG/JPG/PNG", (file) =>
      file.length > 0 && FILE_TYPE.includes(file[0].type) ? true : false
    )
    .test("transactionReceipt", "Size should be less than 1MB", (file) =>
      file.length > 0 && FILE_MAX_SIZE > file[0].size ? true : false
    ),
});

export const validRegsiter = yup.object().shape({
  username: yup.string().required("Username is Required"),
  password: yup
    .string()
    .required("Password is Required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
  email: yup
    .string()
    .required("Email is Required")
    .email("Invalid Email Address"),
  confirm: yup
    .string()
    .required("Confirm Password is Required")
    .oneOf([yup.ref("password")], "Password & Confirm Password not Match"),
});
