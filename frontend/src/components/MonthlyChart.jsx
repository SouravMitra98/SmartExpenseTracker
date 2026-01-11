import React from 'react';

export default function MonthlyChart({ expenses }) {
    const monthly = {};

    expenses.forEach(e => {
        const month = new Date(e.createdAt).toLocaleString('default', { month: 'short' });
        monthly[month] = (monthly[month] || 0) + Number(e.amount);
    });

    return (
        <div className="bg-white dark:bg-gray-500 p-6 rounded-xl shadow mb-6">
            <h3 className="font-bold mb-4">Monthly Expenses</h3>

            {Object.entries(monthly).map(([m, v]) => (
                <div key={m} className="flex justify-between mb-2">
                    <span>{m}</span>
                    <span className="font-semibold">₹ {v}</span>
                </div>
            ))}
        </div>
    );
}
