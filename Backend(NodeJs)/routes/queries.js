const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
var uuid = require('uuid-random');
const main_module = require('../main.js');
const sort_module = require('../sorts');
const filter_module = require('../filters');


// SUBMITS A POST
router.post('/', async (req,res) => {

    try{
        async function getdata(title) {
            var result = await main_module.main(title);
            var result_string = JSON.stringify(result);
            return result_string;
        }

        var fetch_data = await getdata(req.body.title);
        //console.log(fetch_data);
        const query_model = {
            id: uuid(),
            title: req.body.title,
            description: fetch_data

        };
        res.json(query_model);
    }
    catch(err){
        res.json({message: err});
    }

});


router.post('/sorts', async (req,res) => {
    var data = JSON.parse(req.body.data);
    var sort_id = req.body.sort_id;
    var new_data = await sort_module.sorted_data(data, sort_id);
    res.json(JSON.stringify(new_data));
});


router.post('/filters', async (req,res) => {
    var data = JSON.parse(req.body.data);
    var filter_id = req.body.filter_id;
    var filter_options = req.body.filter_options;
    var new_data = await filter_module.filtered_data(data, filter_id, filter_options);
    res.json(JSON.stringify(new_data));
});

module.exports = router;