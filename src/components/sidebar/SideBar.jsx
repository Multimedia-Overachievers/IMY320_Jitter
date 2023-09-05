import React from 'react';
import ModuleList from './ModuleList';
import OverallStatistics from './OverallStatistics';

export default function SideBar() {
    return (
        <>
            {/* Logo */}
            <div className='d-flex justify-content-center'>
                <img src='images/logo.svg' alt='logo' className='img-fluid' />
            </div>

            {/* User profile */}
            <div className='d-flex justify-content-between'>
                <div>
                    <h4>Welcome,</h4>
                    <h3>Tristan Nel</h3>
                </div>

                {/* Log out */}
                <div className='d-flex justify-content-center'>
                    <p>Log out</p>
                </div>
            </div>

            {/* Module list */}
            <ModuleList />

            {/* Overall statistics */}
            <OverallStatistics />
        </>
    )
}
