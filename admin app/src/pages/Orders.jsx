import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateSingleOrder } from '../features/auth/authSlice';
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';

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
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Orders = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [])

    const orderState = useSelector((state) => state?.auth?.orders?.data);

    const data1 = [];
    if (orderState && Array.isArray(orderState)) {
        for (let i = 0; i < orderState.length; i++) {
            data1.push({
                key: i + 1,
                name: `${orderState[i]?.user?.firstName} ${orderState[i]?.user?.lastName}`,
                product: <Link to={`/admin/order/${orderState[i]?._id}`}>View Orders</Link>,
                amount: orderState[i]?.totalPriceAfterDiscount,
                date: new Date(orderState[i]?.createdAt).toLocaleDateString(),
                action:
                    <>
                        <select name="" id=""
                            defaultValue={orderState[i]?.orderStatus ? orderState[i]?.orderStatus : "Ordered"}
                            className='form-control form-select '
                            onChange={(e) => updateOrderStatus(orderState[i]?._id, e.target.value)}
                        >
                            <option value="Ordered" disabled >Ordered</option>
                            <option value="Processing">Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </>
            });
        }
    }

    const updateOrderStatus = (id, status) => {
        dispatch(updateSingleOrder({ id: id, status: status }))
    }

    return (
        <div>
            <h3 className='mb-4 title'>Orders</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Orders
