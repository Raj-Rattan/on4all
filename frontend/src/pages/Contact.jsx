import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { IoHome, IoCall } from "react-icons/io5";
import { TbMailFilled } from "react-icons/tb";
import { FaInfo } from "react-icons/fa";
import Container from '../components/Container';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createQuery } from '../features/contanct/contactSlice';


const contactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email should be valid").required("Email is required"),
  phone: yup.number().required("Phone number is required"),
  comment: yup.string().required("Comment is required"),

});

const Contact = () => {

  const dispatch = useDispatch();


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      comment: '',
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      dispatch(createQuery({ name: values.name, email: values.email, phone: values.phone, comment: values.comment, }))
      formik.resetForm();
    },
  });

  return (
    <>
      <Meta title={"On4All | Contact Us"} />
      <BreadCrumb title="Contact Us" />

      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8734.379959402619!2d77.32802114926513!3d28.60469596733939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4dd937112fd%3A0xc4ee372b43438d82!2sKondli%2C%20New%20Delhi%2C%20110096!5e0!3m2!1sen!2sin!4v1708116827105!5m2!1sen!2sin" width="600" height="450" className='border-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div className="col-12 mt-5 ">
            <div className="contact-form-wrapper d-flex justify-content-between ">
              <div>
                <h3 className="contact-title mb-4 ">Contact</h3>
                <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                  <div>
                    <input
                      type="text"
                      className='form-control'
                      placeholder='Name'
                      name='name'
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      value={formik.values.name}
                    />
                    <div className="error">
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      className='form-control'
                      placeholder='Email'
                      name='email'
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      value={formik.values.email}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div>
                    <input
                      type="tel"
                      className='form-control'
                      placeholder='Phone Number'
                      name='phone'
                      onChange={formik.handleChange("phone")}
                      onBlur={formik.handleBlur("phone")}
                      value={formik.values.phone}
                    />
                    <div className="error">
                      {formik.touched.phone && formik.errors.phone}
                    </div>
                  </div>
                  <div>
                    <textarea
                      className='w-100 form-control '
                      name="comment"
                      id=""
                      cols="30"
                      rows="5"
                      placeholder='Comments'
                      onChange={formik.handleChange("comment")}
                      onBlur={formik.handleBlur("comment")}
                      value={formik.values.comment}
                    >
                    </textarea>
                    <div className="error">
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                  </div>
                  <div>
                    <button className="button border-0 ">Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4 ">Get in touch with us</h3>
                <div>
                  <ul>
                    <li className='mb-3 d-flex align-items-center gap-15'>
                      <IoHome className='fs-5' />
                      <address className="mb-0">H No : F - 110 Kondli, Delhi 110096</address>
                    </li>
                    <li className='mb-3 d-flex align-items-center gap-15'>
                      <IoCall className='fs-5' />
                      <a href="tel:+91 8447767283">+91 8447767283</a>
                    </li>
                    <li className='mb-3 d-flex align-items-center gap-15'>
                      <TbMailFilled className='fs-5' />
                      <a href="mailto:singhaniaraj238soe@gmail.com">singhaniaraj238soe@gmail.com</a>
                    </li>
                    <li className='mb-3 d-flex align-items-center gap-15'>
                      <FaInfo className='fs-5' />
                      <p className="mb-0">Monday to Friday 10 AM - 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>


    </>
  )
}

export default Contact
