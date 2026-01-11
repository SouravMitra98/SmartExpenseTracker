import React from 'react';

export default function BalanceCard({ expenses }) {


    const MONTHLY_LIMIT = 350000;


    const spent = expenses.reduce(
        (sum, e) => sum + Number(e.amount || 0),
        0
    );


    const balance = MONTHLY_LIMIT - spent;

    return (
        <div className="bg-gradient-to-br from-purple-500 to-indigo-500
                        rounded-2xl p-6 text-white shadow-lg">

            <p className="text-sm opacity-80">
                Available balance
            </p>

            <h2 className="text-3xl font-bold mt-2">
                ₹ {balance.toLocaleString()}
            </h2>

            <p className="mt-6 text-sm opacity-70">
                **** 3922
            </p>

            <div className="mt-6 flex justify-between text-sm">
                <div>
                    <p className="opacity-70">Monthly Limit</p>
                    <p className="font-semibold">
                        ₹ {MONTHLY_LIMIT.toLocaleString()}
                    </p>
                </div>

                <div>
                    <p className="opacity-70">Spent</p>
                    <p className="font-semibold text-red-200">
                        ₹ {spent.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
