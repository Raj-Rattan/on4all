import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrentProduct, getProducts, resetState } from '../features/product/productSlice';
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
        title: 'Brand',
        dataIndex: 'brand',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const ProductList = () => {

    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setProductId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState());
        dispatch(getProducts());
    }, [])

    const productState = useSelector((state) => state?.product?.products?.data);

    const data1 = [];
    if (productState && Array.isArray(productState)) {
        for (let i = 0; i < productState.length; i++) {
            data1.push({
                key: i + 1,
                title: `${productState[i].title}`,
                price: `${productState[i].price}`,
                brand: `${productState[i].brand}`,
                category: `${productState[i].productCategory}`,
                action:
                    <>
                        <Link to={`/admin/product/${productState[i]._id}`} className='fs-4 text-success '>
                            <TbEdit />
                        </Link>
                        <button to="/" className=' ms-3 fs-4 text-danger bg-transparent border-0 '
                            onClick={() => showModal(productState[i]._id)}
                        >
                            <MdDeleteForever />
                        </button>
                    </>,
            });
        }
    }

    const deleteProduct = (e) => {
        setOpen(false)
        dispatch(deleteCurrentProduct(e))
        setTimeout(() => {
            dispatch(getProducts());
        }, 100);
    }

    return (
        <div>
            <h3 className='mb-4 title'>Products</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => deleteProduct(productId)}
                title="Are you sure you want to delete this Product ?"
            />
        </div>
    )
}

export default ProductList
