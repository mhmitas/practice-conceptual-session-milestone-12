import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div className='relative min-h-screen md:flex'>
            {/* sidebar */}
            <div>
                <Sidebar />
            </div>
            {/* Outlet */}
            <div className='flex-1 md:ml-64'>
                <div className="p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;