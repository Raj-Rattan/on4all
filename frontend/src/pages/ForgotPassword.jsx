import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordToken } from '../features/user/userSlice';

const emailSchema = yup.object({
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
});

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: emailSchema,
        onSubmit: values => {
            dispatch(forgotPasswordToken(values))
        },
    });

    return (
        <>
            <Meta title={"On4All | Forgot Password"} />
            <BreadCrumb title="Forgot Password" />

            <Container class1="login-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-2'>Reset Your Password</h3>
                            <p className="text-center mb-3 mt-2">We will send you an email to reset your password</p>
                            <form action="" className='d-flex flex-column gap-15' onSubmit={formik.handleSubmit}>
                                <div>
                                    <CustomInput
                                        type="email"
                                        name='email'
                                        placeholder='Email'
                                        onChange={formik.handleChange("email")}
                                        onBlur={formik.handleBlur("email")}
                                        value={formik.values.email}
                                    />
                                    <div className="error">
                                        {formik.touched.email && formik.errors.email}
                                    </div>

                                </div>
                                <div>
                                    <div className="mt-3 d-flex flex-column  justify-content-center align-items-center gap-15">
                                        <button className="button border-0" type='submit'>Submit</button>
                                        <Link to={"/login"}>Cancel</Link>
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

export default ForgotPassword
