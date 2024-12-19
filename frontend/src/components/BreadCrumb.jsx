import React from 'react'
import { Link } from 'react-router-dom'

function BreadCrumb(props) {
    const {title} = props;
  return (
    <div className='breadcrumb py-4 mb-0 '>
      <div className="container-1640">
        <div className="row">
            <div className="col-12">
                <p className='text-center mb-0 '>
                    <Link className='text-dark' to="/">Home </Link> / {title}
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default BreadCrumb
