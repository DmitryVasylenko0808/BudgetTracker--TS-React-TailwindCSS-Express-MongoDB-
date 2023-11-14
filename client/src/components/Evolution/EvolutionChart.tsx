import React from "react";
import { CategoryType, Statistic } from "../../redux/services/types";
import { ResponsiveContainer, BarChart, CartesianGrid, Tooltip, Bar, XAxis, YAxis, Brush } from "recharts";

type EvolutionChartProps = {
    period: string,
    type: CategoryType,
    category: string,
    data?: Statistic[]
};

const EvolutionChart = ({ period, type, category, data = [] }: EvolutionChartProps) => {
    const fillBarIncomeColor = "#82ca9d"; 
    const fillBarOutcomeColor = "#f87171";
    const fillBarColor = type === "Income" ? fillBarIncomeColor : fillBarOutcomeColor;

    return (
        <div className="mb-10">
            <h3 className="mb-2 text-lg tracking-wide font-bold">
                {period} evolution of {type}s for category '{category}'
            </h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart height={100} data={data}>
                    <CartesianGrid horizontal vertical={false} stroke="#e4e2df" />
                    <Tooltip />
                    <YAxis />
                    <XAxis dataKey="period" />
                    <Brush dataKey="sum" height={30} stroke="#787f9f" />
                    <Bar dataKey="sum" fill={fillBarColor}></Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default EvolutionChart;