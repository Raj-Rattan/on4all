import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getCurrBlogCategory, newBlogCategory, resetState, updateCurrBlogCategory } from "../features/blogCategory/blogCategorySlice"

let schema = Yup.object().shape({
    title: Yup.string().required("Category Name is required"),
})

const AddBlogCategory = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const getBlogCategoryId = location.pathname.split("/")[3];

    const newBlogCategoryState = useSelector((state) => state.blogCategory)

    const { isSuccess, isError, isLoading, createdBlogCategory, blogsCategoryName, updatedBlogCategory } = newBlogCategoryState;

    useEffect(() => {
        if (getBlogCategoryId !== undefined) {
            dispatch(getCurrBlogCategory(getBlogCategoryId));
        } else {
            dispatch(resetState());
        }
    }, [getBlogCategoryId])

    useEffect(() => {
        if (newBlogCategoryState) {

            if (isSuccess && createdBlogCategory) {
                toast.success("Blog Category Added Successfully!");
            }

            if (isSuccess && updatedBlogCategory) {
                toast.success("Blog Category Updated Successfully!");
                navigate("/admin/blog-category-list")
            }

            if (isError) {
                console.log('Blog Category creation error');
                toast.error("Something went wrong!");
            }
        }
    }, [isSuccess, isError, isLoading, updatedBlogCategory]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogsCategoryName || '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (getBlogCategoryId !== undefined) {
                const data = { id: getBlogCategoryId, blogCategoryData: values }
                dispatch(updateCurrBlogCategory(data))
            } else {
                dispatch(newBlogCategory(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }

        },
    });

    return (
        <div>
            <h3 className="mb-4 title">{getBlogCategoryId !== undefined ? "Edit" : "Add"} Blog Category</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div>
                        <CustomInput type="text"
                            label="Enter Blog Category"
                            name="title"
                            onCh={formik.handleChange("title")}
                            onBl={formik.handleBlur("title")}
                            val={formik.values.title}
                            id="blogCategory"
                        />
                        <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div>
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-2' type="submit">{getBlogCategoryId !== undefined ? "Update" : "Add"} Blog Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddBlogCategory
