import React from "react";
import { useEffect, useState } from "react";
import api from "../api/api";
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";
import BalanceCard from "../components/BalanceCard";
import StatsChart from "../components/StatsChart";
import ExpenseSummary from "../components/ExpenseSummary";
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";


export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [userRes, expenseRes] = await Promise.all([
                    api.get('/auth/me'),
                    api.get('/expenses'),
                ]);

                setUser(userRes.data);
                setExpenses(expenseRes.data);
            } catch (er) {
                console.error(er.response?.data || er.message);

                if (er.response?.status === 401) {
                    localStorage.removeItem('token');
                    alert('Session expired. Please login again.');
                    window.location.href = '/login';
                }
            }
        };

        loadData();
    }, []);

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-[#F6F7FB] ">


            <Sidebar user={user} />


            <main className="flex-1 p-8 space-y-8">

                <Navbar />


                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <BalanceCard expenses={expenses} />

                    <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm h-[320px]">
                        <StatsChart expenses={expenses} />
                    </div>
                </div>


                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">


                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-6">
                            Add Expense
                        </h3>

                        <ExpenseForm
                            onAdd={e => setExpenses([e, ...expenses])}
                        />
                    </div>


                    <ExpenseSummary expenses={expenses} />
                </div>


                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">
                        Recent Expenses
                    </h3>

                    <ExpenseList
                        expenses={expenses}
                        onDelete={id =>
                            setExpenses(expenses.filter(e => e._id !== id))
                        }
                    />
                </div>

            </main>
        </div>
    );
}
