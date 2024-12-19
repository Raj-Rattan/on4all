import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createColor, getCurrentColor, resetState, updateCurrentColor } from '../features/color/colorSlice';

let schema = Yup.object().shape({
    title: Yup.string().required("Color is required"),
})

const AddColor = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const getColorId = location.pathname.split("/")[3];

    const newColorState = useSelector((state) => state.color)

    const { isSuccess, isError, isLoading, createdColor, colorName, updatedColor } = newColorState;

    useEffect(() => {
        if (getColorId !== undefined) {
            dispatch(getCurrentColor(getColorId));
        } else {
            dispatch(resetState());
        }


    }, [getColorId])

    useEffect(() => {
        if (newColorState) {
            if (isSuccess && createdColor) {
                toast.success("Color Added Successfully!");
            }

            if (isSuccess && updatedColor) {
                toast.success("Color Updated Successfully!");
                navigate("/admin/color-list")
            }

            if (isError) {
                console.log('Color creation error');
                toast.error("Something went wrong!");
            }
        }
    }, [isSuccess, isError, isLoading, createdColor]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: colorName || '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (getColorId !== undefined) {
                const data = { id: getColorId, colorData: values }
                dispatch(updateCurrentColor(data))
            } else {
                dispatch(createColor(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">{getColorId !== undefined ? "Edit" : "Add"} Color</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div>
                        <CustomInput type="color"
                            label="Enter Color"
                            name="title"
                            onCh={formik.handleChange("title")}
                            onBl={formik.handleBlur("title")}
                            val={formik.values.title}
                            id="color"
                        />
                        <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div>
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-2' type="submit">{getColorId !== undefined ? "Update" : "Add"} Color</button>
                </form>
            </div>
        </div>
    )
}

export default AddColor
