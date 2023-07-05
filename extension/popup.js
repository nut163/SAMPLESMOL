```javascript
let productList = [];
let selectedProduct = {};

document.getElementById('addProductButton').addEventListener('click', addProduct);
document.getElementById('compareButton').addEventListener('click', compareProducts);

function addProduct() {
    let productId = document.getElementById('productId').value;
    chrome.runtime.sendMessage({type: "ADD_PRODUCT", productId: productId}, function(response) {
        if(response.success) {
            productList.push(response.product);
            displayProductList();
        } else {
            console.error('Failed to add product');
        }
    });
}

function removeProduct(productId) {
    chrome.runtime.sendMessage({type: "REMOVE_PRODUCT", productId: productId}, function(response) {
        if(response.success) {
            productList = productList.filter(product => product.id !== productId);
            displayProductList();
        } else {
            console.error('Failed to remove product');
        }
    });
}

function compareProducts() {
    let selectedProductIds = productList.filter(product => product.selected).map(product => product.id);
    chrome.runtime.sendMessage({type: "COMPARE_PRODUCTS", productIds: selectedProductIds}, function(response) {
        if(response.success) {
            displayComparison(response.comparison);
            highlightBestOption(response.comparison);
        } else {
            console.error('Failed to compare products');
        }
    });
}

function displayProductList() {
    let productListContainer = document.getElementById('productListContainer');
    productListContainer.innerHTML = '';
    productList.forEach(product => {
        let productElement = document.createElement('div');
        productElement.textContent = product.name;
        productListContainer.appendChild(productElement);
    });
}

function displayComparison(comparison) {
    let productComparisonContainer = document.getElementById('productComparisonContainer');
    productComparisonContainer.innerHTML = '';
    comparison.forEach(product => {
        let productElement = document.createElement('div');
        productElement.textContent = product.name + ': ' + product.comparisonScore;
        productComparisonContainer.appendChild(productElement);
    });
}

function highlightBestOption(comparison) {
    let bestOption = comparison.reduce((best, product) => product.comparisonScore > best.comparisonScore ? product : best, comparison[0]);
    let bestOptionElement = document.querySelector(`[data-product-id="${bestOption.id}"]`);
    bestOptionElement.style.fontWeight = 'bold';
}
```