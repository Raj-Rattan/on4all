import React, { useEffect } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/user/userSlice';


const Orders = () => {

    const dispatch = useDispatch();
    const orderState = useSelector((state) => state.auth?.getOrderedProducts?.data)

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    return (
        <>
            <Meta title={"On4All | My Orders"} />
            <BreadCrumb title="My Orders" />

            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12 mb-3 ">
                        <div className="row">
                            <div className="col-3">
                                <h5>Order Id</h5>
                            </div>
                            <div className="col-3">
                                <h5>Total Amount</h5>
                            </div>
                            <div className="col-3">
                                <h5>Total Amount After Discount</h5>
                            </div>
                            <div className="col-3">
                                <h5>Status</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        {
                            orderState && orderState?.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} style={{ backgroundColor: "#febd69", borderRadius: ".25rem .25rem 0 0" }} className="row pt-3">
                                            <div className="col-3">
                                                <p>{item?._id}</p>
                                            </div>
                                            <div className="col-3">
                                                <p>{item?.totalPrice}</p>
                                            </div>
                                            <div className="col-3">
                                                <p>{item?.totalPriceAfterDiscount}</p>
                                            </div>
                                            <div className="col-3">
                                                <p>{item?.orderStatus}</p>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row py-3 mb-4" style={{ backgroundColor: "#232f3e", borderRadius: " 0 0 .25rem .25rem" }}>
                                                <div className="col-3">
                                                    <h6 className="text-white ">Product Name</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6 className="text-white ">Quantity</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6 className="text-white ">Price</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6 className="text-white ">Color</h6>
                                                </div>
                                                {
                                                    item?.orderItems?.map((i, index) => {
                                                        return (
                                                            <div key={index} className="col-12">
                                                                <div className="row my-1 ">
                                                                    <div className="col-3">
                                                                        <p className="text-white ">{i?.product?.title}</p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <p className="text-white ">{i?.quantity}</p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <p className="text-white ">{i?.price}</p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <ul className='colors ps-0 mb-0'>
                                                                            <li style={{ backgroundColor: i?.color }}></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </>

                                )
                            })
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Orders
