const puppeteer = require('puppeteer');


async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'});

    var container = await page.evaluate(() => {
        var title_hrefNodeList = document.querySelectorAll(`.mtb-title a`);
        var priceNodeList = document.querySelectorAll(`.product-price span`);
        var imgNodeList = document.querySelectorAll(`#grid img`);
        var titleLinkArray = [];
        var id = 0;
        try{
            for (var i=0; i< title_hrefNodeList.length; i++){
                titleLinkArray[i] = {
                    id: 0,
                    website: "sangeetha_mobiles",
                    store_type: "retail",
                    title: title_hrefNodeList[i].innerHTML.trim(),
                    price: priceNodeList[i].innerHTML.trim().slice(25),
                    image: imgNodeList[i].getAttribute("src"),
                    href: title_hrefNodeList[i].getAttribute("href"),
                    rating: 3
                };
            }
        }
        catch {
            titleLinkArray = [];
        }
        return titleLinkArray;
    });
    await browser.close();
    return container;
}

var sangeetha = async function (details) {
    details = details.trim();
    w_space = / /gi;
    details = details.replace(w_space,'%20');
    new_url = 'https://www.sangeethamobiles.com/search-page/'+ details;
    //console.log(new_url);
    var result = await scrapeProduct(new_url);
    return result;
}

module.exports ={
    sangeetha
}
