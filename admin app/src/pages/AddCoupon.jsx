import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCoupon, getCurrentCoupon, resetState, updateCurrentCoupon } from '../features/coupon/couponSlice';

let schema = Yup.object().shape({
    name: Yup.string().required("Coupon Name is required"),
    expiry: Yup.date().required("Expiry Date is required"),
    discount: Yup.number().required("Discount Percentage is required"),
})

const AddCoupon = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const getCouponId = location.pathname.split("/")[3];

    const newCouponState = useSelector((state) => state.coupon)

    const { isSuccess, isError, isLoading, createdCoupon, couponName, couponExpiry, couponDiscount, updatedCoupon } = newCouponState;

    const changeDateFormat = (date) => {
        const newDate = new Date(date);
        // Extract the year, month, and day components
        const year = newDate.getFullYear();
        // Months are zero-based, so add 1 to get the correct month
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');
        // Return the formatted date string
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        if (getCouponId !== undefined) {
            dispatch(getCurrentCoupon(getCouponId));
        } else {
            dispatch(resetState());
        }
    }, [getCouponId])

    useEffect(() => {
        if (newCouponState) {

            if (isSuccess && createdCoupon) {
                toast.success("Coupon Added Successfully!");
            }

            if (isSuccess && updatedCoupon) {
                toast.success("Coupon Updated Successfully!");
                navigate("/admin/coupon-list")
            }

            if (isError) {
                console.log('Coupon creation error');
                toast.error("Something went wrong!");
            }
        }
    }, [isSuccess, isError, isLoading, createdCoupon]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: couponName || '',
            expiry: changeDateFormat(couponExpiry) || '',
            discount: couponDiscount || '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (getCouponId !== undefined) {
                const data = { id: getCouponId, couponData: values }
                dispatch(updateCurrentCoupon(data))
            } else {
                dispatch(createCoupon(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div>
                        <CustomInput type="text"
                            label="Enter Coupon Name"
                            name="name"
                            onCh={formik.handleChange("name")}
                            onBl={formik.handleBlur("name")}
                            val={formik.values.name}
                            id="couponName"
                        />
                        <div className="error">
                            {formik.touched.name && formik.errors.name}
                        </div>
                    </div>
                    <div>
                        <CustomInput type="date"
                            label="Enter Expiry Date"
                            name="expiry"
                            onCh={formik.handleChange("expiry")}
                            onBl={formik.handleBlur("expiry")}
                            val={formik.values.expiry}
                            id="expiryDate"
                        />
                        <div className="error">
                            {formik.touched.expiry && formik.errors.expiry}
                        </div>
                    </div>
                    <div>
                        <CustomInput type="number"
                            label="Enter Discount Percentage"
                            name="discount"
                            onCh={formik.handleChange("discount")}
                            onBl={formik.handleBlur("discount")}
                            val={formik.values.discount}
                            id="discount"
                        />
                        <div className="error">
                            {formik.touched.discount && formik.errors.discount}
                        </div>
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-3' type="submit">{getCouponId !== undefined ? "Update" : "Add"} Coupon</button>
                </form>
            </div>
        </div>
    )
}

export default AddCoupon
