const calculateReports = (categories, transactions) => {
    const result = [];
    for (const category of categories) {
        let reportByCategory, reportByOneMonth, reportsByMonths = [];
        for (let month = 1; month <= 12; month++) {
            reportByOneMonth = transactions
                .filter(t => t.category.toString() === category._id.toString() && t.date.getMonth() === month - 1)
                .reduce((acc, curr) => acc += curr.sum, 0)
                .toFixed(2);


            reportByOneMonth = {
                month,
                sum: reportByOneMonth 
            }
            reportsByMonths.push(reportByOneMonth);
        }
        reportByCategory = {
            category: category.title, 
            report: reportsByMonths 
        };
        result.push(reportByCategory);
    }

    return result;
}

module.exports = calculateReports;