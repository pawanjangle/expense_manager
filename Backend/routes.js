const express = require("express");
const { addExpense, getExpenses, deleteExpense, updateExpense,getExpense, signup, signin } = require("./controllers/expenses");
const router = express.Router();
router.post("/addexpense", addExpense);
router.get("/getexpenses", getExpenses);
router.delete("/deleteexpense/:id", deleteExpense);
router.post("/updateexpense/:id", updateExpense);
router.post("/getexpense/:id", getExpense);
router.post("/signup",  signup);
router.post("/signin", signin);

module.exports = router;