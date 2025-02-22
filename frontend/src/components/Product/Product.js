import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(process.env.React_APP_SECRET_KEY_Products);
                setProducts(response.data.productList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = async (productId) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error("Please sign in to add items to your cart.");
            return;
        }

        try {
            const response = await axios.post(process.env.React_APP_SECRET_KEY_AddToCart, {
                userId,
                productId,
                quantity: 1
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Already added this product.");
        }
    };

    const ProductView = (product) => {
        navigate("/ProductView", { state: product });
    };

    const buyNow = (product) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            toast.error("Please sign in to purchase items.");
            return;
        }
        navigate("/Buynow", { state: product });
    };

    return (
        <>
            <ToastContainer />
            <div className="mt-3 d-flex align-items-top justify-content-evenly gap-5 flex-wrap overflow-hidden" style={{ background: "var(--white)" }}>
                {products.map((product, index) => (
                    <div key={index} className="mb-4 mt-1 card shadow" id="view_hover" style={{ width: "18rem" }}>
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            style={{ height: "200px", cursor: "pointer" }}
                            onClick={() => ProductView(product)}
                            className="ms-1 remede-img card-img-top p-1"
                        />
                        <i
                            className="youtube-icon bg-danger text-light w-25 view pt-1"
                            onClick={() => ProductView(product)}
                            style={{ cursor: "pointer" }}
                        >
                            View More
                        </i>
                        <div className="card-body m-0 p-1 px-3">
                            <h4 className="card-title fs-6 fw-bold p-0 m-0">{product.title.slice(0, 25)}</h4>
                            <h4 className="card-title fs-6 fw-bold p-0 m-0" style={{ color: "var(--green)" }}>
                                {product.price} Rs
                            </h4>
                            <p className="card-text p-0 m-0 mt-2" style={{ fontSize: "0.7rem" }}>
                                {product.description.slice(0, 100)}
                            </p>
                            <div className="d-flex justify-content-around p-0 my-2">
                                <button
                                    style={{ fontSize: ".8rem" }}
                                    className="btnn addtocart-btn p-0 m-0 py-2 px-0"
                                    onClick={() => addToCart(product.id)}
                                >
                                    Add To Cart
                                </button>
                                <button
                                    style={{ fontSize: ".8rem" }}
                                    className="btnn buynow-btn text-white m-0 p-0 py-2 px-0"
                                    onClick={() => buyNow(product)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Product;
