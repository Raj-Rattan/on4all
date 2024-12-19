import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrProductCategory, getProductCategories, resetState } from '../features/productCategory/prodCategorySlice';
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
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const CategoryList = () => {

    const [open, setOpen] = useState(false);
    const [productCategoryId, setProductCategoryId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setProductCategoryId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState());
        dispatch(getProductCategories());
    }, [])

    const productCategoryState = useSelector((state) => state.productCategory.productCategories.data);

    const data1 = [];
    if (productCategoryState && Array.isArray(productCategoryState)) {
        for (let i = 0; i < productCategoryState.length; i++) {
            data1.push({
                key: i + 1,
                name: `${productCategoryState[i].title}`,
                action:
                    <>
                        <Link to={`/admin/category/${productCategoryState[i]._id}`} className='fs-4 text-success '>
                            <TbEdit />
                        </Link>
                        <button to="/" className=' ms-3 fs-4 text-danger bg-transparent border-0 '
                            onClick={() => showModal(productCategoryState[i]._id)}
                        >
                            <MdDeleteForever />
                        </button>
                    </>
            });
        }
    }

    const deleteProductCategory = (e) => {
        setOpen(false)
        dispatch(deleteCurrProductCategory(e))
        setTimeout(() => {
            dispatch(getProductCategories());
        }, 100);
    }

    return (
        <div>
            <h3 className='mb-4 title'>Product Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => deleteProductCategory(productCategoryId)}
                title="Are you sure you want to delete this Product Category ?"
            />
        </div>
    )
}

export default CategoryList
