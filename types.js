// Section One: Interfaces & Generic Types
// Create a Generic Type for the getProduct function
function getProduct(product) {
    return product;
}
// Use of the previous type
var productExample = {
    id: 1,
    name: "Laptop",
    price: "300",
    quantity: 7
};
var retrievedProduct = getProduct(productExample);
console.log(retrievedProduct);
