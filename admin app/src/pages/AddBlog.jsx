import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import Dropzone from 'react-dropzone'
import { deleteImage, uploadImage } from '../features/upload/uploadSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createBlogs, getCurrentBlog, resetState, updateCurrentBlog } from '../features/blog/blogSlice';
import { getBlogCategories } from '../features/blogCategory/blogCategorySlice';

let schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
})


const AddBlog = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [images, setImages] = useState([])

    const getBlogId = location.pathname.split("/")[3];

    useEffect(() => {
        if (getBlogId !== undefined) {
            dispatch(getCurrentBlog(getBlogId));
        } else {
            dispatch(resetState());
        }
    }, [getBlogId])

    useEffect(() => {
        dispatch(resetState())
        dispatch(getBlogCategories());
        formik.values.images = images;
    }, [])

    useEffect(() => {
        formik.setFieldValue('images', images);
    }, [images]);

    const imageState = useSelector((state) => state.upload.images.data)
    const blogState = useSelector((state) => state.blog)
    const blogCategoryState = useSelector((state) => state.blogCategory.blogCategories.data)

    const { isSuccess, isError, isLoading, createdBlog, updatedBlog, blogName, blogCategory, blogDescription, blogImages } = blogState;

    useEffect(() => {
        if (getBlogId !== undefined) {
            dispatch(getCurrentBlog(getBlogId));
        } else {
            dispatch(resetState());
        }
    }, [getBlogId])

    useEffect(() => {
        if (blogState) {

            if (isSuccess && createdBlog) {
                toast.success("Blog Added Successfully!");
            }

            if (isSuccess && updatedBlog) {
                toast.success("Blog Updated Successfully!");
                navigate("/admin/blog-list")
            }

            if (isError) {
                console.log('Blog creation error');
                toast.error("Something went wrong!");
            }
        }
    }, [isSuccess, isError, isLoading, createdBlog]);


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
            title: blogName || '',
            description: blogDescription || "",
            category: blogCategory || "",
            images: blogImages || [],
        },
        validationSchema: schema,
        onSubmit: values => {
            if (getBlogId !== undefined) {
                const data = { id: getBlogId, blogData: values }
                dispatch(updateCurrentBlog(data))
            } else {
                dispatch(createBlogs(values))
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">{getBlogId !== undefined ? "Edit" : "Add"} Blog</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div>
                        <CustomInput type="text"
                            label="Enter Blog Title"
                            name="title"
                            onCh={formik.handleChange("title")}
                            onBl={formik.handleBlur("title")}
                            val={formik.values.title}
                        />
                        <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div>
                    </div>
                    <div>
                        <select id="" className='form-control py-3 mt-3  '
                            name="category"
                            onChange={formik.handleChange("category")}
                            onBlur={formik.handleBlur("category")}
                            value={formik.values.category}
                        >
                            <option value="">Select Blog Category</option>
                            {blogCategoryState && blogCategoryState.map((i, index) => {
                                return (
                                    <option key={index} value={i.title}>{i.title}</option>
                                )
                            })}
                        </select>
                        <div className="error">
                            {formik.touched.category && formik.errors.category}
                        </div>
                    </div>
                    <div className="">
                        <ReactQuill theme="snow" className='mt-3'
                            name="description"
                            onChange={formik.handleChange("description")}
                            value={formik.values.description}
                        />
                        <div className="error">
                            {formik.touched.description && formik.errors.description}
                        </div>
                    </div>
                    <div className='bg-white border-1 text-center p-5 mt-3'>
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
                    <div className="show-images d-flex flex-wrap gap-3 mt-3 ">
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
                    <button className='btn btn-success border-0 rounded-3 my-4' type="submit">{getBlogId !== undefined ? "Update" : "Add"} Blog</button>
                </form>
            </div>
        </div>
    )
}

export default AddBlog
