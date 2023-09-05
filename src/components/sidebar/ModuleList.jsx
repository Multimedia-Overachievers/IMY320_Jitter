import React from 'react';
import Module from './Module';

export default function ModuleList() {
    return (
        <div>
            <h3>Modules</h3>

            {/* Create these dynamically!! */}
            <Module name='IMY 310' completion='50%' icon='icon' />
            <Module name='IMY 300' completion='50%' icon='icon' />
            <Module name='IMY 320' completion='50%' icon='icon' />
        </div>
    )
}
