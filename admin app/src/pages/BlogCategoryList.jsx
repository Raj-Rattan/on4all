import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrBlogCategory, getBlogCategories, resetState } from '../features/blogCategory/blogCategorySlice';
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
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const BlogCategoryList = () => {

    const [open, setOpen] = useState(false);
    const [blogCategoryId, setBlogCategoryId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setBlogCategoryId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState())
        dispatch(getBlogCategories());
    }, [])

    const blogCategoryState = useSelector((state) => state.blogCategory.blogCategories.data)

    const data1 = [];
    if (blogCategoryState && Array.isArray(blogCategoryState)) {
        for (let i = 0; i < blogCategoryState.length; i++) {
            data1.push({
                key: i + 1,
                name: `${blogCategoryState[i].title}`,
                action:
                    <>
                        <Link to={`/admin/add-blog-category/${blogCategoryState[i]._id}`} className='fs-4 text-success '>
                            <TbEdit />
                        </Link>
                        <button to="/" className=' ms-3 fs-4 text-danger bg-transparent border-0 '
                            onClick={() => showModal(blogCategoryState[i]._id)}
                        >
                            <MdDeleteForever />
                        </button>
                    </>
            });
        }
    }

    const deleteBlogCategory = (e) => {
        setOpen(false)
        dispatch(deleteCurrBlogCategory(e))
        setTimeout(() => {
            dispatch(getBlogCategories());
        }, 100);
    }

    return (
        <div>
            <h3 className='mb-4 title'>Blog Category</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => deleteBlogCategory(blogCategoryId)}
                title="Are you sure you want to delete this Blog Category ?"
            />
        </div>
    )
}

export default BlogCategoryList
