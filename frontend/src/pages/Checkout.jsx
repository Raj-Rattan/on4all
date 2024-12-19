// importing images
import smartwatch from "../images/smartwatch.jpg"

import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackOutline } from "react-icons/io5";
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { config } from "../utils/axiosConfig"
import { createCurrentOrder, emptyUserCart, resetState } from "../features/user/userSlice";


const shippingSchema = yup.object({
    firstName: yup.string().defined().required('First name is required'),
    lastName: yup.string().default('').nullable(),
    address: yup.string().defined().required('Address Details are required'),
    city: yup.string().defined().required('City is required'),
    state: yup.string().defined().required('State is required'),
    country: yup.string().defined().required('Country is required'),
    pincode: yup.number().defined().required('Pincode is required'),
});


function Checkout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userCartState = useSelector((state) => state.auth?.cartProducts?.data)
    const [totalAmount, setTotalAmount] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [cartProductState, setCartProductState] = useState([]);


    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < userCartState?.length; index++) {
            sum = sum + (Number(userCartState[index].quantity) * userCartState[index].price)
        }
        setTotalAmount(sum)
    }, [userCartState])

    useEffect(() => {
        if (shippingInfo) {
            checkoutHandeler();
        }
    }, [shippingInfo]);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
        },
        validationSchema: shippingSchema,
        onSubmit: (values) => {
            setShippingInfo(values)
        },
    });


    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    useEffect(() => {
        let items = []
        for (let index = 0; index < userCartState?.length; index++) {
            items.push(
                {
                    product: userCartState[index].productId._id,
                    quantity: userCartState[index].quantity,
                    color: userCartState[index].productId.color[0]._id,
                    price: userCartState[index].price,

                }
            )
            setCartProductState(items)
        }
    }, [])

    const checkoutHandeler = async () => {

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?")
            return
        }

        const result = await axios.post("http://localhost:5000/api/v1/user/order/checkout", { amount: totalAmount + 40 }, config)

        if (!result) {
            alert("Server error. Are you online?")
            return
        }

        const { amount, id: order_id, currency } = result.data.data.order
        const options = {
            key: "rzp_test_juizRynjJdW7yE", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "ON4All",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                };

                const result = await axios.post("http://localhost:5000/api/v1/user/order/paymentVerification", data, config);

                setTimeout(() => {
                    dispatch(createCurrentOrder(
                        {
                            totalPrice: totalAmount,
                            totalPriceAfterDiscount: totalAmount,
                            orderItems: cartProductState,
                            paymentInfo: result?.data?.data,
                            shippingInfo,
                        }
                    ))
                    dispatch(emptyUserCart())
                    // dispatch(resetState())
                }, 300);

                // Navigate to my-orders page after successful order creation
                navigate("/my-orders");

            },
            prefill: {
                name: "ON4All",
                email: "on4all@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "On4All Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    return (
        <>

            <Container class1="checkout-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3 className="website-name">On4All</h3>
                            <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={"/cart"} className='text-dark total-price '>Cart</Link>
                                    </li>
                                    &nbsp; {">"}
                                    <li className="breadcrumb-item total-price active" aria-current="page">Information</li>
                                    &nbsp; {">"}
                                    <li className="breadcrumb-item total-price active" aria-current="page">Shipping</li>
                                    &nbsp; {">"}
                                    <li className="breadcrumb-item total-price active" aria-current="page">Payment</li>
                                </ol>
                            </nav>
                            <h4 className="title total">Contact Information</h4>
                            <p className="user-details total">Raj Rattan (singhaniaraj238@gmail.com)</p>
                            <h4 className='mb-3'>Shipping Address</h4>
                            <form
                                className='d-flex flex-wrap justify-content-between gap-15'
                                action=""
                                onSubmit={formik.handleSubmit}
                            >
                                <div className='w-100'>
                                    <select
                                        className='form-control form-select '
                                        name="country"
                                        id="country"
                                        onChange={formik.handleChange("country")}
                                        onBlur={formik.handleBlur("country")}
                                        value={formik.values.country}
                                    >
                                        <option value="" defaultValue disabled>Select Country</option>
                                        <option value="india">India</option>
                                        <option value="nepal">Nepal</option>
                                        <option value="bangladesh">Bangladesh</option>
                                    </select>
                                    <div className="error">
                                        {formik.touched.country && formik.errors.country}
                                    </div>
                                </div>
                                <div className='flex-grow-1 '>
                                    <input
                                        placeholder='First Name'
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange('firstName')}
                                        onBlur={formik.handleBlur('firstName')}
                                    />
                                    <div className="error">
                                        {formik.touched.firstName && formik.errors.firstName}
                                    </div>
                                </div>
                                <div className='flex-grow-1 '>
                                    <input
                                        placeholder='Last Name'
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className='w-100'>
                                    <input
                                        placeholder='Address'
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange('address')}
                                        onBlur={formik.handleBlur('address')}
                                    />
                                    <div className="error">
                                        {formik.touched.address && formik.errors.address}
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <input
                                        placeholder='Appartment, Suite, etc'
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className='flex-grow-1 '>
                                    <input
                                        placeholder='City'
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={formik.values.city}
                                        onChange={formik.handleChange('city')}
                                        onBlur={formik.handleBlur('city')}
                                    />
                                    <div className="error">
                                        {formik.touched.city && formik.errors.city}
                                    </div>
                                </div>
                                <div className='flex-grow-1 '>
                                    <select
                                        className='form-control form-select '
                                        name="state"
                                        id="state"
                                        value={formik.values.state}
                                        onChange={formik.handleChange('state')}
                                        onBlur={formik.handleBlur('state')}
                                    >
                                        <option value="" defaultValue disabled>Select State</option>
                                        <option value="delhi">Delhi</option>
                                        <option value="up">U.P</option>
                                        <option value="mumbai">Mumbai</option>
                                        <option value="bengaluru">Bengaluru</option>
                                        <option value="kolkata">Kolkata</option>
                                    </select>
                                    <div className="error">
                                        {formik.touched.state && formik.errors.state}
                                    </div>
                                </div>
                                <div className='flex-grow-1 '>
                                    <input
                                        placeholder='Pin Code'
                                        type="text"
                                        className="form-control"
                                        name="pincode"
                                        id="pincode"
                                        value={formik.values.pincode}
                                        onChange={formik.handleChange('pincode')}
                                        onBlur={formik.handleBlur('pincode')}
                                    />
                                    <div className="error">
                                        {formik.touched.pincode && formik.errors.pincode}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <Link to={"/cart"} className='text-dark' >< IoArrowBackOutline className='me-2' />Return to Cart</Link>
                                        <Link to={"/cart"} className='button' >Continue to Shipping</Link>
                                        <button className="button border-0" type="submit">Place Order</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className='border-bottom py-4'>
                            {
                                userCartState && userCartState?.map((item, index) => {
                                    return (
                                        <div key={index} className="d-flex align-items-center justify-content-between  gap-10 mb-2">
                                            <div className='w-75 d-flex gap-15'>
                                                <div className='w-25 position-relative '>
                                                    <span style={{ top: "-13px", right: "-7px" }} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.quantity}</span>
                                                    <img className='img-fluid ' src={item?.productId?.images[0]?.url ? item?.productId?.images[0]?.url : smartwatch} alt="productImage" />
                                                </div>
                                                <div>
                                                    <h5 className="total">{item?.productId?.title}</h5>
                                                    <p className='total-price'>M / {item?.productId?.color[0]?.color}</p>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <h5 className='total'>₹ {item?.price * item?.quantity}</h5>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className='border-bottom py-4'>
                            <div className='d-flex justify-content-between align-items-center '>
                                <p className='total'>Subtotal</p>
                                <p className='total-price'>₹ {totalAmount ? totalAmount : 0}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center '>
                                <p className='mb-0 total'>Shipping</p>
                                <p className='mb-0 total-price'>₹ 40</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center border-bottom py-4   '>
                            <h4 className='total'>Total</h4>
                            <h5 className='total-price'>₹ {totalAmount ? totalAmount + 40 : 0}</h5>
                        </div>
                    </div>
                </div>
            </Container>

        </>
    )
}

export default Checkout
