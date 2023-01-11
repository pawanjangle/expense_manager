const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema(
  {
    Date_of_payment: {
      type: String,
      // required: true,
    },
    Payee: {
      type: String,
      // required: false,
    },
    Payment_Method: {
      type: String,
      // required: true,
    },
    Description: {
      type: String,
      // required: true,
    },
    Amount: {
      type: Number,
      // required: true,
    },
    Status: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Expense", expenseSchema);