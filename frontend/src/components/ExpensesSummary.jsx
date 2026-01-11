import React from "react";

export default function ExpenseSummary({ expenses }) {
    const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-grey-800 p-4 rounded-xl shadow">
                <h4 className="text-sm text-gray-500 dark:text-grey-400">
                    total Expenses
                </h4>
                <p className="text-2xl font-bold text-red-600">
                    ₹ {total}
                </p>
            </div>
            <div className="bg-white dark:bg-grey-800 p-4 rounded-xl shadow">
                <h4 className="text-sm text-grey-500 dark:text-grey-400">
                    Total Records
                </h4>
                <p className="text-2xl font-bold">
                    {expenses.length}
                </p>
            </div>
            <div className="bg-white dark:bg-grey-800 p-4 rounded-xl shadow">
                <h4 className="text-sm text-grey-500 dark:text-grey-400">
                    Average Expenses
                </h4>
                <p className="text-2xl font-bold">
                    ₹ {expenses.length ? Math.round(total / expenses.length) : 0}
                </p>
            </div>
        </div>
    );
}