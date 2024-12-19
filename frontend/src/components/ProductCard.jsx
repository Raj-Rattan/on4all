import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



// importing images

import wish from "../images/wish.svg"
import boat_headphone from "../images/boat-headphone.jpg"
import prodcompare from "../images/prodcompare.svg"
import view from "../images/view.svg"
import add_cart from "../images/add-cart.svg"
import { addToWishlist } from '../features/product/productSlice';



function ProductCard(props) {
    const { grid, data } = props;
    let location = useLocation();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addToWish = (id) => {
        dispatch(addToWishlist(id))
    }

    return (
        <>
            {
                data?.map((item, index) => {
                    return (
                        <div key={index} className={`${location.pathname === "/store" ? `gr-${grid}` : "col-2"}`}>
                            <div
                                // to={`${location.pathname === "/" ? "store/product/:id" : location.pathname === "store" ? "" : "product/:id"}`} 
                                className="product-card position-relative ">
                                <div className="wishlist-icon position-absolute ">
                                    <button className='border-0 bg-transparent '
                                        onClick={(e) => { addToWish(item?._id) }}
                                    >
                                        <img src={wish} alt="wish image" />
                                    </button>
                                </div>
                                <div className="product-image ">
                                    <img className='img-fluid d-block mx-auto   ' src={item?.images[0].url} alt="product image" />
                                </div>
                                <div className="product-details">
                                    <h6 className="brand">{item?.brand}</h6>
                                    <h5 className="product-title">
                                        {item?.title}
                                    </h5>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={item?.totalRatings}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                                        dangerouslySetInnerHTML={{ __html: item?.description }}
                                    >
                                    </p>
                                    <p className="price">₹{item?.price}</p>
                                </div>
                                <div className="action-bar position-absolute ">
                                    <div className="d-flex flex-column gap-15">
                                        <button className='border-0 bg-transparent '>
                                            <img src={prodcompare} alt="prodcompare" />
                                        </button>
                                        <button className='border-0 bg-transparent '>
                                            <img onClick={() => navigate(`/store/product/${item?._id}`)} src={view} alt="view" />
                                        </button>
                                        <button className='border-0 bg-transparent '>
                                            <img src={add_cart} alt="add cart" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ProductCard
