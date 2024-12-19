import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom"
import { getCurrentEnquiry, resetState, updateCurrentEnquiry } from '../features/enquiry/enquirySlice';
import { IoArrowBack } from "react-icons/io5";

const ViewEnquiry = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getEnquiryId = location.pathname.split("/")[3];

    const enquiryState = useSelector((state) => state.enquiry)

    const { enquiryName, enquiryEmail, enquiryPhone, enquiryComment, enquiryStatus } = enquiryState;

    useEffect(() => {
        dispatch(getCurrentEnquiry(getEnquiryId));
    }, [getEnquiryId])

    const goBack = () => {
        navigate(-1)
    }

    const setEnquiryStatus = (e, i) => {
        const data = { id: i, enquiryData: e }
        dispatch(updateCurrentEnquiry(data));
        dispatch(resetState())
        setTimeout(() => {
            dispatch(getCurrentEnquiry(getEnquiryId));
        }, 100);
    }

    return (
        <div>

            <div className='d-flex justify-content-between align-items-center '>
                <h3 className='mb-0 title'>View Enquiry</h3>
                <button className='bg-transparent border-0 fs-6 d-flex align-items-center gap-1 mb-0 ' onClick={goBack}> <IoArrowBack className='fs-5 ' />Go Back</button>
            </div>
            <div className="mt-5 bg-white p-4 rounded-3 d-flex gap-3 flex-column ">
                <div className="d-flex align-items-center gap-3 ">
                    <h6 className="mb-0">Name : </h6>
                    <p className="mb-0">{enquiryName}</p>
                </div>
                <div className="d-flex align-items-center gap-3 ">
                    <h6 className="mb-0">Email : </h6>
                    <p className="mb-0">
                        <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>
                    </p>
                </div>
                <div className="d-flex align-items-center gap-3 ">
                    <h6 className="mb-0">Phone : </h6>
                    <p className="mb-0">
                        <a href="tel:+91"></a>
                        <a href={`tel:+91${enquiryPhone}`}>{enquiryPhone}</a>
                    </p>
                </div>
                <div className="d-flex align-items-center gap-3 ">
                    <h6 className="mb-0">Comment : </h6>
                    <p className="mb-0">{enquiryComment}</p>
                </div>
                <div className="d-flex align-items-center gap-3 ">
                    <h6 className="mb-0">Status : </h6>
                    <p className="mb-0">{enquiryStatus}</p>
                </div>
                <div className="d-flex align-items-center gap-3 ">
                    <h6 className="mb-0">Change Status : </h6>
                    <div>
                        <select name="" id=""
                            defaultValue={enquiryStatus ? enquiryStatus : "Submitted"}
                            className='form-control form-select '
                            onChange={(e) => setEnquiryStatus(e.target.value, getEnquiryId)}
                        >
                            <option value="Submitted" selected>Submitted</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEnquiry
