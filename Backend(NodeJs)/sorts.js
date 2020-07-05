
var sorted_data = async function(data, sort_id) {

    function comparePrices(key, order = 'asc') {
        return function innerSort(a,b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
            {
                return 0;
            }
            const varA = a[key];
            const varB = b[key];

            let comparison = 0;

            if (varA > varB) {
                comparison = 1;
            } 
            else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        }
    }


    if (sort_id == 0) {
        data.sort(comparePrices('numeric_price', order = 'asc'));
        //console.log(data);
    }
    else if (sort_id == 1) {
        data.sort(comparePrices('numeric_price', order = 'desc'));
        //console.log(data);
    }
    else {
        data.sort(comparePrices('rating', order = 'desc'));
        // SORT BY Rating
    }

    return data;
}

module.exports = {
    sorted_data
}