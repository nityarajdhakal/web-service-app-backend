const pool = require("../config/db");

const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Get Products Error:", err.message);
    res.status(500).json({ success: false, message: "Server error fetching products" });
  }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { 
        product_name, 
        in_price, 
        price, 
        article_no, 
        unit, 
        in_stock, 
        description 
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE products 
             SET 
               product_name = $1, 
               in_price = $2, 
               price = $3, 
               article_no = $4, 
               unit = $5, 
               in_stock = $6, 
               description = $7 
             WHERE id = $8 RETURNING *`,
            [product_name, in_price, price, article_no, unit, in_stock, description, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err) { 
        console.error("Update Product Error:", err.message);
        res.status(500).json({ success: false, message: "Server error updating product" });
    }
};

module.exports = { getProducts, updateProduct };

