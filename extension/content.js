```javascript
let productList = [];
let selectedProduct = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'ADD_PRODUCT') {
        addProduct(request.product);
    } else if (request.message === 'REMOVE_PRODUCT') {
        removeProduct(request.productId);
    } else if (request.message === 'COMPARE_PRODUCTS') {
        compareProducts();
    }
});

function addProduct(product) {
    productList.push(product);
    chrome.storage.sync.set({ productList: productList });
}

function removeProduct(productId) {
    productList = productList.filter(product => product.id !== productId);
    chrome.storage.sync.set({ productList: productList });
}

function compareProducts() {
    chrome.storage.sync.get(['productList'], function(result) {
        productList = result.productList;
        let bestProduct = highlightBestOption(productList);
        chrome.runtime.sendMessage({ message: 'BEST_PRODUCT', bestProduct: bestProduct });
    });
}

function highlightBestOption(productList) {
    let bestProduct = productList[0];
    for (let i = 1; i < productList.length; i++) {
        if (productList[i].price < bestProduct.price) {
            bestProduct = productList[i];
        }
    }
    return bestProduct;
}
```