export const registerField = [
  {
    name: "username",
    type: "text",
    placeholder: "Name",
    label: "Enter Your Name : ",
  },
  {
    name: "email",
    type: "text",
    placeholder: "Email",
    label: "Enter Your Email Address : ",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    label: "Enter Your Password : ",
  },
  {
    name: "confirm",
    type: "password",
    placeholder: "Confirm Password",
    label: "Enter Your Confirm Password : ",
  },
];

export const addTransactionField = [
  { name: "transactionDate", type: "date", label: "Transaction Date : " },
  {
    name: "transactionMY",
    type: "select",
    label: "Transaction Month/Year : ",
    placeholder: "Month/Year",
    options: {
      Jan_2023: "Jan 2023",
      Feb_2023: "Feb 2023",
      Mar_2023: "Mar 2023",
      Apr_2023: "Apr 2023",
      May_2023: "May 2023",
      June_2023: "June 2023",
      July_2023: "July 2023",
      Aug_2023: "Aug 2023",
      Sept_2023: "Sept 2023",
      Oct_2023: "Oct 2023",
      Nov_2023: "Nov 2023",
      Dec_2023: "Dec 2023",
    },
  },
  {
    name: "transactionType",
    type: "select",
    label: "Transaction Type : ",
    options: {
      "Home Expense": "Home Expense",
      Income: "Income",
      "Personal Expense": "Personal Expense",
    },
  },
  {
    name: "transactionFrom",
    type: "select",
    label: "Transaction From : ",
    options: {
      "Personal Account": "Personal Account",
      "Real Living": "Real Living",
      "My Dream Home": "My Dream Home",
      "Full Circle": "Full Circle",
    },
  },
  {
    name: "transactionTo",
    type: "select",
    label: "Transaction To : ",
    options: {
      "Personal Account": "Personal Account",
      "Real Living": "Real Living",
      "My Dream Home": "My Dream Home",
      "Full Circle": "Full Circle",
    },
  },
  {
    name: "transactionAmount",
    type: "number",
    label: "Transaction Amount : ",
    placeholder: "Amount",
  },
  {
    name: "transactionReceipt",
    type: "file",
    label: "Transaction Receipt : ",
  },
  {
    name: "transactionNote",
    type: "textarea",
    label: "Transaction Note : ",
    placeholder: "Transaction Note",
  },
];

export interface TransactionInterface {
  transactionId?: number;
  transactionDate?: string;
  transactionMY?: string;
  transactionAmount?: number;
  transactionNote?: string;
  transactionTo?: string;
  transactionFrom?: string;
  transactionType?: string;
  transactionReceipt?: string;
}

export const tableHeader: object = {
  transactionDate: "Transaction Date",
  transactionMY: "Transaction M/Y",
  transactionType: "Transaction Type",
  transactionFrom: "Transaction Form",
  transactionTo: "Transaction To",
  transactionAmount: "Transaction Amount",
  transactionNote: "Transaction Note",
  transactionReceipt: "Transaction Receipt",
};
