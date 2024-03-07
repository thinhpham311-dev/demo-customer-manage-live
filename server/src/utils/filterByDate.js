const filterByDate = (array, startDate, endDate) => {
    console.log(array, startDate, endDate)
    if (array && array.length > 0) {
        const resultProductData = array?.filter((a) => {
            const hitDates = a.ProductHits || {};
            // extract all date strings
            hitDates = Object.keys(hitDates);
            // convert strings to Date objcts
            hitDates = hitDates.map((date) => { return new Date(date); });
            // filter this dates by startDate and endDate
            const hitDateMatches = hitDates.filter(function (date) { return date >= startDate && date <= endDate });
            // if there is more than 0 results keep it. if 0 then filter it away
            return hitDateMatches.length > 0;
        });
        return resultProductData
    }
}

module.exports = filterByDate
