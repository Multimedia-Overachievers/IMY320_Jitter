import React from 'react';
import ModuleList from './ModuleList';
import OverallStatistics from './OverallStatistics';
import { formatMinutes } from '../../utils/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTerminal, faImage } from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {

    let moduleList = [
        {
            name: 'Module 1',
            completion: 80,
            // you might need to make a function that takes in a module name and returns an icon if you can't hard store 
            // these components
            icon: <FontAwesomeIcon icon={faCoffee} />
        },
        {
            name: 'Module 2',
            completion: 80,
            icon: <FontAwesomeIcon icon={faTerminal} />
        },
        {
            name: 'Module 3',
            completion: 80,
            icon: <FontAwesomeIcon icon={faImage} />
        },
    ]

    return (
        <div className='bg-white vh100'>
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
            <ModuleList modules={moduleList} />

            {/* Overall statistics */}
            <OverallStatistics totalHours={formatMinutes(80)} contentCovered={21} />
        </div>
    )
}
