import React from 'react';
import Module from './Module';

export default function ModuleList({ modules, setModule }) {
    const setActiveModule = (index) => {
        // SET THE ACTIVE PROPERTY TO TRUE IF THE MODULE IS THE CURRENTLY ACTIVE MODULE
        modules.forEach((module, i) => {
            module.active = i === index;
        });

        setModule(modules[index]);
    }

    return (
        <div>
            <h3 className='text-dark'>Modules</h3>

            {/* Modules */}
            {modules?.map((module, index) => (
                // SET THE ACTIVE PROPERTY TO TRUE IF THE MODULE IS THE CURRENTLY ACTIVE MODULE
                <div onClick={() => setActiveModule(index)} key={index}>
                    <Module name={module.name} completion={module.completion} icon={module.icon} active={module.active} />
                </div>
            ))}
        </div>
    )
}