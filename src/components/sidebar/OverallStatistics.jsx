import React from 'react'

export default function OverallStatistics({ totalHours, contentCovered }) {
    return (
        <div>
            <h3 className='text-dark'>Statistics</h3>
            <div className="d-flex justify-content-between">
                <div className='rounded shadow p-3 w-50 me-4'>
                    <p className='m-0 p-0 text-secondary mb-2'>Total hours</p>
                    <h2 className='m-0 p-0 text-primary fw-bold'>{totalHours}</h2>
                </div>
                <div className='rounded shadow p-3 w-50'>
                    <p className='m-0 p-0 text-secondary mb-2'>Content covered</p>
                    <h2 className='m-0 p-0 text-primary fw-bold'>{contentCovered}%</h2>
                </div>
            </div>
        </div>
    )
}
