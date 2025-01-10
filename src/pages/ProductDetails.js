import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByTitle } from "../services/Api";
import "../assets/styles/ProductDetail.css";

const ProductDetail = () => {
    const { title } = useParams(); // Get title from the URL
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(""); // Track the main image

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductByTitle(title);
                setProduct(data);
                setMainImage(data.images?.[0] || ""); // Set the first image as the default main image
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [title]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <div className="container">
                {/* Product Title */}
                <h1 className="text-center mb-4">{product.title}</h1>

                <div className="row">
                    {/* Product Images */}
                    <div className="col-md-6">
                        <div className="mb-4 d-flex flex-wrap justify-content-center">
                            {/* Main Image */}
                            {mainImage ? (
                                <img
                                    src={mainImage}
                                    alt={product.title}
                                    className="img-fluid img-main rounded shadow"
                                />
                            ) : (
                                <div className="bg-light p-5 text-center">
                                    <span>No Image Available</span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Slider */}
                        <div className="d-flex flex-wrap justify-content-center">
                            {product.images?.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="img-thumbnail mx-1"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        objectFit: "cover",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setMainImage(image)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="col-md-6">
                        <h4>Product Details</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <strong>Price:</strong> ₹{product.price || "N/A"}
                            </li>
                            <li className="list-group-item">
                                <strong>SKU:</strong> {product.sku || "N/A"}
                            </li>
                            <li className="list-group-item">
                                <strong>Categories:</strong>{" "}
                                {product.categories?.join(", ") || "N/A"}
                            </li>
                            <li className="list-group-item">
                                <strong>Colors:</strong> {product.colors?.join(", ") || "N/A"}
                            </li>
                            <li className="list-group-item">
                                <strong>Sizes:</strong> {product.sizes?.join(", ") || "N/A"}
                            </li>
                            <li className="list-group-item">
                                <strong>Fabric Type:</strong>{" "}
                                {product.fabric_type?.join(", ") || "N/A"}
                            </li>
                            <li className="list-group-item">
                                <strong>Occasion:</strong> {product.occasion?.join(", ") || "N/A"}
                            </li>
                        </ul>
                        <div className="mt-4">
                            <h5>Description</h5>
                            <p>{product.description || "No description available."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
