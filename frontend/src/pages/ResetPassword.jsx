import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useLocation, useNavigate } from "react-router-dom"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/user/userSlice';

const passwordSchema = yup.object({
    password: yup.string()
        .min(6, "Password should be at least 6 characters")
        .max(16, "Password can not exceed 16 characters")
        .required("Password is required"),
    confpassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required("Confirm Password is required"),
});


function ResetPassword() {

    const location = useLocation();
    const getAccessToken = location.pathname.split("/")[2];
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            password: '',
            confpassword: ""
        },
        validationSchema: passwordSchema,
        onSubmit: (values) => {
            dispatch(resetPassword({ accessToken: getAccessToken, password: values.password }))
            navigate("/")
        },
    });


    return (
        <>
            <Meta title={"On4All | Reset Password"} />
            <BreadCrumb title="Reset Password" />

            <Container class1="login-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-4'>Reset Your Password</h3>
                            <form action="" className='d-flex flex-column gap-15' onSubmit={formik.handleSubmit}>
                                <div>
                                    <CustomInput
                                        type="password"
                                        name='password'
                                        placeholder='Password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange('password')}
                                        onBlur={formik.handleBlur('password')}
                                    />
                                    <div className="error">
                                        {formik.touched.password && formik.errors.password}
                                    </div>
                                </div>
                                <div>
                                    <CustomInput
                                        type="password"
                                        name='confpassword'
                                        placeholder='Confirm Password'
                                        value={formik.values.confpassword}
                                        onChange={formik.handleChange('confpassword')}
                                        onBlur={formik.handleBlur('confpassword')}
                                    />
                                    <div className="error">
                                        {formik.touched.confpassword && formik.errors.confpassword}
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button className="button border-0" type='submit'>Set Password</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>

        </>
    )
}

export default ResetPassword
