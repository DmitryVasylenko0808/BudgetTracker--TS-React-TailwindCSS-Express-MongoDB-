const calculateEvolution = (transactions, type, periodType, category) => {
    let evolution;
    if (category === "all") {
        evolution = transactions.filter(t => t.type === type);
    } else {
        evolution = transactions.filter(t => t.type === type && t.category.title === category);
    }

    const yearsEvolution = transactions.map(e => e.date.getFullYear());
    const minYear = Math.min(...yearsEvolution);
    const maxYear = Math.max(...yearsEvolution);

    const years = [];
    for (let i = minYear; i <= maxYear; i++) {
        years.push(i);
    }

    const result = [];
    if (periodType === "yearly") {
        for (const year of years) {
            const transactionsForYear = evolution.filter(e => e.date.getFullYear() === year);
            const totalSum = parseFloat(transactionsForYear.reduce((acc, curr) => (acc + curr.sum), 0).toFixed(2));
    
            const resultItem = {
                period: year,
                sum: totalSum
            };
            result.push(resultItem);
        }
    } else if (periodType === "monthly") {
        const months = [];
        for (let i = 1; i <= 12; i++) {
            months.push(i);
        }
    
        for (const year of years) {
            for (const month of months) {
                const transactionsForMonth = evolution.filter(e => e.date.getFullYear() === year && e.date.getMonth() === month - 1);
                const totalSum = parseFloat(transactionsForMonth.reduce((acc, curr) => (acc + curr.sum), 0).toFixed(2));
    
                const resultItem = {
                    period: `${year}/${month}`,
                    sum: totalSum
                };
                result.push(resultItem);
            }
        }
    }
    
    return result;
}

module.exports = calculateEvolution;