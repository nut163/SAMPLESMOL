```javascript
let productList = [];

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
  chrome.storage.sync.set({ productList: productList }, () => {
    console.log('Product added to the list');
  });
}

function removeProduct(productId) {
  productList = productList.filter(product => product.id !== productId);
  chrome.storage.sync.set({ productList: productList }, () => {
    console.log('Product removed from the list');
  });
}

function compareProducts() {
  chrome.tabs.create({ url: 'options.html' });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ productList: [] });
});
```