import React from 'react'

function Container(props) {
  return (
    <section className={props.class1}>
      <div className="container-1640">{props.children}</div>
    </section>
  )
}

export default Container
