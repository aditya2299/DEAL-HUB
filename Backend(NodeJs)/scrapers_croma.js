const puppeteer = require('puppeteer');


async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'});

    var container = await page.evaluate(() => {
        var titleNodeList = document.querySelectorAll(`h3`);
        var hrefNodeList =  document.querySelectorAll(`.product__list--name`);
        var priceNodeList = document.querySelectorAll(`.pdpPrice`);
        var imgNodeList = document.querySelectorAll(`._primaryImg`);
        var rateNodeList = document.querySelectorAll(`.js-ratingCalc`);
        var titleLinkArray = [];
        var id = 0;
        try{
            for (var i=0; i< titleNodeList.length; i++){
                var pro_price = priceNodeList[i].innerHTML.trim();
                if (imgNodeList[i].getAttribute("data-src") == null) {
                    var img_source = "src";
                }
                else {
                    var img_source = "data-src";
                }
                try{
                    var pro_rating = Math.floor(rateNodeList[i].getAttribute("data-rating").slice(11, 14))
                }
                catch{
                    var pro_rating = 2
                }
                titleLinkArray[i] = {
                    id: 0,
                    website: "croma",
                    store_type: "retail",
                    title: titleNodeList[i].innerHTML.trim(),
                    price: pro_price.slice(1, pro_price.length - 3),
                    image: imgNodeList[i].getAttribute(img_source),
                    href: "https://www.croma.com"+hrefNodeList[i].getAttribute("href"),
                    rating: pro_rating
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


var croma = async function (details) {
    details = details.trim();
    w_space = / /gi;
    details = details.replace(w_space,'+');
    new_url = 'https://www.croma.com/search/?text='+ details;
    //console.log(new_url);
    var result = await scrapeProduct(new_url);
    return result;
}


module.exports ={
    croma
}
