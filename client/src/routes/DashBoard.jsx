import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;