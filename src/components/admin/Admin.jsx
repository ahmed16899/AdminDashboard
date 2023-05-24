import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '../Navbar';

const Admin = () => {
    return (
        <>
        <Navbar />
        <Outlet />
        </>
    );
};

export default Admin;