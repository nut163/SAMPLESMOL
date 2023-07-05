```javascript
let productList = [];

// Load the stored product list from Chrome Storage
chrome.storage.sync.get(['productList'], function(result) {
  if(result.productList) {
    productList = result.productList;
    displayProductList();
  }
});

// Function to display the product list
function displayProductList() {
  const productListContainer = document.getElementById('productListContainer');
  productListContainer.innerHTML = '';
  productList.forEach((product, index) => {
    const productElement = document.createElement('div');
    productElement.textContent = product.name;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeProduct(index));
    productElement.appendChild(removeButton);
    productListContainer.appendChild(productElement);
  });
}

// Function to remove a product from the list
function removeProduct(index) {
  productList.splice(index, 1);
  chrome.storage.sync.set({productList: productList}, function() {
    displayProductList();
  });
}

// Event listener for the add product button
document.getElementById('addProductButton').addEventListener('click', function() {
  const productId = document.getElementById('productId').value;
  fetchProductDetails(productId).then(product => {
    productList.push(product);
    chrome.storage.sync.set({productList: productList}, function() {
      displayProductList();
    });
  });
});

// Function to fetch product details from Amazon Product API
function fetchProductDetails(productId) {
  return new Promise((resolve, reject) => {
    // Replace with actual API call
    const product = {
      id: productId,
      name: 'Product ' + productId,
      price: Math.random() * 100,
      specifications: 'Specifications for product ' + productId
    };
    resolve(product);
  });
}
```