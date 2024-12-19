import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import { deleteCurrentCoupon, getCoupons, resetState } from '../features/coupon/couponSlice';
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
        title: 'Discount',
        dataIndex: 'discount',
        sorter: (a, b) => a.discount - b.discount,
    },
    {
        title: 'Expiry Date',
        dataIndex: 'expiryDate',
        sorter: (a, b) => a.expiryDate.length - b.expiryDate.length,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const CouponList = () => {

    const [open, setOpen] = useState(false);
    const [couponId, setCouponId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setCouponId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState());
        dispatch(getCoupons());
    }, [])

    const couponState = useSelector((state) => state.coupon.coupons.data);

    const data1 = [];
    if (couponState && Array.isArray(couponState)) {
        for (let i = 0; i < couponState.length; i++) {
            data1.push({
                key: i + 1,
                name: `${couponState[i].name}`,
                discount: `${couponState[i].discount}`,
                expiryDate: new Date(couponState[i].expiry).toLocaleDateString(),
                action:
                    <>
                        <Link to={`/admin/add-coupon/${couponState[i]._id}`} className='fs-4 text-success '>
                            <TbEdit />
                        </Link>
                        <button to="/" className=' ms-3 fs-4 text-danger bg-transparent border-0 '
                            onClick={() => showModal(couponState[i]._id)}
                        >
                            <MdDeleteForever />
                        </button>
                    </>
            });
        }
    }

    const deleteCoupon = (e) => {
        setOpen(false)
        dispatch(deleteCurrentCoupon(e))
        setTimeout(() => {
            dispatch(getCoupons());
        }, 100);
    }

    return (
        <div>
            <h3 className='mb-4 title'>Coupons</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => deleteCoupon(couponId)}
                title="Are you sure you want to delete this Coupon ?"
            />
        </div>
    )
}

export default CouponList

