import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBrand, getABrand, resetState, updateCurrentBrand } from '../features/brand/brandSlice';

let schema = Yup.object().shape({
    title: Yup.string().required("Brand Name is required"),
})

const AddBrand = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const getBrandId = location.pathname.split("/")[3];

    const newBrandState = useSelector((state) => state.brand)

    const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrandState;

    useEffect(() => {
        if (getBrandId !== undefined) {
            dispatch(getABrand(getBrandId));
        } else {
            dispatch(resetState());
        }


    }, [getBrandId])

    useEffect(() => {
        if (newBrandState) {
            if (isSuccess && createdBrand) {
                toast.success("Brand Added Successfully!");
            }

            if (isSuccess && updatedBrand) {
                toast.success("Brand Updated Successfully!");
                navigate("/admin/brand-list")
            }

            if (isError) {
                toast.error("Something went wrong!");
            }
        }
    }, [isSuccess, isError, isLoading, createdBrand]);



    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brandName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getBrandId !== undefined) {
                const data = { id: getBrandId, brandData: values }
                dispatch(updateCurrentBrand(data))
            } else {
                dispatch(createBrand(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">{getBrandId !== undefined ? "Edit" : "Add"} Brand</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div>
                        <CustomInput type="text"
                            label="Enter Brand"
                            name="title"
                            onCh={formik.handleChange("title")}
                            onBl={formik.handleBlur("title")}
                            val={formik.values.title}
                            id="brand"
                        />
                        <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div>
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-3' type="submit">{getBrandId !== undefined ? "Update" : "Add"} Brand</button>
                </form>
            </div>
        </div>
    )
}

export default AddBrand
