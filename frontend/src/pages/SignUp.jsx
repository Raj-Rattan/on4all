import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';


const signUpSchema = yup.object({
    firstName: yup.string().defined().required('First name is required'),
    lastName: yup.string().default('').nullable(),
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
    mobile: yup.string().required("Phone number is required"),
    password: yup.string()
        .min(6, "Password should be at least 6 characters")
        .max(16, "Password can not exceed 16 characters")
        .required("Password is required"),
});

const SignUp = () => {

    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: ''
        },
        validationSchema: signUpSchema,
        onSubmit: values => {
            dispatch(registerUser(values))
            formik.resetForm();
        },
    });

    useEffect(() => {
        if (authState.createdUser !== null && authState.isError === false) {
            navigate("/login")
        }
    }, [authState])

    return (
        <>
            <Meta title={"On4All | Sign Up"} />
            <BreadCrumb title="Sign Up" />

            <Container class1="login-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-4'>Sign Up</h3>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <div>
                                    <CustomInput
                                        type="text"
                                        name='firstname'
                                        placeholder='First Name'
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange('firstName')}
                                        onBlur={formik.handleBlur('firstName')}
                                    />
                                    <div className="error">
                                        {formik.touched.firstName && formik.errors.firstName}
                                    </div>
                                </div>
                                <div>
                                    <CustomInput
                                        type="text"
                                        name='lastname'
                                        placeholder='Last Name'
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange('lastName')}
                                        onBlur={formik.handleBlur('lastName')}
                                    />
                                    <div className="error">
                                        {formik.touched.lastName && formik.errors.lastName}
                                    </div>
                                </div>
                                <div>
                                    <CustomInput
                                        type="email"
                                        name='email'
                                        placeholder='Email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange('email')}
                                        onBlur={formik.handleBlur('email')}
                                    />
                                    <div className="error">
                                        {formik.touched.email && formik.errors.email}
                                    </div>
                                </div>
                                <div>
                                    <CustomInput
                                        type="tel"
                                        name='mobile'
                                        placeholder='Phone No.'
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange('mobile')}
                                        onBlur={formik.handleBlur('mobile')}
                                    />
                                    <div className="error">
                                        {formik.touched.mobile && formik.errors.mobile}
                                    </div>
                                </div>
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
                                    <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button className="button border-0 signup">Sign Up</button>
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

export default SignUp
