// importing images
import smartwatch from "../images/smartwatch.jpg"

import React, { useEffect } from 'react'
import { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, getUserCart, updateCartProduct } from "../features/user/userSlice";









function Cart() {

    const dispatch = useDispatch();
    const userCartState = useSelector((state) => state?.auth?.cartProducts?.data)
    const [productUpdateDetail, setProductUpdateDetail] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [totalAmount, setTotalAmount] = useState(null);

    useEffect(() => {
        dispatch(getUserCart())
    }, [])

    useEffect(() => {
        if (productUpdateDetail !== null) {
            dispatch(updateCartProduct(
                {
                    cartItemId: productUpdateDetail?.cartItemId,
                    quantity: productUpdateDetail?.quantity
                }
            ))
            setTimeout(() => {
                dispatch(getUserCart())
            }, 300);
        }
    }, [productUpdateDetail])

    const handleQuantityChange = (id, value) => {
        const newQuantities = { ...quantities, [id]: value };
        setQuantities(newQuantities);
        setProductUpdateDetail({ cartItemId: id, quantity: value });
    };

    const deleteACartProduct = (id) => {
        dispatch(deleteCartProduct(id))
        setTimeout(() => {
            dispatch(getUserCart())
        }, 300);
    }

    useEffect(() => {
        if (userCartState) {
            let sum = 0;
            for (let index = 0; index < userCartState?.length; index++) {
                sum = sum + (Number(userCartState[index].quantity) * userCartState[index].price)
            }
            setTotalAmount(sum)
        }
    }, [userCartState])

    return (
        <>
            <Meta title={"On4All | Cart"} />
            <BreadCrumb title="Cart" />

            <Container class1="cart-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3  d-flex justify-content-between align-items-center ">
                            <h4 className='cart-col-1'>Product</h4>
                            <h4 className='cart-col-2'>Price</h4>
                            <h4 className='cart-col-3'>Quantity</h4>
                            <h4 className='cart-col-4'>Total</h4>
                        </div>
                        {
                            userCartState && userCartState?.map((item, index) => {
                                return (
                                    <div key={index} className="cart-data py-3 mb-2   d-flex justify-content-between align-items-center ">
                                        <div className='cart-col-1 d-flex align-items-center gap-30'>
                                            <div className='w-25'>
                                                <img className='img-fluid ' src={smartwatch} alt="smartwatch" />
                                            </div>
                                            <div className='w-75'>
                                                <p>{item?.productId?.title}</p>
                                                {/* <p>Size : M</p> */}
                                                <div>
                                                    Color :
                                                    <ul className='colors ps-0 mb-0'>
                                                        <li style={{ backgroundColor: item?.color?.color }}></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='cart-col-2'>
                                            <h5 className="price">₹ {item?.price}</h5>
                                        </div>
                                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                                            <div className=' w-28'>
                                                <input
                                                    className='form-control'
                                                    min={1}
                                                    max={10}
                                                    type="number"
                                                    name=""
                                                    id=""
                                                    // value={productUpdateDetail?.quantity ? productUpdateDetail?.quantity : item?.quantity}
                                                    // onChange={(e) => { setProductUpdateDetail({ cartItemId: item?._id, quantity: e.target.value }) }}
                                                    value={quantities[item?._id] || item?.quantity}
                                                    onChange={(e) => handleQuantityChange(item?._id, e.target.value)}

                                                />
                                            </div>
                                            <div className='cart-del-btn'>
                                                <RiDeleteBin5Line
                                                    className="text-danger"
                                                    onClick={() => { deleteACartProduct(item?._id) }}
                                                />
                                            </div>
                                        </div>
                                        <div className='cart-col-4'>
                                            <h5 className="price">₹ {item?.price * item?.quantity}</h5>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="col-12 py-2 mt-3  ">
                        <div className="d-flex justify-content-between align-items-baseline  ">
                            <Link to={"/store"} className='button'>Continue Shopping</Link>
                        </div>
                        {
                            (totalAmount !== null && totalAmount !== 0) &&
                            <div className="d-flex flex-column align-items-end  ">
                                <h4>SubTotal : ₹ {totalAmount ? totalAmount : 0}</h4>
                                <p>Taxes and shipping calculated at checkout</p>
                                <Link to={"/checkout"} className='button'>Checkout</Link>
                            </div>
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart
