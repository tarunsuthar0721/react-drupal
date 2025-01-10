import React, { useEffect, useState } from "react";
import { getProducts } from "../services/Api";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  // const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []); // Update the state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Use another useEffect to log products whenever it updates
  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Products</h2>
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              {/* Image */}
              {product.images?.[0] ? (
                <div
                  className="card-img-container"
                  style={{
                    height: "500px", // Set the fixed height
                    overflow: "hidden", // Prevent content overflow
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={product.images[0]}
                    className="card-img-top"
                    alt={product.title || "Product Image"}
                    style={{
                      height: "100%",
                      width: "auto", // Maintain aspect ratio
                      objectFit: "cover", // Crop image to fit container
                    }}
                  />
                </div>
              ) : (
                <div
                  className="card-img-top bg-light d-flex align-items-center justify-content-center"
                  style={{ height: "250px" }}
                >
                  <span className="text-muted">No Image</span>
                </div>
              )}

              {/* Card Body */}
              <div className="card-body">
                <h5 className="card-title">{product.title || "Untitled Product"}</h5>
                <p className="card-text">
                  <strong>Price:</strong> ₹{product.price || "N/A"}
                </p>
                <p className="card-text">
                  <strong>SKU:</strong> {product.sku || "N/A"}
                </p>
                <p className="card-text">
                  <strong>Category:</strong> {product.categories?.[0] || "N/A"}
                </p>
                <p className="card-text">
                  <strong>Occasion:</strong> {product.occasion?.[0] || "N/A"}
                </p>
              </div>

              {/* Footer */}
              <div className="card-footer text-center">
                <Link to={`/product/${product.title}`} className="btn btn-dark">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default ProductList;
