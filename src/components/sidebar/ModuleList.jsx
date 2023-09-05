import React from 'react';
import Module from './Module';

export default function ModuleList({ modules }) {
    return (
        <div>
            <h3>Modules</h3>

            {/* Modules */}
            {modules?.map((module, index) => (
                <Module key={index} name={module.name} completion={module.completion} icon={module.icon} />
            ))}
        </div>
    )
}
