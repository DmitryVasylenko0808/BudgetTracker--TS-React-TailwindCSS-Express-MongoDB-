import React, { useEffect } from "react";
import { useGetReportsQuery } from "../redux/services/staticticsApi";
import { useSearchParams } from "react-router-dom";
import { CategoryType } from "../redux/services/types";
import ReportsFilter from "../components/Reports/ReportsFilter";
import ReportsTable from "../components/Reports/ReportsTable";
import { useDate } from "../hooks/date";
import Loader from "../components/Commons/Loader";

const ReportsPage = () => {
    const { minYear } = useDate();
    const [searchParams, setSearchParams] = useSearchParams();

    const year = searchParams.get("year") as string || minYear.toString();
    const type = searchParams.get("type") as CategoryType || "Income";

    const { data: reports, isLoading } = useGetReportsQuery({ year, type });

    useEffect(() => {
        setSearchParams({ year, type });
    }, []);

    const handleSelectYear = (year: string | number) => {
        setSearchParams({year: year as string, type });
    }

    const handleSelectType = (type: CategoryType) => {
        setSearchParams({ year, type });
    }

    if (isLoading) {
        return <Loader variant="primary" />
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