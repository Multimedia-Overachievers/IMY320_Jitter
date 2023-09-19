import React from 'react';
import { BiLogOut, BiCoffeeTogo, BiImage, BiTerminal } from 'react-icons/bi';

export default function Module({ name, completion, icon, active}) {

        /**
     * This function returns a FontAwesomeIcon component based on the icon name passed in
     * @param {string} iconName 
     * @returns FontAwesomeIcon Component
     */
         const getIconComponent = (iconName) => {
            switch (iconName) {
                case 'Coffee':
                    return <BiCoffeeTogo size="70" />
                case 'Terminal':
                    return <BiTerminal size="70" />
                case 'Image':
                    return <BiImage size="70" />
                default:
                    return <BiCoffeeTogo size="70" />
            }
        }

    return (
        <div className={`d-flex p-4 shadow rounded mb-3 align-items-center ${active && 'bg-primary'}`}>
            <div className={active ? 'text-white' : 'text-primary'}>
                {getIconComponent(icon)}
            </div>
            <div className='ms-4'>
                <h4 className={`p-0 m-0 ${active ? 'text-white' : 'text-dark'}`}>{name}</h4>
                <small className={`d-block ${active ? 'text-white' : 'text-secondary'}`}>Completion</small>
                <small className={active ? 'text-white' : 'text-secondary'}>{completion}%</small>
            </div>
        </div>
    )
}
