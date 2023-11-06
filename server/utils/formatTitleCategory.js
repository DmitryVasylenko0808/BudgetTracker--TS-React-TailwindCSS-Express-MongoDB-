const formatTitleCategory = title => {
    const [firstLetter, ...rest] = title.trim().split("");
    const formatTitle = firstLetter.toUpperCase() + rest.join("");

    return formatTitle;
};

module.exports = formatTitleCategory;