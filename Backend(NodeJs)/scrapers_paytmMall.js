const puppeteer = require('puppeteer');


async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'});

    var container = await page.evaluate(() => {
        var titleNodeList = document.querySelectorAll(`.pCOS ._2PhD .UGUy`);
        var priceNodeList = document.querySelectorAll(`.pCOS ._2bo3 ._1kMS span`);
        var promoNodeList = document.querySelectorAll(`.pCOS ._3uwc ._2MEo`);
        var imgNodeList = document.querySelectorAll(`._3WhJ ._3nWP img`);
        var hrefNodeList = document.querySelectorAll(`._3WhJ ._8vVO`);
        var titleLinkArray = [];
        var id = 0;
        if (promoNodeList.length == titleNodeList.length) {
            try{
                for (var i=0; i< titleNodeList.length; i++){
                    titleLinkArray[i] = {
                        id: 0,
                        website: "paytm",
                        store_type: "online",
                        title: titleNodeList[i].innerHTML.trim(),
                        price: priceNodeList[i].innerHTML.trim().slice(26),
                        promo: promoNodeList[i].innerHTML.trim(),
                        image: imgNodeList[i].getAttribute("src"),
                        href: "https://paytmmall.com"+hrefNodeList[i].getAttribute("href"),
                        rating: 3
                    };
                }
            }
            catch {
                titleLinkArray = [];
            }
        }
        else{
            try{
                for (var i=0; i< titleNodeList.length; i++){
                    titleLinkArray[i] = {
                        id: 0,
                        website: "paytm",
                        store_type: "online",
                        title: titleNodeList[i].innerHTML.trim(),
                        price: priceNodeList[i].innerHTML.trim().slice(26),
                        image: imgNodeList[i].getAttribute("src"),
                        href: "https://paytmmall.com"+hrefNodeList[i].getAttribute("href"),
                        rating: 3
                    };
                }
            }
            catch {
                titleLinkArray = [];
            }
        }
        return titleLinkArray;
    });
    await browser.close();
    return container;
}

var paytm = async function (details) {
    details = details.trim();
    w_space = / /gi;
    details = details.replace(w_space,'%20');
    new_url = 'https://paytmmall.com/shop/search?q='+details+'&from=organic&child_site_id=6';
    //console.log(new_url);
    var result = await scrapeProduct(new_url);
    return result;
}

module.exports ={
    paytm
}

