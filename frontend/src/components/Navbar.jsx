import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();

    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;

        if (dark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 border-b 
      bg-white/80 backdrop-blur 
      dark:bg-slate-900/80 dark:border-slate-800">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


                <h1 className="text-lg font-semibold tracking-tight
          text-slate-900 dark:text-white">
                    Smart Expense Tracker
                </h1>


                <div className="flex items-center gap-3">


                    {/* <button
                        onClick={() => setDark(!dark)}
                        className="h-10 w-10 flex items-center justify-center rounded-full
              bg-slate-100 hover:bg-slate-200
              dark:bg-slate-800 dark:hover:bg-slate-700
              transition"
                        aria-label="Toggle theme"
                    >
                        <span className="text-lg">
                            {dark ? "☀️" : "🌙"}
                        </span>
                    </button> */}


                    <button
                        onClick={logout}
                        className="
              flex items-center gap-2 px-4 py-2 rounded-full
              text-sm font-medium
              bg-slate-900 text-white
              hover:bg-slate-800
              dark:bg-red-500 dark:hover:bg-red-600
              transition
            "
                    >
                        ⎋ Logout
                    </button>

                </div>
            </div>
        </header>
    );
}
