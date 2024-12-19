import React, { useEffect, useState } from 'react'
import { HiArrowUpRight, HiArrowDownRight } from "react-icons/hi2";
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyData, getOrders, getYearlyData } from '../features/auth/authSlice';


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
        title: 'Product Count',
        dataIndex: 'product',
    },
    {
        title: 'Total Price',
        dataIndex: 'price',
    },
    {
        title: 'Total Price After Discount',
        dataIndex: 'discountPrice',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];


const Dashboard = () => {

    const dispatch = useDispatch()
    const monthlyDataState = useSelector((state) => state?.auth?.monthlyData?.data)
    const yearlyDataState = useSelector((state) => state?.auth?.yearlyData?.data)
    const orderState = useSelector((state) => state?.auth?.orders?.data)


    const [dataMonthly, setDataMonthly] = useState([])
    const [dataMonthlySales, setDataMonthlySales] = useState([])
    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        dispatch(getMonthlyData())
        dispatch(getYearlyData())
        dispatch(getOrders())
    }, [])

    useEffect(() => {
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let data = []
        let monthlyOrderCount = []
        for (let index = 0; index < monthlyDataState?.length; index++) {
            const element = monthlyDataState[index];
            data.push({
                type: monthNames[element?._id?.month],
                income: element?.amount
            })
            monthlyOrderCount.push({
                type: monthNames[element?._id?.month],
                sales: element?.count
            })

        }
        setDataMonthly(data);
        setDataMonthlySales(monthlyOrderCount);

        const data1 = [];
        for (let i = 0; i < orderState?.length; i++) {
            data1.push({
                key: i,
                name: orderState[i]?.user?.firstName + orderState[i]?.user?.lastName,
                product: orderState[i]?.orderItems?.length,
                price: orderState[i]?.totalPrice,
                discountPrice: orderState[i]?.totalPriceAfterDiscount,
                status: orderState[i]?.orderStatus,
            });
        }
        setOrderData(data1)

    }, [monthlyDataState, orderState])

    const config = {
        data: dataMonthly,
        xField: "type",
        yField: "income",
        label: {
            position: "middle"
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        style: {
            fill: "#ffd333",
        },
        meta: {
            type: {
                alias: "Month"
            },
            sales: {
                alias: "Income"
            }
        }
    };

    const config2 = {
        data: dataMonthlySales,
        xField: "type",
        yField: "sales",
        label: {
            position: "middle"
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        style: {
            fill: "#ffd333",
        },
        meta: {
            type: {
                alias: "Month"
            },
            sales: {
                alias: "Sales"
            }
        }
    };

    return (
        <div>
            <h3 className='mb-4 title'>Dashboard</h3>
            <div className="d-flex justify-content-between align-items-center gap-3 ">
                <div className='d-flex flex-grow-1 justify-content-between align-items-end  bg-white p-3 rounded-3 '>
                    <div>
                        <p className='desc'>Total amount</p>
                        <h4 className='mb-0 sub-title'>₹{yearlyDataState && yearlyDataState[0]?.amount}</h4>
                    </div>

                    <div className='d-flex  flex-column align-items-end '>
                        {/* <h6 className='green'><HiArrowUpRight />34.7%</h6> */}
                        <p className='mb-0 desc'>Income in last year from today</p>
                    </div>
                </div>
                <div className='d-flex flex-grow-1 justify-content-between align-items-end  bg-white p-3 rounded-3 '>
                    <div>
                        <p className='desc'>Total sales</p>
                        <h4 className='mb-0 sub-title'>{yearlyDataState && yearlyDataState[0]?.count}</h4>
                    </div>
                    <div className='d-flex  flex-column align-items-end '>
                        {/* <h6 className='red'><HiArrowDownRight />12.0%</h6> */}
                        <p className='mb-0 desc'>Sales in last year from today</p>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between gap-3">
                <div className="mt-4 flex-grow-1 w-50 ">
                    <h3 className="mb-5 title">Income Statistics</h3>
                    <div><Column {...config} /></div>
                </div>
                <div className="mt-4 flex-grow-1 w-50 ">
                    <h3 className="mb-5 title">Sales Statistics</h3>
                    <div><Column {...config2} /></div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-5 title">Recent Orders</h3>
                <div><Table columns={columns} dataSource={orderData} /></div>
            </div>
        </div>
    )
}

export default Dashboard
