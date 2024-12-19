import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

// importing images
import samsungphone from "../images/special product/samsungphone.jpg"
import samsungphone_2 from "../images/special product/samsungphone-2.jpg"
import samsungphone_3 from "../images/special product/samsungphone-3.jpg"


function SpecialProduct(props) {
    const { title, brand, price, totalRatings, imageUrl, quantity, sold, id } = props;
    return (
        <div className='col-4 mb-4 '>
            <div className="special-product-card  ">
                <div className="d-flex justify-content-between row">
                    <div className='special-product-images col-6 '>
                        <div className='special-product-head-image'>
                            <img className='img-fluid ' src={imageUrl ? imageUrl : samsungphone} alt="phone" />
                        </div>
                        <div className='d-flex gap-5  special-product-sub-image'>
                            <img className='img-fluid ' src={samsungphone_2} alt="phone" />
                            <img className='img-fluid ' src={samsungphone_3} alt="phone" />
                        </div>
                    </div>
                    <div className="special-product-content col-6 ">
                        <h5 className="brand">{brand}</h5>
                        <h6 className="title">{title}</h6>
                        <ReactStars
                            count={5}
                            size={24}
                            value={totalRatings}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className="price">
                            <span className="red-p">₹{price}</span>
                            {/* &nbsp; <strike>₹99,999</strike> */}
                        </p>
                        <div className="discount-till d-flex align-items-center gap-10 ">
                            <p className='mb-0'>
                                <b>5 </b>Days
                            </p>
                            <div className="d-flex gap-1 align-items-center ">
                                <span className="badge rounded-circle p-2 bg-danger ">1</span>:
                                <span className="badge rounded-circle p-2 bg-danger ">1</span>:
                                <span className="badge rounded-circle p-2 bg-danger ">1</span>
                            </div>
                        </div>
                        <div className="prod-count my-3 ">
                            <p>Products : {quantity}</p>
                            <div className="progress">
                                <div className="progress-bar"
                                    role="progressbar"
                                    // style={{ width: quantity / quantity + sold * 100 + "%" }}
                                    // aria-valuenow={quantity / quantity + sold * 100}
                                    // aria-valuemin={quantity}
                                    // aria-valuemax={sold + quantity}
                                    style={{ width: `${(sold / (sold + quantity)) * 100}%` }}
                                    aria-valuenow={(sold / (sold + quantity)) * 100}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                </div>
                            </div>
                        </div>
                        <Link to={`/store/product/${id}`} className='button mt-3 '>View Product</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialProduct
