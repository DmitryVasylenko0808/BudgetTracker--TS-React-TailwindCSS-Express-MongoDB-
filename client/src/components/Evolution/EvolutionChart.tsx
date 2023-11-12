import React from "react";
import { CategoryType, Statistic } from "../../redux/services/types";
import { ResponsiveContainer, BarChart, CartesianGrid, Tooltip, Bar, XAxis, YAxis } from "recharts";

type EvolutionChartProps = {
    period: string,
    type: CategoryType,
    category: string,
    data?: Statistic[]
};

const EvolutionChart = ({ period, type, category, data = [] }: EvolutionChartProps) => {
    const fillBarColor = type === "Income" ? "#15803d" : "#b91c1c"; 

    return (
        <div className="mb-10">
            <h3 className="mb-2 text-lg tracking-wide font-bold">
                {period} evolution of {type}s for category '{category}'
            </h3>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart height={100} data={data}>
                    <CartesianGrid horizontal vertical={false} stroke="#e4e2df" />
                    <Tooltip />
                    <Bar dataKey="sum" fill={fillBarColor}></Bar>
                    <XAxis dataKey="period" />
                    <YAxis />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default EvolutionChart;