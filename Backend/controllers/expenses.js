const Expense = require("../models/expense");
const bcrypt = require('bcryptjs');
const User = require("../models/user");
exports.addExpense = async (req, res) => {
    const { Date_of_payment, Payee, Payment_Method, Description, Amount, Status } = req.body;
    try{
    const newExpense = new Expense({
      Date_of_payment, Payee, Payment_Method, Description, Amount, Status
    });
    const expense = await newExpense.save();
    if (expense) {
      console.log(expense)
      return res
        .status(200)
        .json({
          success: true,
          expense,
          message: "Expense Added Successfully !",
        });
    } else {
      res.json({ error: "Failed to create Product ", success: false });
    }
  }
  catch(err){console.log(err)}
};
exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find();
  if (expenses) {
    let cash_paid = 0;
    let cash_unpaid = 0;
    let total = 0;
  for(let i=0; i<expenses.length; i++){ 
    if(expenses[i].Status == 'Paid'){
      cash_paid += expenses[i].Amount
    }
    else{
      cash_unpaid += expenses[i].Amount
    }
  }
  let total_expense = {
    cash_paid, cash_unpaid, total : cash_paid + cash_unpaid
  }
  console.log(expenses)
    return res.status(200).json({success: true, expenses, total_expense });
  }
};
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
    const { Date_of_payment, Payee, Payment_Method, Description, Amount, Status } = req.body;
    const newExpense = {
      Date_of_payment, Payee, Payment_Method, Description, Amount, Status
    };
    
    const expense = await Expense.findOneAndUpdate({_id : id}, newExpense, {new: true});
    if (expense) {
      return res.status(200).json({success: true, message:"Expense updated successfully", expense });
    }
    else{
      return res.json({ error: "Failed to update Expense", success: false,})
    }
};
exports.deleteExpense = async (req, res) => {
  Expense.findOne({ _id: req.params.id }).exec((err, expense) => {
    if (err || !expense) {
      return res.status(422).json({ error: err });
    }
    expense
      .remove()
      .then((result) => {
        return res
          .status(200)
          .json({ result, message: "Expense Deleted successfully", success: true});
          
      })
      .catch((err) => {
        return res.json({ error: "Failed to delete Expense",success: false });
      });
  });
};
exports.getExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findOne({ _id: id });
  if (expense) {
    return res.status(200).json({ expense });
  } else {
    return res.json({ error: "something went wrong" });
  }
};
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.json({ error: "user already registered" });
  }
  const hash_password = await bcrypt.hash(password, 12);
  const _user = new User({
    firstName,
    lastName,
    email,
    hash_password,
  });
  const user = await _user.save();
  if (!user) {
    return res.json({success: false, error: "something went wrong" });
  } else {
    return res.status(201).json({ message: "User created successfully", user, success: true});
  }
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const passwordMatched = await bcrypt.compare(password, user.hash_password);
    if (passwordMatched) {
      // const token = jwt.sign({ _id: user._id }, process.env.jwtSecret);
      return res.status(200).json({ message: "login successful", user, success: true });
    } else {
      return res.json({ error: "Invalid email or password", success: false});
    }
  } else {
    return res.json({ error: "Invalid email or password",success: false });
  }
};
