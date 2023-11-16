export const useDate = () => {
    const minYear = 2020;
    const maxYear = new Date().getFullYear();

    const years: number[] = [];
    for (let i = minYear; i <= maxYear; i++) {
        years.push(i);
    };

    const shortMonths = [
        "JAN", "FEB", "MAR",
        "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP",
        "OCT", "NOV", "DEC"
    ];

    const fullMonths = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ]; 

    return {
        minYear,
        maxYear,
        years,
        shortMonths,
        fullMonths
    }
}