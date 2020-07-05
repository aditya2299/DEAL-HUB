var filtered_data = async function(data, filter_id, filter_options) {
    
    function price_filter(data, filter_options) {
        var label = filter_options.label;
        var val = filter_options.val;
        var newDataList = [];

        switch (label) {
            //MIN
            case 0:
                for(var i=0;i<data.length;i++) {
                    if (data[i]['numeric_price'] > val) {
                        newDataList.push(data[i]);
                    }
                }
                return newDataList;
                
            //MAX
            case 1:
                for(var i=0;i<data.length;i++) {
                    if (data[i]['numeric_price'] < val) {
                        newDataList.push(data[i]);
                    }
                }
                return newDataList;

            default:
                break;
        }
    }

    function rate_filter(data, filter_options) {
        var min_rate = filter_options.val;
        var newDataList = [];
        for(var i=0;i<data.length;i++) {
            if (data[i]['rating'] >= min_rate) {
                newDataList.push(data[i]);
            }
        }
        return newDataList;
    }

    switch (filter_id) {
        case 1:
            var newFilterData = price_filter(data, filter_options);
            return newFilterData;

        case 2:
            var newFilterData = rate_filter(data, filter_options);
            return newFilterData;

        default:
            break
    }
}

module.exports = {
    filtered_data
}