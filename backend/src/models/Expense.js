import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        user: mongoose.Schema.Types.ObjectId,
        title: String,
        amount: Number,
        category: String,
        date: Date
    }
);

export default mongoose.model('Expense', expenseSchema);