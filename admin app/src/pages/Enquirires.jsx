import React, { useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrentEnquiry, getEnquiries, resetState, updateCurrentEnquiry } from '../features/enquiry/enquirySlice';
import { MdDeleteForever, MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';

const columns = [
    {
        title: 'SNo.',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Enquirires = () => {

    const [open, setOpen] = useState(false);
    const [enquiryId, setEnquiryId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setEnquiryId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    useState(() => {
        dispatch(resetState())
        dispatch(getEnquiries());
    }, [])

    const enquiryState = useSelector((state) => state.enquiry.enquiries.data)

    const data1 = [];
    if (enquiryState && Array.isArray(enquiryState)) {
        for (let i = 0; i < enquiryState.length; i++) {
            data1.push({
                key: i + 1,
                name: `${enquiryState[i].name}`,
                email: `${enquiryState[i].email}`,
                comment: `${enquiryState[i].comment}`,
                status: (
                    <>
                        <select name="" id=""
                            defaultValue={enquiryState[i].status ? enquiryState[i].status : "Submitted"}
                            className='form-control form-select '
                            onChange={(e) => setEnquiryStatus(e.target.value, enquiryState[i]._id)}
                        >
                            <option value="Submitted" selected>Submitted</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </>
                ),
                action:
                    <>
                        <Link to={`/admin/enquiries/${enquiryState[i]._id}`} className='fs-4 text-success '>
                            <MdOutlineRemoveRedEye />
                        </Link>
                        <button to="/" className=' ms-3 fs-4 text-danger bg-transparent border-0 '
                            onClick={() => showModal(enquiryState[i]._id)}
                        >
                            <MdDeleteForever />
                        </button>
                    </>
            });
        }
    }

    const setEnquiryStatus = (e, i) => {
        const data = { id: i, enquiryData: e }
        dispatch(updateCurrentEnquiry(data));
    }

    const deleteEnquiry = (e) => {
        setOpen(false)
        dispatch(deleteCurrentEnquiry(e))
        setTimeout(() => {
            dispatch(getEnquiries());
        }, 100);
    }

    return (
        <div>
            <h3 className='mb-4 title'>Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => deleteEnquiry(enquiryId)}
                title="Are you sure you want to delete this Enquiry ?"
            />
        </div>
    )
}

export default Enquirires
