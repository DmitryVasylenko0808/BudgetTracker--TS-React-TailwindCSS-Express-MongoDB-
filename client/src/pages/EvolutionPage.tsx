import React, { useEffect, useState } from "react";
import { useGetEvolutionQuery } from "../redux/services/staticticsApi";
import { useSearchParams } from "react-router-dom";
import EvolutionChart from "../components/Evolution/EvolutionChart";
import { useGetCategoriesQuery } from "../redux/services/categoriesApi";
import { StatisticData } from "../redux/services/types";
import EvolutionFilter from "../components/Evolution/EvolutionFIlter";

const EvolutionPage = () => {
    const [hiddenEmpty, setIsHiddenEmpty] = useState<boolean>(false);
    const [data, setData] = useState<StatisticData | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const periodType = searchParams.get("periodType") as "yearly" | "monthly" || "monthly";
    const category = searchParams.get("category") as string || "all";

    const { data: categories } = useGetCategoriesQuery();
    const { data: outcomes, isLoading: isLoadingOutcomes } = useGetEvolutionQuery({ type: "Outcome", periodType, category });
    const { data: incomes, isLoading: isLoadingIncomes } = useGetEvolutionQuery({ type: "Income", periodType, category });

    useEffect(() => {
        setSearchParams(
            { periodType, category },
            { replace: true }
        );
    }, []);

    useEffect(() => {
        if (incomes && outcomes) {
            const incomesResult = hiddenEmpty ? incomes.filter(item => item.sum !== 0) : incomes;
            const outcomesResult = hiddenEmpty ? outcomes.filter(item => item.sum !== 0) : outcomes;

            setData({ 
                incomes: incomesResult,
                outcomes: outcomesResult
            });
        }
    }, [incomes, outcomes, hiddenEmpty])

    const handleSelectPeriod = (selectedPeriod: string) => {
        setSearchParams(
            { periodType: selectedPeriod, category },
            { replace: true }
        );
    }

    const handleSelectCategory = (selectedCategory: string) => {
        setSearchParams(
            { periodType, category: selectedCategory },
            { replace: true }
        );
    }

    const handleShowEmpty = () => setIsHiddenEmpty(false);
    const handleHideEmpty = () => setIsHiddenEmpty(true);

    const isExistIncomes = data && data.incomes.length && data.incomes.some(s => s.sum !== 0);
    const isExistOutcomes = data && data.outcomes.length && data.outcomes.some(s => s.sum !== 0);

    if (isLoadingOutcomes || isLoadingIncomes) {
        <div className="">Loading...</div>
    }

    return (
        <>
            <EvolutionFilter
                periodType={periodType}
                category={category}
                categories={categories}
                filterValue={hiddenEmpty}
                onSelectPeriod={handleSelectPeriod}
                onSelectCategory={handleSelectCategory}
                onHideEmpty={handleHideEmpty}
                onShowAll={handleShowEmpty}
            />
            {!isExistIncomes && !isExistOutcomes && 
                <h3 className="text-center text-gray-strength font-bold">No data</h3>
            }
            {isExistIncomes 
                ? <EvolutionChart 
                    period={periodType} 
                    type="Income" 
                    category={category} 
                    data={data.incomes} 
                  />
                : null
            }                
            {isExistOutcomes 
                ? <EvolutionChart 
                    period={periodType} 
                    type="Outcome" 
                    category={category} 
                    data={data.outcomes} 
                  /> 
                : null
            }
        </>
    );
}

export default EvolutionPage;