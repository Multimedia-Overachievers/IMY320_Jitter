import React from 'react'

export default function Module({ name, completion, icon, active}) {
    return (
        <div className={`d-flex p-4 shadow rounded mb-3 align-items-center ${active && 'bg-primary'}`}>
            <div className={active ? 'text-white' : 'text-primary'}>
                {icon}
            </div>
            <div className='ms-4'>
                <h4 className={`p-0 m-0 ${active ? 'text-white' : 'text-dark'}`}>{name}</h4>
                <small className={`d-block ${active ? 'text-white' : 'text-secondary'}`}>Completion</small>
                <small className={active ? 'text-white' : 'text-secondary'}>{completion}%</small>
            </div>
        </div>
    )
}
