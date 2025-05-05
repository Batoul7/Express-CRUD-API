// Section One: Interfaces & Generic Types

// Product Interface
interface Product {
    readonly id: number;
    name: string;
    price: string;
    quantity: number;
}

// Create a Generic Type for the getProduct function
function getProduct<T>(product: T): T {
    return product;
}

// Use of the previous type
const productExample: Product = {
    id: 1,
    name: "Laptop",
    price: "300",
    quantity: 7
};

const retrievedProduct = getProduct<Product>(productExample);
console.log(retrievedProduct);