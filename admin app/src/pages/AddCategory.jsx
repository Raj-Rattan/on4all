import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createProductCategory, getCurrProductCategory, resetState, updateCurrProductCategory } from '../features/productCategory/prodCategorySlice';

let schema = Yup.object().shape({
    title: Yup.string().required("Category Name is required"),
})

const AddCategory = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const getProductCategoryId = location.pathname.split("/")[3];

    const newProductCategoryState = useSelector((state) => state.productCategory)

    const { isSuccess, isError, isLoading, createdCategory, prodCategoryName, updatedProductCategory } = newProductCategoryState;

    useEffect(() => {
        if (getProductCategoryId !== undefined) {
            dispatch(getCurrProductCategory(getProductCategoryId));
        } else {
            dispatch(resetState());
        }
    }, [getProductCategoryId])

    useEffect(() => {
        if (newProductCategoryState) {
            if (isSuccess && createdCategory) {
                toast.success("Product Category Added Successfully!");
            }

            if (isSuccess && updatedProductCategory) {
                toast.success("Product Category Updated Successfully!");
                navigate("/admin/category-list")
            }

            if (isError) {
                toast.error("Something went wrong!");
            }
        }
    }, [isSuccess, isError, isLoading, updatedProductCategory]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: prodCategoryName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getProductCategoryId !== undefined) {
                const data = { id: getProductCategoryId, productCategoryData: values }
                dispatch(updateCurrProductCategory(data))
            } else {
                dispatch(createProductCategory(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">{getProductCategoryId !== undefined ? "Edit" : "Add"} Product Category</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div>
                        <CustomInput type="text"
                            label="Enter Product Category"
                            name="title"
                            onCh={formik.handleChange("title")}
                            onBl={formik.handleBlur("title")}
                            val={formik.values.title}
                        />
                        <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div>
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-3' type="submit">{getProductCategoryId !== undefined ? "Update" : "Add"} Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory
