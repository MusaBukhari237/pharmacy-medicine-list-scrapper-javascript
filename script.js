const fs = require("fs");

var productList = [];
var result = {
    successes: 0,
    failures: 0
}

async function fetchDataFromServaidPlusPageWise(pageNo) {
    try {
        const request = await fetch(`https://www.servaid.com.pk/products/fetch/medicine?page=${pageNo}&_token=pqsnYF3eMciWy2mUtad74UJPRYXlWNf3d9sgCBwS&sort_type=&q=`);
        const tempData = await request.json();
        const tempProducts = tempData.products.data;
        for (let index = 0; index < tempProducts.length; index++) {
            const product = tempProducts[index];
            productList.push(product);
        }
        result = { ...result, successes: result.successes + 1 };
        console.log(`Page #: ${pageNo} - Scrapped Successfully!`);
    } catch (e) {
        result = { ...result, failures: result.failures + 1 };
        console.log(`Page #: ${pageNo} - Scrapping Failded!`);
    }
}

async function script() {
    var startPage = 1;
    var endPage = 300;
    for (let index = startPage; index <= endPage; index++) {
        const pageNo = index;
        await fetchDataFromServaidPlusPageWise(pageNo);
    }
    fs.writeFileSync('productsList.json', (JSON.stringify(productList, null, 2)).trim());
    console.log(`Total: ${endPage} | Successes: ${result.successes} | Failures: ${result.failures}`);
}

script();