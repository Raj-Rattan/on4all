import React, { useState } from 'react';
import { Link } from "react-router-dom";

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout, Menu, Button, theme } from 'antd';
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaUser } from "react-icons/lia";
import { BsCartPlus, BsDatabase, BsCartCheck } from "react-icons/bs";
import { CiCircleList } from "react-icons/ci";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt, BiColorFill, BiBookAdd } from "react-icons/bi";
import { MdLibraryBooks, MdOutlineContactPage, MdNotifications } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { PiGraphDuotone, PiSignOutBold } from "react-icons/pi";
import { RiCoupon2Line } from "react-icons/ri";


import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();


    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical d-flex align-items-center justify-content-center ">
                    <h2 className='text-center text-white fs5 fw-bold py-2 mb-0 '>
                        <span className='sm-logo fs-4 '>O4A</span>
                        <span className='lg-logo'>On4All</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key === "signout") {
                            localStorage.clear()
                            window.location.reload()
                        } else {
                            navigate(key)
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className='fs-5' />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customers',
                            icon: <LiaUser className='fs-5' />,
                            label: 'Customers',
                        },
                        {
                            key: 'catalog',
                            icon: <BsDatabase className='fs-5' />,
                            label: 'Catalog',
                            children: [
                                {
                                    key: 'product',
                                    icon: <BsCartPlus className='fs-5' />,
                                    label: 'Add Product',
                                },
                                {
                                    key: 'product-list',
                                    icon: <CiCircleList className='fs-5' />,
                                    label: 'Product List',
                                },
                                {
                                    key: 'brand',
                                    icon: <SiBrandfolder className='fs-5' />,
                                    label: 'Brand',
                                },
                                {
                                    key: 'brand-list',
                                    icon: <CiCircleList className='fs-5' />,
                                    label: 'Brand List',
                                },
                                {
                                    key: 'category',
                                    icon: <BiCategoryAlt className='fs-5' />,
                                    label: 'Category',
                                },
                                {
                                    key: 'category-list',
                                    icon: <CiCircleList className='fs-5' />,
                                    label: 'Category List',
                                },
                                {
                                    key: 'color',
                                    icon: <BiColorFill className='fs-5' />,
                                    label: 'Color',
                                },
                                {
                                    key: 'color-list',
                                    icon: <CiCircleList className='fs-5' />,
                                    label: 'Color List',
                                },
                            ]
                        },
                        {
                            key: 'orders',
                            icon: <BsCartCheck className='fs-5' />,
                            label: 'Orders',
                        },
                        {
                            key: 'marketing',
                            icon: <PiGraphDuotone className='fs-5' />,
                            label: 'Marketing',
                            children: [
                                {
                                    key: 'add-coupon',
                                    icon: <RiCoupon2Line className='fs-5' />,
                                    label: 'Add Coupon',
                                },
                                {
                                    key: 'coupon-list',
                                    icon: <CiCircleList className='fs-5' />,
                                    label: 'Coupon List',
                                },
                            ]
                        },
                        {
                            key: 'blogs',
                            icon: <MdLibraryBooks className='fs-5' />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: 'add-blog',
                                    icon: <BiBookAdd className='fs-5' />,
                                    label: 'Add Blog',
                                },
                                {
                                    key: 'blog-list',
                                    icon: <CiCircleList className='fs-5' />,
                                    label: 'Blog List',
                                },
                                {
                                    key: 'add-blog-category',
                                    icon: <TbCategoryPlus className='fs-5' />,
                                    label: 'Add Blog Category',
                                },
                                {
                                    key: 'blog-category-list',
                                    icon: <CiCircleList className='fs-5' />,
                                    label: 'Blog Category List',
                                },
                            ]
                        },
                        {
                            key: 'enquiries',
                            icon: <MdOutlineContactPage className='fs-5' />,
                            label: 'Enquiries',
                        },
                        {
                            key: 'signout',
                            icon: <PiSignOutBold className='fs-5' />,
                            label: 'Signout',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header className='d-flex justify-content-between align-items-center pe-5 '
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='d-flex align-items-center gap-3 '>
                        <div className='position-relative '>
                            <MdNotifications className='fs-3' />
                            <span className='position-absolute badge bg-warning rounded-circle p-1'>6</span>
                        </div>
                        <div className='d-flex align-items-center gap-2 dropdown '>
                            <div>
                                <img height={40} width={40} src="https://avatars.githubusercontent.com/u/125482223?v=4" alt="avatar" />
                            </div>
                            <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                <h5>Himanshu</h5>
                                <p>singhaniaraj238@gmail.com</p>
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><Link className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px" }} to="/">View Profile</Link></li>
                                <li><Link className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px" }} to="/">Signout</Link></li>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <ToastContainer
                        position="top-right"
                        autoClose={250}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="light"
                    />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;