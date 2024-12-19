// importing images
import smartwatch from "../images/smartwatch.jpg"
import boat_headphone from "../images/boat-headphone.jpg"
import gr4 from "../images/gr4.svg"
import gr3 from "../images/gr3.svg"
import gr2 from "../images/gr2.svg"
import gr from "../images/gr.svg"

import React, { useEffect } from 'react'
import { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from "../features/product/productSlice"





function OurStore() {

    const [grid, setGrid] = useState(2);
    const dispatch = useDispatch()
    const productState = useSelector((state) => state.product.product.data)
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    // filter states 
    const [newCategories, setNewCategories] = useState(null)
    const [newTags, setNewTags] = useState(null)
    const [newBrands, setNewBrands] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [sort, setSort] = useState(null)

    useEffect(() => {
        let newBrands = []
        let newCategories = []
        let newTags = []

        for (let index = 0; index < productState?.length; index++) {
            const element = productState[index];
            newBrands.push(element.brand)
            newCategories.push(element.productCategory)
            newTags.push(element.tags)
        }
        setBrands(newBrands)
        setCategories(newCategories)
        setTags(newTags)
    }, [productState])



    useEffect(() => {
        getProducts()
    }, [sort, maxPrice, minPrice, newBrands, newTags, newCategories])

    const getProducts = () => {
        dispatch(getAllProducts({ sort, maxPrice, minPrice, newBrands, newTags, newCategories }))
    }


    return (
        <>
            <Meta title={"On4All | Our Store"} />
            <BreadCrumb title="Our Store" />

            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className='filter-card mb-3 '>
                            <h3 className="filter-title">Shop By Categories</h3>
                            <div>
                                <ul className='ps-0 mb-0 '>
                                    {
                                        categories && [...new Set(categories)]?.map((item, index) => {
                                            return (
                                                <li key={index} onClick={() => setNewCategories(item)} >{item}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className='filter-card mb-3 '>
                            <h3 className="filter-title">Filter By</h3>
                            <div>
                                {/* <h5 className='sub-title'>Availability</h5>
                                <div>
                                    <div className="form-check">
                                        <input className='form-check-input ' type="checkbox" value="" id="inStock" />
                                        <label className='form-check-label ' htmlFor="inStock">In stock (1)</label>
                                    </div>
                                    <div className="form-check">
                                        <input className='form-check-input ' type="checkbox" value="" id="outOfStock" />
                                        <label className='form-check-label ' htmlFor="outOfStock">Out of stock (0)</label>
                                    </div>
                                </div> */}
                                <h5 className='sub-title'>Price ( in Rupees ) </h5>
                                <div className='d-flex align-items-center gap-10'>
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder='From'
                                            id="input1"
                                            onChange={(e) => setMinPrice(e.target.value)}
                                        ></input>
                                        <label htmlFor="input1">From</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder='To'
                                            id="input2"
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                        ></input>
                                        <label htmlFor="inpu2t">To</label>
                                    </div>
                                </div>
                                <h3 className="sub-title">Product Tags</h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                        {
                                            tags && [...new Set(tags)]?.map((item, index) => {
                                                return (
                                                    <span
                                                        key={index}
                                                        onClick={() => setNewTags(item)}
                                                        className=" text-capitalize badge bg-light text-secondary  rounded-3 py-2 px-3 "
                                                    >
                                                        {item}
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <h3 className="sub-title">Brands</h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                        {
                                            brands && [...new Set(brands)]?.map((item, index) => {
                                                return (
                                                    <span
                                                        key={index}
                                                        onClick={() => setNewBrands(item)}
                                                        className=" text-capitalize badge bg-light text-secondary  rounded-3 py-2 px-3 "
                                                    >
                                                        {item}
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                {/* <h5 className='sub-title'>Colors</h5>
                                <div>
                                    <div>
                                        <Color />
                                    </div>
                                </div> */}
                                {/* <h5 className='sub-title'>Size</h5>
                                <div>
                                    <div className="form-check">
                                        <input className='form-check-input ' type="checkbox" value="" id="color-1" />
                                        <label className='form-check-label ' htmlFor="color-1">S (2)</label>
                                    </div>
                                    <div className="form-check">
                                        <input className='form-check-input ' type="checkbox" value="" id="color-2" />
                                        <label className='form-check-label ' htmlFor="color-2">M (2)</label>
                                    </div>
                                </div> */}
                            </div>
                        </div>


                    </div>
                    <div className="col-9">
                        <div className="filter-short-grid mb-4 ">
                            <div className="d-flex justify-content-between align-items-center ">
                                <div className="filter-left d-flex align-items-center gap-10">
                                    <p className="mb-0">Sort by :</p>
                                    <select
                                        name=""
                                        onChange={(e) => setSort(e.target.value)}
                                        className='selector form-control form-select '
                                        defaultValue={"all"}
                                        id=""
                                    >
                                        <option value="all" disabled>All</option>
                                        <option value="title">Alphabetically ( A-Z )</option>
                                        <option value="-title">Alphabetically ( Z-A )</option>
                                        <option value="price">Price, low to high</option>
                                        <option value="-price">Price, high to low</option>
                                        <option value="createdAt">Date, old to new</option>
                                        <option value="-createdAt">Date, new to old</option>
                                    </select>
                                </div>
                                <div className="filter-right d-flex align-items-center gap-10">
                                    <p className="total-products mb-0 ">21 Products</p>
                                    <div className="grid d-flex align-items-center gap-10">
                                        <img onClick={() => { setGrid(2) }} className='d-block img-fluid ' src={gr4} alt="grid" />
                                        <img onClick={() => { setGrid(4) }} className='d-block img-fluid ' src={gr3} alt="grid" />
                                        <img onClick={() => { setGrid(6) }} className='d-block img-fluid ' src={gr2} alt="grid" />
                                        <img onClick={() => { setGrid(12) }} className='d-block img-fluid ' src={gr} alt="grid" />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="product-list pb-5 ">
                            <div className="d-flex flex-wrap justify-content-between  gap-15">
                                <ProductCard data={productState ? productState : []} grid={grid} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>



        </>
    )
}

export default OurStore
