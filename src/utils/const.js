export const defaultUsers = [
  {
    name: "Aditya",
    email: "abc@gmail.com",
    password: "12345678",
  },
  {
    name: "A",
    email: "a@gmail.com",
    password: "123456789",
  },
];

export const registerField = [
  {
    name: "name",
    label: "Name : ",
    placeholder: "Enter Your Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email : ",
    placeholder: "Enter Your Email Address",
    type: "text",
  },
  {
    name: "password",
    label: "Password : ",
    placeholder: "Enter Password",
    type: "text",
  },
  {
    name: "confirm",
    label: "Confirm Password : ",
    placeholder: "Enter Confirm Password",
    type: "text",
  },
];

export const initialValues = {
  transactionId: "",
  transactionDate: "",
  transactionMY: "",
  transactionType: "",
  transactionFrom: "",
  transactionTo: "",
  transactionAmount: "",
  transactionReceipt: "",
  transactionNotes: "",
};
export const selectField = {
  1: {
    name: "transactionMY",
    label: "Select Field of month year",
    options: {
      "Jan 2023": "Jan 2023",
      "Feb 2023": "Feb 2023",
      "Mar 2023": "Mar 2023",
      "Apr 2023": "Apr 2023",
      "May 2023": "May 2023",
      "Jun 2023": "Jun 2023",
      "Jul 2023": "Jul 2023",
      "Aug 2023": "Aug 2023",
      "Sep 2023": "Sep 2023",
      "Oct 2023": "Oct 2023",
      "Nov 2023": "Nov 2023",
      "Des 2023": "Des 2023",
    },
  },
  2: {
    name: "transactionType",
    label: "Select Transaction Type",
    options: {
      "Home Expense": "Home Expense",
      "Personal Expense": "Personal Expense",
      Income: "Income",
    },
  },
  3: {
    name: "transactionFrom",
    label: "Select From Account",
    options: {
      "Personal Account": "Personal Account",
      "Real Living": "Real Living",
      "My Dream Home": "My Dream Home",
      "Full Circle": "Full Circle",
      "Core Realtors": "Core Realtors",
      "Big Block": "Big Block",
    },
  },
  4: {
    name: "transactionTo",
    label: "Select To Account",
    options: {
      "Personal Account": "Personal Account",
      "Real Living": "Real Living",
      "My Dream Home": "My Dream Home",
      "Full Circle": "Full Circle",
      "Core Realtors": "Core Realtors",
      "Big Block": "Big Block",
    },
  },
};

export const inputFields = [
  {
    label: "Enter Transaction Date : ",
    type: "date",
    name: "transactionDate",
  },
  {
    label: "Enter Transaction Amount : ",
    type: "number",
    name: "transactionAmount",
    placeholder: "Enter Amount",
  },
  {
    name: "transactionReceipt",
    label: "Upload Transaction Receipt : ",
    type: "file",
  },
];

export const tableHeaders = {
  transactionDate: "Transaction Date",
  transactionMY: "Month Year",
  transactionType: "Transaction Type",
  transactionFrom: "From Account",
  transactionTo: "To Account",
  transactionAmount: "Transaction Amount",
  transactionReceipt: "Transaction Receipt",
  transactionNotes: "Transaction Note",
};
