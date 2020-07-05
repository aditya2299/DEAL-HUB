//const prompt = require('prompt-sync')();
//var details = prompt('');
//const amaz = require('./scrapers_amazon.js');
const amaz = require('./scrapers_amazon.js');
const flip = require('./scrapers_flipkart.js');
const sang = require('./scrapers_sangeetha.js');
const paytm = require('./scrapers_paytmMall.js');
const croma = require('./scrapers_croma.js');

async function retrieve(que) {
    var final_data = [];
    var details = que.toLowerCase();
    // RUNNING IN PARALLEL MODE
    let [amazonResult, flipkartResult, sangeethaResult, paytmResult, cromaResult] = await Promise.all([amaz.amazon(details), flip.flipkart(details), sang.sangeetha(details), paytm.paytm(details), croma.croma(details)]);
    final_data = final_data.concat(amazonResult);
    final_data = final_data.concat(flipkartResult);
    final_data = final_data.concat(sangeethaResult);
    final_data = final_data.concat(paytmResult);
    final_data = final_data.concat(cromaResult);
    

    for (var i = 0;i<final_data.length;i++) {
        final_data[i]["id"] = eval(i+1);
        var numeric_price = final_data[i]["price"];
        numeric_price = numeric_price.replace(/\D+/g,'');
        final_data[i]["numeric_price"] = parseInt(numeric_price,10);
        rateBoolList = [];

        for (var j = 1;j<=5;j++) {
            if (j<=final_data[i]["rating"]) {
                rateBoolList.push(true);
            }
            else {
                rateBoolList.push(false);
            }
        }

        final_data[i]["rating_bool"] = rateBoolList;
    }
    //console.log(final_data);
    return final_data;
}

var main = async function(query) {
    var data = await retrieve(query);
    return data;
}
module.exports ={
    main
}