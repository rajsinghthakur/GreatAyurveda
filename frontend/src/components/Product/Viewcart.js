import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BsCurrencyRupee } from "react-icons/bs";
import { Link } from "react-router-dom";
export default () => {

    const [cartItemList, setCartItemList] = useState([]);
    let [totalBillAmount, settotalBillAmount] = useState(0);

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    useEffect(() => {
        axios.get(`http://localhost:3005/cart/fetchCartItems/${userId}`)
            .then(response => {
                for (let product of response.data.data) {
                    product.qty = 1;
                    totalBillAmount = totalBillAmount + product["products.price"] * product["products.cartItem.quantity"];
                    cartItemList.push(product);
                }
                setCartItemList([...cartItemList]);
                settotalBillAmount(totalBillAmount);
            }).catch(err => {
                console.log("raj", err);
            })
    }, []);

    const updateQty = (index, productId, quantity) => {
        axios.post("http://localhost:3005/cart/updateQty", { productId, quantity, userId })
            .then(response => {
                let product = cartItemList[index];
                product.qty = quantity;
                totalBillAmount = 0;
                cartItemList.splice(index, 1);
                cartItemList.splice(index, 0, product);
                setCartItemList([...cartItemList]);
                for (let productItem of cartItemList) {
                    totalBillAmount = totalBillAmount + productItem["products.price"] * productItem.qty * 1;
                }
                settotalBillAmount(totalBillAmount);
            }).catch(err => {
                console.log(err);
            })
    }

    const removeFromCart = (price, index, productId) => {
        if (window.confirm("Are you sure ?")) {
            totalBillAmount -= price;
            settotalBillAmount(totalBillAmount)
            let userId = localStorage.getItem("userId");
            axios.delete(`http://localhost:3005/cart/removeCartItem/${userId}/${productId}`)
                .then(response => {
                    toast.info("Product removed Successfully..");
                    cartItemList.splice(index, 1);
                    setCartItemList([...cartItemList]);
                })
                .catch(err => {
                    toast.error("Oops! something went wrong...");
                });
        }
    }


    const CheckOut = (cartItemList, totalBillAmount) => {
        console.log(cartItemList)
        navigate("/Checkout", { state: { totalBillAmount, cartItemList } })
    }

    return <>
        <ToastContainer />
        <div className="d-flex justify-content-around align-items-center my-5">
            {
                cartItemList.length !== 0 ? (
                    <section className="row  m-0 p-0 ">
                        <div className="col-md-9 p-2  d-flex justify-content-center align-content-center flex-column">
                            <table className="table table-responsive justify-content-space-evenly " >
                                <thead>
                                    <tr>
                                        <th className="col-2">Product Image</th>
                                        <th className="col-3 ps-5">Name</th>
                                        <th className="col-2 ps-5">Price</th>
                                        <th className="col-2 ps-3">Qty</th>
                                        <th className="col-3 ps-5">Remove</th>
                                    </tr>
                                </thead>
                            </table>

                            {cartItemList.map((product, index) =>
                                <div className="row container m-0 p-0">
                                    <div className="col-md-2 float-end center-div justify-content-end align-items-end d-flex">
                                        <img className="m-auto p-3" src={product["products.imageUrl"]} width="180px" height="180px" alt="..." />
                                    </div>
                                    <div className="col-md-3 justify-content-center align-items-center d-flex">
                                        <h6 className="mt-2 text-uppercase" style={{ fontSize: "17px" }}>{product["products.title"]} , </h6>
                                    </div>
                                    <div className="col-md-2 flex-column d-flex justify-content-center align-content-center">
                                        <span className="mt-2 fs-4"><BsCurrencyRupee /> {product["products.price"]} </span>&nbsp;
                                    </div>
                                    <div className="mt-1 col-md-2 flex-column d-flex justify-content-center align-content-center">
                                        <h5 className="mt-1">
                                            <input type="number" min={1} onClick={(event) => updateQty(index, product["products.id"], event.target.value)} defaultValue={product["products.cartItem.quantity"]} style={{ width: '50px', height: '30px' }} />
                                        </h5>
                                    </div>
                                    <div className="col-md-2 flex-column d-flex justify-content-center align-content-center">
                                        <button className="m-2 btn btn-outline-danger" onClick={() => removeFromCart((product["products.price"] * product["products.cartItem.quantity"]), index, product["products.id"])} style={{ cursor: "pointer" }}>Remove</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-3 p-0 m-0">
                            <div className="container  d-flex flex-column p-4 shadow p-3 mb-5 rounded" >
                                <h5 className="text-center fw-bold mb-2">Order summary</h5>
                                <label className="fs-5">Item purchased : <span className="text-success">{cartItemList.length}</span></label>
                                <hr />
                                <h4 className="fw-bold">Total Bill : <BsCurrencyRupee />{(totalBillAmount).toFixed(2)}</h4>
                                <button onClick={() => CheckOut(cartItemList, totalBillAmount)} className="btn btn-success mt-3 fw-bold" style={{ background: "var(--green)" }}>Checkout</button>
                            </div>

                        </div>
                    </section>

                ) : (
                    <div className='container-fluid d-flex p-4 justify-content-center align-content-center ' id='blackCart'>
                        <div>
                            <img width={'450px'} height={'300px'} src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="..."/>
                            <h6 className='text-center'>Your cart is empty!</h6>
                            <p className='text-center m-2'>Add item to it now</p>
                            <center> <Link to="/Product"><button className='btn btn-primary' style={{ width: '200px', background: " var(--green)" }}>Shop Now</button> </Link></center>
                        </div>
                    </div>
                )
            }
        </div>
    </>
}