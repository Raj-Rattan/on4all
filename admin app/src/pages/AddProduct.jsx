import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { InboxOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getProductCategories } from '../features/productCategory/prodCategorySlice';
import { getColors } from '../features/color/colorSlice';
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import Dropzone from 'react-dropzone'
import { deleteImage, uploadImage } from '../features/upload/uploadSlice';
import { createProducts, getCurrentProduct, resetState, updateCurrentProduct } from '../features/product/productSlice';


let schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    brand: Yup.string().required("Brand is required"),
    productCategory: Yup.string().required("Product Category is required"),
    color: Yup.array().min(1, 'Colors are required'),
    quantity: Yup.number().required("Quantity is required"),
    tags: Yup.string().required("Tag is required"),
})

const AddProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([])
    const [images, setImages] = useState([])

    const getProductId = location.pathname.split("/")[3];

    useEffect(() => {
        if (getProductId !== undefined) {
            dispatch(getCurrentProduct(getProductId));
        } else {
            dispatch(resetState());
        }
    }, [getProductId])

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getProductCategories());
        dispatch(getColors());
        formik.values.color = color;
        formik.values.images = images;
    }, [])

    useEffect(() => {
        formik.setFieldValue('images', images);
    }, [images]);

    const brandState = useSelector((state) => state.brand.brands.data)
    const productCategoryState = useSelector((state) => state.productCategory.productCategories.data)
    const colorState = useSelector((state) => state.color.colors.data)
    const imageState = useSelector((state) => state.upload.images.data)
    const newProductState = useSelector((state) => state.product)

    const { isSuccess, isError, isLoading, createdProduct, updatedProduct, productName, productCategory, productDescription, productPrice, productBrand, tagsProduct, productColor, productQuantity, productImages } = newProductState;

    useEffect(() => {
        if (newProductState) {

            if (isSuccess && createdProduct) {
                toast.success("Product Added Successfully!");
            }

            if (isSuccess && updatedProduct) {
                toast.success("Product Updated Successfully!");
                navigate("/admin/product-list")
            }

            if (isError) {
                console.log('Product creation error');
                toast.error("Something went wrong!");
            }
        }
    }, [newProductState]);

    const colors = []
    if (colorState) {
        colorState.forEach((i) => {
            colors.push({
                _id: i._id,
                color: i.title
            })
        });
    }

    useEffect(() => {
        if (imageState) {
            setImages(imageState.map((i) => ({
                public_id: i.public_id,
                url: i.url
            })));
        }
    }, [imageState]);
    // console.log(images);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: productName || '',
            description: productDescription || "",
            price: productPrice || "",
            brand: productBrand || "",
            productCategory: productCategory || "",
            tags: tagsProduct || "",
            color: productColor || [],
            quantity: productQuantity || "",
            images: productImages || [],
        },
        validationSchema: schema,
        onSubmit: values => {
            if (getProductId !== undefined) {
                const data = { id: getProductId, productData: values }
                dispatch(updateCurrentProduct(data))
            } else {
                dispatch(createProducts(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">{getProductId !== undefined ? "Edit" : "Add"} Product</h3>
            <div>
                <form onSubmit={formik.handleSubmit} className=''>
                    <div className="my-2">
                        <CustomInput type="text"
                            label="Enter Product Title"
                            name="title"
                            onCh={formik.handleChange("title")}
                            onBl={formik.handleBlur("title")}
                            val={formik.values.title}
                        />
                        <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div>
                    </div>
                    <div className="my-2">
                        <ReactQuill theme="snow"
                            name="description"
                            onChange={formik.handleChange("description")}
                            value={formik.values.description}
                        />
                        <div className="error">
                            {formik.touched.description && formik.errors.description}
                        </div>
                    </div>
                    <div className="my-2">
                        <CustomInput type="number"
                            label="Enter Product Price"
                            name="price"
                            onCh={formik.handleChange("price")}
                            onBl={formik.handleBlur("price")}
                            val={formik.values.price}
                        />
                        <div className="error">
                            {formik.touched.price && formik.errors.price}
                        </div>
                    </div>

                    <div className="my-2">
                        <select id="" className='form-control form-select  py-3 mb-3 '
                            name="brand"
                            onChange={formik.handleChange("brand")}
                            onBlur={formik.handleBlur("brand")}
                            value={formik.values.brand}
                        >
                            <option value="">Select Brand</option>
                            {brandState && brandState.map((i, index) => {
                                return (
                                    <option key={index} value={i.title}>{i.title}</option>
                                )
                            })}
                        </select>
                        <div className="error">
                            {formik.touched.brand && formik.errors.brand}
                        </div>
                    </div>

                    <div className="my-2">
                        <select id="" className='form-control form-select  py-3 mb-3 '
                            name="productCategory"
                            onChange={formik.handleChange("productCategory")}
                            onBlur={formik.handleBlur("productCategory")}
                            value={formik.values.productCategory}
                        >
                            <option value="">Select Category</option>
                            {productCategoryState && productCategoryState.map((i, index) => {
                                return (
                                    <option key={index} value={i.title}>{i.title}</option>
                                )
                            })}
                        </select>
                        <div className="error">
                            {formik.touched.productCategory && formik.errors.productCategory}
                        </div>
                    </div>

                    <div className="my-2">
                        <select id="" className='form-control form-select  py-3 mb-3 '
                            name="tags"
                            onChange={formik.handleChange("tags")}
                            onBlur={formik.handleBlur("tags")}
                            value={formik.values.tags}
                        >
                            <option value="" disabled>Select Tag</option>
                            <option value="featured">Featured</option>
                            <option value="popular">Popular</option>
                            <option value="special">Special</option>

                        </select>
                        <div className="error">
                            {formik.touched.tags && formik.errors.tags}
                        </div>
                    </div>

                    <div className="my-2">
                        <Multiselect className='fs-6'
                            name="color"
                            dataKey="id"
                            textField="color"
                            data={colors.filter(color => !formik.values.color.map(c => c._id).includes(color._id))}
                            value={formik.values.color}
                            defaultValue={color}
                            placeholder='Select Color'
                            onChange={(selectedColors) => {
                                formik.setFieldValue('color', selectedColors);
                            }}
                            onCreate={(newColor) => {
                                const existingColor = colors.find(color => color.color === newColor);
                                if (existingColor) {
                                    const newSelectedColors = formik.values.color.filter(color => color._id !== existingColor._id);
                                    formik.setFieldValue('color', newSelectedColors);
                                } else {
                                    // Handle creating new color if needed
                                }
                            }}
                        />
                        <div className="error">
                            {formik.touched.color && formik.errors.color}
                        </div>
                    </div>

                    <div className="my-2">
                        <CustomInput type="number"
                            label="Enter Product Quantity"
                            name="quantity"
                            onCh={formik.handleChange("quantity")}
                            onBl={formik.handleBlur("quantity")}
                            val={formik.values.quantity}
                        />
                        <div className="error">
                            {formik.touched.quantity && formik.errors.quantity}
                        </div>
                    </div>

                    <div className='bg-white border-1 text-center p-5 '>
                        <Dropzone onDrop={acceptedFiles => dispatch(uploadImage(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="show-images d-flex flex-wrap gap-3 mt-3  ">
                        {imageState && imageState.map((i, index) => {
                            return (
                                <div key={index} className='position-relative '>
                                    <button
                                        type='button'
                                        onClick={() => dispatch(deleteImage(i.public_id))}
                                        className='btn-close position-absolute '
                                        style={{ top: "8px", right: "8px" }}
                                    >
                                    </button>
                                    <img src={i.url} alt="" width={150} height={150} />
                                </div>
                            )
                        })}
                    </div>


                    <button className='btn btn-success border-0 rounded-3 my-4' type="submit">{getProductId !== undefined ? "Update" : "Add"} Product</button>
                </form>
            </div >
        </div >
    )
}

export default AddProduct
