const puppeteer = require('puppeteer');

async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

   
    var container = await page.evaluate(() => {
        try{
            try{
                var titleNodeList = document.querySelectorAll(`.a-color-base.a-text-normal`);
                if (titleNodeList.length) {
                    var hrefNodeList = document.querySelectorAll(`.a-size-base.a-link-normal.s-no-hover.a-text-normal`);
                    var priceNodeList = document.querySelectorAll(`.a-price-whole`);
                    var imgNodeList = document.querySelectorAll(`.s-image-fixed-height .s-image`);
                    var titleLinkArray = [];
                    var id = 0;
                    try{
                        for (var i=0; i< titleNodeList.length; i++){
                            titleLinkArray[i] = {
                                id: 0,
                                website: "amazon",
                                store_type: "online",
                                title: titleNodeList[i].innerHTML.trim(),
                                price: priceNodeList[i].innerHTML.trim(),
                                image: imgNodeList[i].getAttribute("src"),
                                href: "https://www.amazon.in"+hrefNodeList[i].getAttribute("href"),
                                rating: 4,
                            };
                        }
                    }
                    catch{
                        var titleLinkArray = [];
                        var titleArray = [];
                        var priceArray = [];
                        var imageArray = [];
                        var hrefArray = [];
                        for (var i=0; i< titleNodeList.length; i++){
                            if (priceNodeList[i] != null) {
                                priceArray[i] = priceNodeList[i].innerHTML.trim();
                                titleArray[i] = titleNodeList[i].innerHTML.trim();
                                imageArray[i] = imgNodeList[i].getAttribute("src");
                                hrefArray[i] = "https://www.amazon.in"+hrefNodeList[i].getAttribute("href");
                            }
                            else{
                                break;
                            }
                        }
                        for (var i=0; i< 5; i++){
                            titleLinkArray[i] = {
                                id: 0,
                                website: "amazon",
                                store_type: "online",
                                title: titleArray[i],
                                price: priceArray[i],
                                image: imageArray[i],
                                href: hrefArray[i],
                                rating: 4,
                            };
                        }
                    }
                    return titleLinkArray;
                }
                else{
                    var titleNodeList = document.querySelectorAll(`.a-size-medium.a-text-normal`);
                    var hrefNodeList = document.querySelectorAll(`.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 div div div div h2 a`);
                    var priceNodeList = document.querySelectorAll(`.sg-col-20-of-28 .a-price-whole`);
                    var imgNodeList = document.querySelectorAll(`.s-image-fixed-height .s-image`);
                    var titleLinkArray = [];
                    var id = 0;
                    try{
                        for (var i=0; i< titleNodeList.length; i++){
                            titleLinkArray[i] = {
                                id: 0,
                                website: "amazon",
                                store_type: "online",
                                title: titleNodeList[i].innerHTML.trim(),
                                price: priceNodeList[i].innerHTML.trim(),
                                image: imgNodeList[i].getAttribute("src"),
                                href: "https://www.amazon.in"+hrefNodeList[i].getAttribute("href"),
                                rating: 4,
                            };
                        }
                    }
                    catch{
                        var titleLinkArray = [];
                        var titleArray = [];
                        var priceArray = [];
                        var imageArray = [];
                        var hrefArray = [];
                        for (var i=0; i< titleNodeList.length; i++){
                            if (priceNodeList[i] != null) {
                                priceArray[i] = priceNodeList[i].innerHTML.trim();
                                titleArray[i] = titleNodeList[i].innerHTML.trim();
                                imageArray[i] = imgNodeList[i].getAttribute("src");
                                hrefArray[i] = "https://www.amazon.in"+hrefNodeList[i].getAttribute("href");
                            }
                            else{
                                break;
                            }
                        }
                        for (var i=0; i< 5; i++){
                            titleLinkArray[i] = {
                                id: 0,
                                website: "amazon",
                                store_type: "online",
                                title: titleArray[i],
                                price: priceArray[i],
                                image: imageArray[i],
                                href: hrefArray[i],
                                rating: 4,
                            };
                        }
                    }
                    return titleLinkArray;
                }
            }
            catch {
                try {
                    var titleLinkArray = [];
                    var titleNodeList = document.querySelectorAll(`.a-size-base-plus.a-text-normal`);
                    var hrefNodeList = document.querySelectorAll(`h2 .a-link-normal.a-text-normal`);
                    var priceNodeList = document.querySelectorAll(`.a-price-whole`);
                    var imgNodeList = document.querySelectorAll(`.s-image`);
                    for (var i=0; i< 20; i++){
                        titleLinkArray[i] = {
                            id: 0,
                            website: "amazon",
                            store_type: "online",
                            title: titleNodeList[i].innerHTML.trim(),
                            price: priceNodeList[i].innerHTML.trim(),
                            image: imgNodeList[i+1].getAttribute("src"),
                            href: "https://www.amazon.in"+hrefNodeList[i].getAttribute("href"),
                            rating: 4,
                        };
                    }
                }
                catch {
                    var titleLinkArray = [];
                    var titleNodeList = document.querySelectorAll(`.a-color-base.a-text-normal`);
                    var hrefNodeList = document.querySelectorAll(`h2 .a-link-normal.a-text-normal`);
                    var priceNodeList = document.querySelectorAll(`.a-price-whole`);
                    var imgNodeList = document.querySelectorAll(`.s-image`);
                    for (var i=0; i< 20; i++){
                        titleLinkArray[i] = {
                            id: 0,
                            website: "amazon",
                            store_type: "online",
                            title: titleNodeList[i].innerHTML.trim(),
                            price: priceNodeList[i].innerHTML.trim(),
                            image: imgNodeList[i+1].getAttribute("src"),
                            href: "https://www.amazon.in"+hrefNodeList[i].getAttribute("href"),
                            rating: 4,
                        };
                    }
                }
                finally {
                    if (titleLinkArray.length > 0) {
                        return titleLinkArray;
                    }
                    else {
                        var titleLinkArray = [];
                        return titlelinkArray;
                    }
                }
            }
        }
        catch{
            var titleLinkArray = [];
            return titlelinkArray;
        }

    });
    await browser.close();
    return container;
}

var amazon = async function (details) {
    details = details.trim();
    w_space = / /gi;
    details = details.replace(w_space,'+');
    new_url = 'https://www.amazon.in/s?k='+ details +'&ref=nb_sb_noss';
    //console.log(new_url);
    var result = await scrapeProduct(new_url);
    return result;
}
module.exports ={
    amazon
}