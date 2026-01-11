import React from 'react';
import api from '../api/api';

export default function ExpenseList({ expenses, onDelete }) {
    if (!expenses.length) {
        return (
            <div className='text-center text-gray-500 mt-10'>
                No expenses yet. Add Your first one!
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            {expenses.map(e => (
                <div key={e._id} className='bg-white rounded-lg shadow p-4 flex justify-between items-center'>
                    <div>
                        <h3 className='font-semibold text-lg'>{e.title}</h3>
                        <p className='text-sm text-grey-500'>{e.category}</p>
                    </div>
                    <div className='text-right'>
                        <p className='text-xl font-bold text-red-600'>₹{e.amount}</p>

                        <button onClick={async () => {
                            await api.delete(`/expenses/${e._id}`);
                            onDelete(e._id);
                        }}

                            className='text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}