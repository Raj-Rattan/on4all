import React from 'react'

function Color(props) {
    const { colorData, setColor } = props;
    return (
        <>
            <ul className='colors ps-0 mb-0'>
                {
                    colorData && colorData?.map((item, index) => {
                        return (
                            <li
                                key={index}
                                style={{ backgroundColor: item?.color }}
                                onClick={() => setColor(item?._id)}

                            ></li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Color
