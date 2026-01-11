import React from 'react';
import { useState } from 'react';
import api from '../api/api';

export default function ExpenseForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        if (!title || !amount) return;

        try {
            setLoading(true);
            const res = await api.post('/expenses', {
                title,
                amount,
                category,
            });

            onAdd(res.data);
            setTitle('');
            setAmount('');
            setCategory('Food');
        } catch {
            alert('Failed to add expense');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-5 max-w-md mx-auto"
        >

            <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">
                    Expense Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Grocery, Uber, Rent"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>


            <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">
                    Amount (₹)
                </label>
                <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="e.g. 1200"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>


            <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">
                    Category
                </label>
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-white 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Shopping</option>
                    <option>Bills</option>
                    <option>Entertainment</option>
                    <option>Other</option>
                </select>
            </div>


            <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 rounded-xl bg-blue-600 py-3 text-sm font-semibold 
        text-white hover:bg-blue-700 transition"
            >
                {loading ? 'Adding...' : 'Add Expense'}
            </button>
        </form>
    );
}
