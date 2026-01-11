import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#7c3aed",
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#ef4444",
    "#64748b"
];

export default function CategoryPieChart({ expenses }) {

    const data = Object.values(
        expenses.reduce((acc, e) => {
            acc[e.category] = acc[e.category] || {
                name: e.category,
                value: 0
            };
            acc[e.category].value += Number(e.amount);
            return acc;
        }, {})
    );

    if (!data.length) {
        return (
            <div className="text-sm text-gray-400 text-center mt-12">
                No data available
            </div>
        );
    }

    return (
        <div className="w-full h-[280px]">
            <h2 className="textAlign-center font-semibold mb-4">
                Expense Chart
            </h2>
            <card className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={4}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </card>
        </div>
    );
}
