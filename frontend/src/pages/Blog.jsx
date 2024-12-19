import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import BlogCard from '../components/BlogCard'
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blog/blogSlice';
import moment from "moment";


function Blog() {

    const dispatch = useDispatch()

    const blogState = useSelector((state) => state.blog.blog.data)

    useEffect(() => {
        getBlogs()
    }, [])

    const getBlogs = () => {
        dispatch(getAllBlogs())
    }

    return (
        <>
            <Meta title={"On4All | Blogs"} />
            <BreadCrumb title="Blogs" />

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
                            {
                                blogState?.map((item, index) => {
                                    return (
                                        <BlogCard
                                            key={index}
                                            id={item?._id}
                                            title={item?.title}
                                            description={item?.description}
                                            image={item?.images[0]?.url}
                                            date={moment(item?.createdAt).format('MMMM Do YYYY')}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Container>

        </>
    )
}

export default Blog
