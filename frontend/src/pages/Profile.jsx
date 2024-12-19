import React, { useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
import { TbEdit } from "react-icons/tb";


const profileSchema = yup.object({
    firstName: yup.string().defined().required('First name is required'),
    lastName: yup.string().default('').nullable(),
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
    mobile: yup.string().required("Phone number is required"),
});

const Profile = () => {

    const getTokenFromLocalStorage = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null;

    const config2 = {
        headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""}`,
            Accept: "application/json"
        }
    }

    const dispatch = useDispatch()
    const userState = useSelector((state) => state.auth?.user?.data)
    const [edit, setEdit] = useState(true)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: userState?.user?.firstName,
            lastName: userState?.user?.lastName,
            email: userState?.user?.email,
            mobile: userState?.user?.mobile,
        },
        validationSchema: profileSchema,
        onSubmit: values => {
            dispatch(updateProfile({ data: values, config2: config2 }))
            setEdit(true)
        },
    });

    return (
        <>
            <Meta title={"On4All | My Profile"} />
            <BreadCrumb title="My Profile" />

            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center ">
                            <h3 className="section-heading">Update Profile</h3>
                            <TbEdit
                                className='fs-3 text-success '
                                style={{ cursor: 'pointer' }}
                                onClick={() => setEdit(false)}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="example1" className="form-label">First Name</label>
                                <input type="text"
                                    name='firstName'
                                    className="form-control"
                                    disabled={edit}
                                    id="example1"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange('firstName')}
                                    onBlur={formik.handleBlur('firstName')}
                                />
                                <div className="error">
                                    {formik.touched.firstName && formik.errors.firstName}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="example2" className="form-label">Last Name</label>
                                <input type="text"
                                    name='lastName'
                                    className="form-control"
                                    disabled={edit}
                                    id="example2"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange('lastName')}
                                    onBlur={formik.handleBlur('lastName')}
                                />
                                <div className="error">
                                    {formik.touched.lastName && formik.errors.lastName}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email"
                                    name='email'
                                    className="form-control"
                                    disabled={edit}
                                    id="exampleInputEmail1"
                                    value={formik.values.email}
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                />
                                <div className="error">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="example3" className="form-label">Phone Number</label>
                                <input type="number"
                                    name='mobile'
                                    className="form-control"
                                    disabled={edit}
                                    id="example3"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange('mobile')}
                                    onBlur={formik.handleBlur('mobile')}
                                />
                                <div className="error">
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>
                            </div>

                            {
                                edit === false && <button type="submit" className="btn btn-primary">Update</button>
                            }
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Profile
