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
      1: "Jan 2023",
      2: "Feb 2023",
      3: "Mar 2023",
      4: "Apr 2023",
      5: "May 2023",
      6: "Jun 2023",
      7: "Jul 2023",
      8: "Aug 2023",
      9: "Sep 2023",
      10: "Oct 2023",
      11: "Nov 2023",
      12: "Des 2023",
    },
  },
  2: {
    name: "transactionType",
    label: "Select Transaction Type",
    options: ["Home Expense", "Personal Expense", "Income"],
  },
  3: {
    name: "transactionFrom",
    label: "Select From Account",
    options: [
      "Personal Account",
      "Real Living",
      "My Dream Home",
      "Full Circle",
      "Core Realtors",
      "Big Block",
    ],
  },
  4: {
    name: "transactionTo",
    label: "Select To Account",
    options: [
      "Personal Account",
      "Real Living",
      "My Dream Home",
      "Full Circle",
      "Core Realtors",
      "Big Block",
    ],
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
];
