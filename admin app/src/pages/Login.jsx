import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";


let schema = Yup.object().shape({
    email: Yup.string().email("Email must be valid").required("Email is required"),
    password: Yup.string().required("Password is required"),
})

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ""
        },
        validationSchema: schema,
        onSubmit: values => {
            dispatch(login(values))
        },
    });

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isSuccess) {
            navigate("admin")
        }
        else {
            navigate("");
        }
    }, [user, isLoading, isSuccess, isError])

    return (
        <div className="py-5 d-flex justify-content-center align-items-center " style={{ background: "#ffd333", minHeight: "100vh" }} >
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className='title'>Login</h3>
                <p>Login to your account to continue.</p>
                <div className="error">
                    {message.message == "Rejected" ? "You are not an Admin" : ""}
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type='email'
                        name="email"
                        label='Email Address'
                        id='login_email'
                        val={formik.values.email}
                        onCh={formik.handleChange("email")}
                    />
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type='password'
                        name="password"
                        label='Password'
                        id='login_password'
                        val={formik.values.password}
                        onCh={formik.handleChange("password")}
                    />
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <button
                        className='border-0 px-3 py-2 text-white fw-bold w-100 text-center  text-decoration-none fs-5  '
                        style={{ background: "#ffd333" }}
                        type='submit'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
