import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, getSingleOrder } from '../features/auth/authSlice';
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom"

const columns = [
    {
        title: 'SNo.',
        dataIndex: 'key',
    },
    {
        title: 'Product Name',
        dataIndex: 'name',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
    },
    {
        title: 'Count',
        dataIndex: 'count',
    },
    {
        title: 'Color',
        dataIndex: 'color',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
];


const ViewOrder = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const orderId = location.pathname.split("/")[3];

    useEffect(() => {
        dispatch(getSingleOrder(orderId));
    }, [])

    const orderState = useSelector((state) => state.auth?.singleOrder?.data);
    console.log(orderState);

    console.log("Hello", orderState?.orderItems?.length);
    const data1 = [];

    for (let i = 0; i < orderState?.orderItems?.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState?.orderItems[i]?.product?.title,
            brand: orderState?.orderItems[i]?.product?.brand,
            count: orderState?.orderItems[i]?.quantity,
            color: orderState?.orderItems[i]?.color,
            amount: orderState?.totalPriceAfterDiscount,
            date: new Date(orderState?.createdAt).toLocaleDateString(),
        });
    }


    return (
        <div>
            <h3 className='mb-4 title'>View Order</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default ViewOrder
