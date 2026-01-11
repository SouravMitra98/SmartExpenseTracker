import React from 'react';
export default function ExpenseSummary({ expenses }) {
    const total = expenses.reduce(
        (sum, e) => sum + Number(e.amount || 0),
        0
    );

    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold text-slate-800 mb-2">
                Monthly Expenses
            </h3>

            <p className="text-3xl font-bold text-slate-900">
                ₹ {total.toLocaleString()}
            </p>

            <div className="mt-4 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full w-2/3 bg-purple-500 rounded-full" />
            </div>

            <p className="text-xs text-slate-500 mt-2">
                Based on current month spending
            </p>
        </div>
    );
}
