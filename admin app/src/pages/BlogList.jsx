import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrentBlog, getBlogs, resetState } from '../features/blog/blogSlice';
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';

const columns = [
    {
        title: 'SNo.',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const BlogList = () => {

    const [open, setOpen] = useState(false);
    const [blogId, setBlogId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setBlogId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState())
        dispatch(getBlogs());
    }, [])

    const blogState = useSelector((state) => state.blog.blogs.data)

    const data1 = [];
    if (blogState && Array.isArray(blogState)) {
        for (let i = 0; i < blogState.length; i++) {
            data1.push({
                key: i + 1,
                title: `${blogState[i].title}`,
                category: `${blogState[i].category}`,
                action:
                    <>
                        <Link to={`/admin/add-blog/${blogState[i]._id}`} className='fs-4 text-success '>
                            <TbEdit />
                        </Link>
                        <button to="/" className=' ms-3 fs-4 text-danger bg-transparent border-0 '
                            onClick={() => showModal(blogState[i]._id)}
                        >
                            <MdDeleteForever />
                        </button>
                    </>
            });
        }
    }

    const deleteBlog = (e) => {
        setOpen(false)
        dispatch(deleteCurrentBlog(e))
        setTimeout(() => {
            dispatch(getBlogs());
        }, 100);
    }

    return (
        <div>
            <h3 className='mb-4 title'>Blog List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => deleteBlog(blogId)}
                title="Are you sure you want to delete this Blog ?"
            />
        </div>
    )
}

export default BlogList
