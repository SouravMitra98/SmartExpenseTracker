import React from 'react';

export default function Sidebar({ user }) {
    if (!user) return null;

    return (
        <aside className="w-64 bg-white border-r px-6 py-8 hidden lg:flex flex-col">


            <h1 className="text-xl font-bold text-purple-600 mb-10">
                Smart Expense
            </h1>


            <div className="flex items-center gap-3 mb-10">
                <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name
                    )}&background=7c3aed&color=fff`}
                    alt={user.name}
                    className="h-12 w-12 rounded-full"
                />
                <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">
                        {user.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                        {user.email}
                    </p>
                </div>
            </div>


            <nav className="flex-1 space-y-2 text-sm">
                <SidebarItem icon="📊" label="Dashboard" active />
                <SidebarItem icon="💳" label="Transactions" />
                <SidebarItem icon="👛" label="Wallet" />
                <SidebarItem icon="📈" label="Reports" />
                <SidebarItem icon="⚙️" label="Settings" />
            </nav>


            <div className="mt-8 rounded-xl bg-purple-50 p-4">
                <p className="text-sm font-medium text-purple-700">
                    Track smarter
                </p>
                <p className="text-xs text-purple-600 mt-1">
                    Control your daily spending easily.
                </p>
            </div>


            <button
                onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }}
                className="mt-6 flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
            >
                🚪 Sign out
            </button>
        </aside>
    );
}

function SidebarItem({ icon, label, active }) {
    return (
        <div
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition
            ${active
                    ? 'bg-purple-100 text-purple-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
        >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </div>
    );
}
