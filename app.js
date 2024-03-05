const fs = require("fs");

var productList = [];

async function fetchDataFromServaidPlusPageWise(pageNo) {
    const request = await fetch(`https://www.servaid.com.pk/products/fetch/medicine?page=${pageNo}&_token=pqsnYF3eMciWy2mUtad74UJPRYXlWNf3d9sgCBwS&sort_type=&q=`);
    const tempData = await request.json();
    const tempProducts = tempData.products.data;
    for (let index = 0; index < tempProducts.length; index++) {
        const product = tempProducts[index];
        productList.push(product);
    }

    fs.writeFileSync('productList.json', (JSON.stringify(productList, null, 2)).trim());
}

fetchDataFromServaidPlusPageWise(1);