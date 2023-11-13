import React, { useEffect } from "react";
import { useGetReportsQuery } from "../redux/services/staticticsApi";
import { useSearchParams } from "react-router-dom";
import { CategoryType, ReportCategory } from "../redux/services/types";
import ReportsFilter from "../components/Reports/ReportsFilter";
import ReportsTable from "../components/Reports/ReportsTable";

const ReportsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const year = searchParams.get("year") as string;
    const type = searchParams.get("type") as CategoryType;

    const { data: reports, isLoading } = useGetReportsQuery({ year, type });

    useEffect(() => {
        setSearchParams({ year: "2020", type: "Income" });
    }, []);

    const handleSelectYear = (year: string | number) => {
        setSearchParams({
            year: year as string,
            type
        });
    }

    const handleSelectType = (type: CategoryType) => {
        setSearchParams({
            year,
            type: type
        });
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2 className="mb-4 text-xl tracking-wide font-bold">Reports</h2>
            <ReportsFilter
                currentYear={year}
                currentType={type}
                onSelectYear={handleSelectYear}
                onSelectType={handleSelectType}
            />
            <ReportsTable data={reports} />
        </>
    );
}

export default ReportsPage;