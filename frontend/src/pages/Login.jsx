import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';

const loginSchema = yup.object({
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const Login = () => {

    const authState = useSelector((state) => state?.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            dispatch(loginUser(values))
            if (authState.isSuccess === true) {
                formik.resetForm();
            }

        },
    });

    useEffect(() => {
        if (authState.user !== null && authState.isError === false) {
            navigate("/")
        }
    }, [authState])

    return (
        <>
            <Meta title={"On4All | Login"} />
            <BreadCrumb title="Login" />

            <Container class1="login-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-4'>Login</h3>
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
                                    <Link to={"/forgot-password"}>Forgot Password ?</Link>
                                    <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button className="button border-0" type='submit'>Login</button>
                                        <Link to={"/signup"} className='button signup '>Sign Up</Link>
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

export default Login
