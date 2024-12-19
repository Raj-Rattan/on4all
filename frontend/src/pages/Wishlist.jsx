// importing images
import cross from "../images/cross.svg"
import smartwatch from "../images/smartwatch.jpg"

import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/product/productSlice";


function Wishlist() {

    const dispatch = useDispatch()

    const wishlistState = useSelector((state) => {
        if (state.auth.wishlist.data) {
            return state.auth.wishlist.data.wishlist || [];
        } else {
            return state.auth.wishlist || [];
        }
    });

    useEffect(() => {
        getWishlistFromDB()
    }, [])

    const getWishlistFromDB = () => {
        dispatch(getUserProductWishlist())
    }


    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id))
        setTimeout(() => {
            dispatch(getUserProductWishlist())
        }, 300);
    }


    return (
        <>
            <Meta title={"On4All | Wishlist"} />
            <BreadCrumb title="Wishlist" />

            <Container class1="wish-list-wrapper py-5 home-wrapper-2">
                <div className="row">
                    {
                        wishlistState.length === 0 && <div className="text-center fs-3  ">No Data</div>
                    }
                    {
                        wishlistState?.map((item, index) => {
                            return (
                                <div className="col-3" key={index}>
                                    <div className="wishlist-card position-relative">
                                        <img
                                            className='position-absolute cross img-fluid '
                                            src={cross}
                                            alt="cross"
                                            onClick={() => { removeFromWishlist(item?._id) }}
                                        />
                                        <div className="wishlist-card-image">
                                            <img className='img-fluid d-block mx-auto' src={item?.images[0]?.url ? item?.images[0]?.url : smartwatch} alt="smartwatch" />
                                        </div>
                                    </div>
                                    <div className="wishlist-card-details">
                                        <h5 className="title">{item?.title}</h5>
                                        <h6 className="price mb-3 ">₹{item?.price}</h6>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </Container>

        </>
    )
}

export default Wishlist
