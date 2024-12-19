// importing images
import smartwatch from "../images/smartwatch.jpg"
import smartwatchside01 from "../images/smartwatchside01.jpg"
import smartwatchside02 from "../images/smartwatchside02.jpg"
import smartwatchside03 from "../images/smartwatchside03.jpg"
import smartwatchside04 from "../images/smartwatchside04.jpg"
import { PiHeartStraight } from "react-icons/pi";
import { IoGitCompareOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LiaPuzzlePieceSolid } from "react-icons/lia";

import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TwitterShareButton, XIcon
} from "react-share";


import React, { useEffect } from 'react'
import { useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Color from "../components/Color";
import Container from '../components/Container';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addRating, getAllProducts, getSingleProduct } from "../features/product/productSlice"
import { toast } from "react-toastify"
import { addProductToCart, getUserCart } from "../features/user/userSlice"







function SingleProduct() {

    const [orderedProduct, setOrderedProduct] = useState(true);
    const currentPageUrl = window.location.href;

    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [popularProduct, setPopularProduct] = useState([]);
    const [star, setStar] = useState(null);
    const [comment, setComment] = useState(null);

    const location = useLocation();
    const getPorductId = location.pathname.split("/")[3];
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const singleProductState = useSelector((state) => state?.product?.singleProduct?.data)
    const productsState = useSelector((state) => state?.product?.product?.data)
    const userCartState = useSelector((state) => state?.auth?.cartProducts?.data)

    useEffect(() => {
        dispatch(getSingleProduct(getPorductId))
        dispatch(getUserCart())
        dispatch(getAllProducts())
    }, [])

    useEffect(() => {

        for (let index = 0; index < userCartState?.length; index++) {
            if (getPorductId === userCartState[index]?.productId?._id) {
                setAlreadyAdded(true)
                // break;
            }
        }
    }, [])

    const uploadCart = () => {
        if (color === null) {
            toast.error("Please Select Color")
        } else {
            dispatch(addProductToCart(
                {
                    productId: singleProductState?._id,
                    quantity,
                    color,
                    price: singleProductState?.price
                }
            ))
            navigate("/cart")
        }
    }

    useEffect(() => {
        let data = [];
        for (let index = 0; index < productsState?.length; index++) {
            const element = productsState[index];
            if (element?.tags === "popular") {
                data.push(element)
            }
            setPopularProduct(data)
        }
    }, [productsState])

    const addRatingToProduct = () => {
        if (star == null) {
            toast.error("Please select a star")
            return false;
        } else if (comment == null) {
            toast.error("Please enter a review about the product")
            return false;
        } else {
            dispatch(addRating({ star: star, comment: comment, productId: getPorductId }))
            setTimeout(() => {
                dispatch(getSingleProduct(getPorductId))
            }, 300);
        }
        return false;
    }

    return (
        <>
            <Meta title={`On4All | ${singleProductState?.title}`} />
            <BreadCrumb title={singleProductState?.title} />

            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="main-product-images-wrapper bg-white p-3 d-flex">
                        <div className="col-6">
                            <div className="main-product-image">
                                <div>
                                    <InnerImageZoom
                                        zoomScale={2.3}
                                        zoomType='hover'
                                        zoomPreload={true}
                                        hideHint={true}
                                        fadeDuration={0}
                                        src={singleProductState?.images[0]?.url ? singleProductState?.images[0]?.url : smartwatch}
                                        zoomSrc={singleProductState?.images[0]?.url ? singleProductState?.images[0]?.url : smartwatch}
                                    />
                                </div>
                            </div>
                            <div className="other-product-images d-flex d-wrap gap-15">
                                <div><img className='img-fluid ' src={smartwatchside01} alt="" /></div>
                                <div><img className='img-fluid ' src={smartwatchside02} alt="" /></div>
                                <div><img className='img-fluid ' src={smartwatchside03} alt="" /></div>
                                <div><img className='img-fluid ' src={smartwatchside04} alt="" /></div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="main-product-details ms-4">
                                <div >
                                    <h3 className='title border-bottom'>{singleProductState?.title}</h3>
                                    <div className="border-bottom pb-3 ">
                                        <p className="price">₹ {singleProductState?.price}</p>
                                        <div className="d-flex gap-10 align-items-center ">
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={singleProductState?.totalRatings}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                            <p className='mb-0 review-btn'>( 2 Reviews )</p>
                                        </div>
                                        <a className='review-btn' href="#review">Write a review</a>
                                    </div>
                                    <div className="border-bottom py-3 ">
                                        <div className="d-flex gap-2  align-items-center my-20">
                                            <h3 className='product-heading'>Type : </h3>
                                            <p className='product-data'>Smartwatch</p>
                                        </div>
                                        <div className="d-flex gap-2  align-items-center my-20">
                                            <h3 className='product-heading'>Brand : </h3>
                                            <p className='product-data'>{singleProductState?.brand}</p>
                                        </div>
                                        <div className="d-flex gap-2  align-items-center my-20">
                                            <h3 className='product-heading'>Categories : </h3>
                                            <p className='product-data'>{singleProductState?.productCategory}</p>
                                        </div>
                                        <div className="d-flex gap-2  align-items-center my-20">
                                            <h3 className='product-heading'>Tags : </h3>
                                            <p className='product-data'>{singleProductState?.tags}</p>
                                        </div>
                                        <div className="d-flex gap-2  align-items-center my-20">
                                            <h3 className='product-heading'>Availability : </h3>
                                            <p className='product-data'>Yes ( 240 in Stock )</p>
                                        </div>
                                        <div className="d-flex gap-2  flex-column  my-20">
                                            <h3 className='product-heading mb-2'>Size : </h3>
                                            <div className="d-flex flex-wrap gap-15">
                                                <span className="badge">S</span>
                                                <span className="badge">M</span>
                                                <span className="badge">L</span>
                                                <span className="badge">XL</span>
                                            </div>
                                        </div>
                                        {
                                            alreadyAdded === false &&
                                            <>
                                                <div className="d-flex gap-2  flex-column  my-20">
                                                    <h3 className='product-heading mb-2'>Color : </h3>
                                                    <Color setColor={setColor} colorData={singleProductState?.color} />
                                                </div>
                                            </>
                                        }
                                        <div className="d-flex gap-2 align-items-center my-20">
                                            {
                                                alreadyAdded === false &&
                                                <>
                                                    <h3 className='product-heading'>Quantity : </h3>
                                                    <div className="">
                                                        <input
                                                            className='form-control w-82'
                                                            type="number"
                                                            name="quantity"
                                                            id=""
                                                            min={1}
                                                            max={10}
                                                            onChange={(e) => setQuantity(e.target.value)}
                                                            value={quantity}
                                                        />
                                                    </div>
                                                </>
                                            }
                                            <div className="d-flex gap-15 align-items-center">
                                                <button
                                                    className='button border-0 '
                                                    type="submit"
                                                    onClick={() => { alreadyAdded ? navigate("/cart") : uploadCart() }}
                                                >
                                                    {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                                                </button>
                                                <button className='button border-0 signup '>Buy It Now</button>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-15 align-items-center my-20">
                                            <div className='d-flex align-items-center gap-2'>
                                                <a className='d-flex align-items-center gap-2' href=""><IoGitCompareOutline className='fs-5' />Add to Compare</a>
                                            </div>
                                            <div >
                                                <a className='d-flex align-items-center gap-2' href=""><PiHeartStraight className='fs-5' />Add to Wishlist</a>
                                            </div>
                                        </div>
                                        <div className="myAccordian my-20">
                                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                                <div className="accordion-item ">
                                                    <h2 className="accordion-header" id="flush-headingOne">
                                                        <button className="accordion-button collapsed px-1" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                            <span className='d-flex align-items-center gap-2'><LiaShippingFastSolid className='fs-5' />Shipping & Returns</span>
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">Discover our hassle-free shipping and returns process designed to ensure your satisfaction. We strive to deliver your products promptly and offer a straightforward returns policy for your convenience.</div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item ">
                                                    <h2 className="accordion-header" id="flush-headingTwo">
                                                        <button className="accordion-button collapsed px-1" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                            <span className='d-flex align-items-center gap-2'><LiaPuzzlePieceSolid className='fs-5' />Materials</span>
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">At On4All, we are committed to using high-quality materials to craft products that stand the test of time. Explore the exceptional materials we source to create durable and stylish items.</div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item ">
                                                    <h2 className="accordion-header" id="flush-headingThree">
                                                        <button className="accordion-button collapsed px-1" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                                            <span className='d-flex align-items-center gap-2'><PiHeartStraight className='fs-5' />Care Instructions</span>
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">To maintain the longevity and beauty of your purchase, follow our care instructions. These guidelines provide valuable insights on how to care for your product, ensuring it remains in excellent condition for years to come.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-15 align-items-center my-20">
                                            <h3 className='product-heading'>Share : </h3>
                                            <div>
                                                <FacebookShareButton url={currentPageUrl}>
                                                    <FacebookIcon size={38} round={true} />
                                                </FacebookShareButton>
                                            </div>
                                            <div>
                                                <WhatsappShareButton url={currentPageUrl}>
                                                    <WhatsappIcon size={38} round={true} />
                                                </WhatsappShareButton>
                                            </div>
                                            <div>
                                                <TwitterShareButton url={currentPageUrl}>
                                                    <XIcon size={38} round={true} />
                                                </TwitterShareButton>
                                            </div>
                                            <div>
                                                <EmailShareButton url={currentPageUrl}>
                                                    <EmailIcon size={38} round={true} />
                                                </EmailShareButton>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className="description-content bg-white p-3 ">
                            <p dangerouslySetInnerHTML={{ __html: singleProductState?.description }}></p>
                        </div>
                    </div>

                </div>
            </Container>


            <Container id='review' class1="reviews-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3>Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className='mb-2'>Customer Reviews</h4>
                                    <div className="d-flex gap-10 align-items-center ">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={3}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className='mb-0'>Based on 2 Reviews</p>
                                    </div>
                                </div>
                                {orderedProduct && <div>
                                    <a className='text-decoration-underline ' href="">Write a Review</a>
                                </div>}
                            </div>
                            <div className="review-form py-4 ">
                                <h4>Write a Review</h4>
                                <form action="" className='d-flex flex-column gap-15'>
                                    <div>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={3}
                                            edit={true}
                                            activeColor="#ffd700"
                                            onChange={(e) => { setStar(e) }}
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            className='w-100 form-control '
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="5"
                                            placeholder='Comments'
                                            onChange={(e) => { setComment(e.target.value) }}
                                        ></textarea>
                                    </div>
                                    <div className='d-flex justify-content-end my-2  '>
                                        <button onClick={addRatingToProduct} className="button border-0 " type="button">Submit Review</button>
                                    </div>
                                </form>
                            </div>
                            <div className="reviews mt-4 ">
                                {
                                    singleProductState && singleProductState?.ratings?.map((item, index) => {
                                        return (
                                            <div key={index} className="review">
                                                <div className='d-flex align-items-center gap-10'>
                                                    <h6 className="mb-0">Raj Rattan</h6>
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        value={item?.star}
                                                        edit={true}
                                                        activeColor="#ffd700"
                                                    />
                                                </div>
                                                <p className='mt-3'>{item?.comment}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>


            <Container class1="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Popular Products</h3>
                    </div>
                    <div className='d-flex flex-wrap justify-content-between gap-4'>
                        <ProductCard data={popularProduct} />
                    </div>
                </div>
            </Container>



        </>
    )
}

export default SingleProduct
