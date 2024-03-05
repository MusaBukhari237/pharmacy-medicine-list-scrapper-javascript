const fs = require("fs");

var productsList = JSON.parse(fs.readFileSync('productsList.json', 'utf-8'));
var sortedProductsList = [];

async function sort() {
    for (let index = 0; index < productsList.length; index++) {
        const product = productsList[index];
        sortedProductsList.push({
            "ProductItemID": product.ProductItemID,
            "ProductCode": product.ProductCode,
            "DProductCode": product.DProductCode,
            "VariantProductCode": product.VariantProductCode,
            "ItemName": product.ItemName,
            "Product_Price": product.Product_Price,
            "Category": product.Category,
            "SubCategory": product.SubCategory,
            "CustomerSKUCode4": product.CustomerSKUCode4,
            "CustomerSKUCode5": product.CustomerSKUCode5,
            "LineItem": product.LineItem,
            "ProductGroup": product.ProductGroup,
            "CategoryGrp": product.CategoryGrp,
            "Manufacturer": product.Munufacturer,
            "Weight_Grams": product.weight_grams,
            "Product_Pack_Price": product.price,
            "Product_Image": product?.product_info?.product_image[0]?.full_source
        });
    }
    console.log(sortedProductsList.length);
    console.log(productsList.length);
    fs.writeFileSync('sortedData.json', (JSON.stringify(sortedProductsList, null, 2)).trim());
}

sort();