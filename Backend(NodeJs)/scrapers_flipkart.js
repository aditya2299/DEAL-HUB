const puppeteer = require('puppeteer');

async function scrapeProduct(url,final_type){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'}); 

    
    var container = await page.evaluate((final_type) => {
        var titleNodeList = document.querySelectorAll(final_type[0]);
        if (titleNodeList.length){
            var hrefNodeList = document.querySelectorAll(final_type[1]);
            var priceNodeList = document.querySelectorAll(final_type[2]);
            var imgNodeList = document.querySelectorAll(final_type[3]);
            var rateNodeList = document.querySelectorAll(final_type[8]);
            var titleLinkArray = [];
            var href_list = [];
            var id = 0;
            for (var i=0; i< titleNodeList.length; i++){
                var check_img = imgNodeList[i].getAttribute("src");
                if (check_img.includes('svg')){
                    continue;
                }
                else{
                    rand = i;
                    href_list.push(i);
                }
                var price = priceNodeList[i].innerHTML.trim();
                var numeric_price = price.substring(1);
                titleLinkArray[i] = {
                    id: 0,
                    website: "flipkart",
                    store_type: "online",
                    title: titleNodeList[i].innerHTML.trim(),
                    price: numeric_price,
                    image: imgNodeList[rand].getAttribute("src"),
                    href: "https://www.flipkart.com"+hrefNodeList[i].getAttribute("href"),
                    rating: Math.floor(rateNodeList[i].innerHTML.trim().slice(0,3))
                };
            }
            return titleLinkArray;
        }
        else{
            var titleNodeList = document.querySelectorAll(final_type[4]);
            var hrefNodeList = document.querySelectorAll(final_type[5]);
            var priceNodeList = document.querySelectorAll(final_type[6]);
            var imgNodeList = document.querySelectorAll(final_type[7]);
            var rateNodeList = document.querySelectorAll(final_type[8]);
            var titleLinkArray = [];
            var href_list = [];
            var id = 0;
            for (var i=0; i< titleNodeList.length; i++){
                var check_img = imgNodeList[i].getAttribute("src");
                if (check_img.includes('svg')){
                    continue;
                }
                else{
                    rand = i;
                    href_list.push(i);
                }
                var price = priceNodeList[i].innerHTML.trim();
                var numeric_price = price.substring(1);
                titleLinkArray[i] = {
                    id: 0,
                    website: "flipkart",
                    store_type: "online",
                    title: titleNodeList[i].innerHTML.trim(),
                    price: numeric_price,
                    image: imgNodeList[rand].getAttribute("src"),
                    href: "https://www.flipkart.com"+hrefNodeList[i].getAttribute("href"),
                    rating: Math.floor(rateNodeList[i].innerHTML.trim().slice(0,3))
                };
            }
            return titleLinkArray;
        }
    }, final_type);
    await browser.close();
    return container
}

var flipkart = async function(details) {
    details = details.trim();
    w_space = / /gi;
    details = details.replace(w_space,'+');
    new_url = 'https://www.flipkart.com/search?q='+ details;
    //console.log(new_url);
    var type_1 = ['._3wU53n','._31qSD5','._2rQ-NK','._1OCn9C div ._3BTv9X img','._2cLu-l','.Zhf2z-','._1vC4OE','.Zhf2z- div div ._3BTv9X img','.hGSR34'];
    var result = await scrapeProduct(new_url,type_1);
    return result;
}
module.exports={
    flipkart
}
