import Expense from '../models/Expense.js';

export const addExpense = async (req, res) => {
    const expense = await Expense.create({
        ...req.body,
        user: req.user.id
    });
    res.json(expense);
};

export const getExpenses = async(req, res) => {
    res.json(await Expense.find({user: req.user.id}));
};

export const deleteExpenses = async (req, res) => {
    const expense = await Expense.findByIdAndDelete({
        _id: req.params.id,
        user: req.user.id
    });

    if(!expense){
        return res.status(404).json({message: 'Expense not found'})
    }

    res.json({message: 'Deleted'})
};