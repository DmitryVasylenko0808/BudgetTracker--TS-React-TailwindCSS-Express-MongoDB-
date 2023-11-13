import { ReportCategory } from "../../redux/services/types";

type ReportsTableProps = {
    data?: ReportCategory[] 
};

const ReportsTable = ({ data = [] }: ReportsTableProps) => {
    const months = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ]; //

    return (
        <table className="w-full border border-gray-light shadow-xl">
            <thead className="border-b border-gray-light">
                <tr className="flex font-bold text-center">
                    <td className="w-[160px] py-2 border-r">Month / Category</td>
                    {months.map((m, i) =>
                        <td className="flex-1 px-2 py-2 even:bg-gray-light/50" key={i}>{m}</td>
                    )}
                </tr>
            </thead>
            <tbody>
                {data?.map((r, rIndex) => (
                    <tr className="flex text-center border-y border-gray-light hover:bg-navy-light/20">
                        <td className="w-[160px] py-2 border-r" key={rIndex}>{r.category}</td>
                        {r.report.map((mr, i) => (
                            <td className="flex-1 px-2 py-2  even:bg-gray-light/50" key={i}>{mr.sum}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ReportsTable;