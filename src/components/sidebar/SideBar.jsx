import React from 'react';
import ModuleList from './ModuleList';
import OverallStatistics from './OverallStatistics';

export default function SideBar() {

    // Function to convert minutes (80 minutes) into format 1h 20m
    function formatMinutes(minutes) {
        let hours = Math.floor(minutes / 60);
        let remainingMinutes = minutes % 60;

        return `${hours}h ${remainingMinutes}m`;
    }

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
            <OverallStatistics totalHours={formatMinutes(80)} contentCovered={21} />
        </>
    )
}
