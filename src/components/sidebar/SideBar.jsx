import React from 'react';
import ModuleList from './ModuleList';
import OverallStatistics from './OverallStatistics';
import { formatMinutes } from '../../utils/functions';

export default function SideBar({ modules, setModule }) {

    return (
        <div className='vh-100 p-5 pb-3 d-flex flex-column justify-content-between' style={{backgroundColor: '#FCFDFE'}}>
            {/* Logo */}
            <div className='d-flex justify-content-center'>
                <img src='images/logo.svg' alt='logo' className='img-fluid' />
            </div>

            {/* User profile */}
            {/* <div className='d-flex justify-content-between align-items-start'>
                <div>
                    <h4 className='text-secondary'>Welcome,</h4>
                    <h2 className='text-dark'>Tristan Nel</h2>
                </div>

                {/* Log out 
                <div className='d-flex justify-content-center text-secondary align-items-center'>
                    <p className='m-0 p-0 text-secondary'>Log out</p>
                    <BiLogOut className='ms-2' size='1.3em' style={{ rotate: '180deg' }} />
                </div>
            </div> */}

            {/* Module list */}
            <ModuleList modules={modules} setModule={setModule} />

            {/* Overall statistics */}
            <OverallStatistics totalHours={formatMinutes(80)} contentCovered={21} />

            <small className='text-secondary text-center p-0 m-0'>jitter co.</small>
        </div>
    )
}
