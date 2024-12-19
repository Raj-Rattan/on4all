import React from 'react'
import { Link } from 'react-router-dom'

import blog_1 from "../images/blog-1.jpg"


function BlogCard(props) {

  const { id, title, description, image, date } = props;

  return (
    <div className={`${(location.pathname === "/blogs" ? "col-6 mb-4" : "col-3")}`}>
      <div className="blog-card">
        <div className="card-image">
          <img className='img-fluid w-100' src={image ? image : blog_1} alt="blog image" />
        </div>
        <div className="blog-content">
          <p className='date'>{date}</p>
          <h5 className='title'>{title}</h5>
          <p className="desc" dangerouslySetInnerHTML={{ __html: description?.substr(0, 80) + "..." }}></p>
          <Link to={`${location.pathname === "/blogs" ? id : "blogs/" + id}`} className='button'>Read More</Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
