// /const  variable array obj

export const initialValues = {
  transaction: "",
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
    type: "text",
    name: "transactionAmount",
    placeholder: "Enter Amount",
  },
  {
    name: "transactionReceipt",
    label: "Upload Transaction Receipt : ",
    type: "file",
  },
  {
    name: "transactionNotes",
    label: "Notes :",
    type: "textarea",
    placeholder: "Enter Note about Transaction",
  },
];

export const credits = {
  username: "",
  email: "",
  pass: "",
  confirm: "",
};

export const loginField = [
  {
    label: "Enter Your Email Address : ",
    name: "email",
    placeholder: "Email Address",
    type: "text",
  },
  {
    label: "Enter Your Password : ",
    name: "pass",
    placeholder: "Password",
    type: "password",
  },
];

export const registerField = [
  {
    label: "Enter Your Username : ",
    name: "username",
    placeholder: "Username",
    type: "text",
  },
  {
    label: "Enter Your Email Address : ",
    name: "email",
    placeholder: "Email Address",
    type: "text",
  },
  {
    label: "Enter Your Password : ",
    name: "pass",
    placeholder: "Password",
    type: "password",
  },
  {
    label: "Enter Your Confirm Password : ",
    name: "confirm",
    placeholder: "Confirm Password",
    type: "password",
  },
];
