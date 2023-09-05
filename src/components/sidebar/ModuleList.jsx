import React from 'react';
import Module from './Module';

export default function ModuleList({ modules }) {
    return (
        <div>
            <h3 className='text-dark'>Modules</h3>

            {/* Modules */}
            {modules?.map((module, index) => (
                // SET THE ACTIVE PROPERTY TO TRUE IF THE MODULE IS THE CURRENTLY ACTIVE MODULE
                <Module key={index} name={module.name} completion={module.completion} icon={module.icon} active={module.active} />
            ))}
        </div>
    )
}
