const fs = require('fs');
const path = require('path');

// Data
let products = require('../data/products-data');

// validation
validateProduct = (productData, isUpdate = false) => {
    if (!isUpdate && (!productData.name || !productData.price || !productData.quantity)) {
        return { valid: false, message: "You must input all fields" };
    }
    if (productData.price && (isNaN(productData.price) || parseInt(productData.price) <= 0)) {
        return { valid: false, message: "The price must be a valid number greater than 0" };
    }
    if (productData.quantity && productData.quantity < 0) {
        return { valid: false, message: "The quantity cannot be negative" };
    }
    return { valid: true };
};

class productsController {

        // GET All Products
        getAllProducts = (req, res) => {
            try {
                res.status(200).json({ message: "done", products });
            } catch (error) {
                res.status(500).json({ message: error.message });   
            }
        };

        // GET One Product
        getProductById = (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const product = products.find(p => p.id === id);
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                return res.status(200).json({ message: "done", product });
            } catch (error) {
                res.status(500).json({ message: error.message });   
            }
          
        };

        // Add a new product
        createProduct = (req, res) => {
            try {
                const { name, price, quantity } = req.body;
            
                const validation = validateProduct(req.body);
                if (!validation.valid) {
                    return res.status(400).json({ message: validation.message });
                }

                const ids = products.map(e => e.id);
                const id = Math.max(...ids) + 1;

                const newProduct = { 
                    id, 
                    name, 
                    price, 
                    quantity 
                };
                products.push(newProduct);
                return res.status(201).json({ message: "Added Product Successfully", newProduct });
            } catch (error) {
                res.status(500).json({ message: error.message });   
            }
            
        };

        // Edit Product
        updateProduct = (req, res) => {
            try {
                const { name, price, quantity } = req.body;
                const id = parseInt(req.params.id);
                const product = products.find(p => p.id === id);
    
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
    
                const validation = validateProduct(req.body, true);
                if (!validation.valid) {
                    return res.status(400).json({ message: validation.message });
                }
    
                product.name = name || product.name;
                product.price = price || product.price;
                product.quantity = quantity || product.quantity;
                return res.status(200).json({ message: "Updated Successfully", product });
            } catch (error) {
                res.status(500).json({ message: error.message });   
            }
        };

        // Delete Product
        deleteProduct = (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const product = products.find(p => p.id === id);
    
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
    
                products = products.filter(p => p.id !== id);
                return res.status(200).json({ message: "Deleted Successfully" });
            } catch (error) {
                res.status(500).json({ message: error.message });   
            }
     
        };

        // Export products to a JSON file
        exportToJson = (req, res) => {
            try {
                const date = new Date();
                const fileName = `products_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`;
                const filePath = path.join(__dirname, '..', 'exports', fileName);
    
                fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
                    if (err) {
                        return res.status(500).json({ message: "File creation error" });
                    }
                    
                    fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
                        if (err) {
                            return res.status(500).json({ message: "File creation error" });
                        }
                        res.download(filePath, fileName, (err) => {
                            if (err) {
                                console.error("File download error", err);
                            }
                        });
                    });
                });
            } catch (error) {
                res.status(500).json({ message: error.message });   
            }
        };
}

module.exports = new productsController();