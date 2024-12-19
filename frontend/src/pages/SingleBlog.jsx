// importing images
import blog_1 from "../images/blog-1.jpg"

import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBlog } from "../features/blog/blogSlice";
import { useLocation } from "react-router-dom"
import moment from "moment";







const SingleBlog = () => {

    const dispatch = useDispatch()
    const location = useLocation();

    const getBlogId = location.pathname.split("/")[2];


    const blogState = useSelector((state) => state?.blog?.singleBlog?.data)

    useEffect(() => {
        getBlog()
    }, [])

    const getBlog = () => {
        dispatch(getCurrentBlog(getBlogId))
    }


    return (
        <>
            <Meta title={`On4All | ${blogState?.title}`} />
            <BreadCrumb title={blogState?.title} />

            <Container class1="blog-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-3">
                        <div className='filter-card mb-3 '>
                            <h3 className="filter-title">Find By Categories</h3>
                            <div>
                                <ul className='ps-0 mb-0 '>
                                    <li>Watch</li>
                                    <li>Tv</li>
                                    <li>Camera</li>
                                    <li>Laptop</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row blog-page-card">
                            <div className="col-12">
                                <div className="single-blog-card">
                                    <h4 className='title mb-4'>{blogState?.title}</h4>
                                    <div className="blog-card">
                                        <div className="card-image">
                                            <img className='img-fluid w-100' src={blogState?.images[0]?.url ? blogState?.images[0]?.url : blog_1} alt="blog image" />
                                        </div>
                                        <div className="blog-content mt-3 pb-0 mb-0 ">
                                            <p className="desc" dangerouslySetInnerHTML={{ __html: blogState?.description }}></p>
                                            <p className='date mb-0 '>{moment(blogState?.createdAt).format('MMMM Do YYYY')}</p>
                                        </div>
                                        <div className="back d-flex align-items-center ">
                                            <Link to={"/blogs"} className='fs-4 ' >< IoArrowBackOutline className='mt-0' /></Link>
                                            <Link to={"/blogs"} className='ms-2'>Go to blogs</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Container>


        </>
    )
}

export default SingleBlog
