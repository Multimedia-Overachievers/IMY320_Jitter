import React from 'react'

export default function OverallStatistics({ totalHours, contentCovered }) {
    return (
        <div>
            <h3>Statistics</h3>
            <div className="d-flex justify-content-between">
                <div>
                    <p>Total hours</p>
                    <p>{totalHours}</p>
                </div>
                <div>
                    <p>Content covered</p>
                    <p>{contentCovered}%</p>
                </div>
            </div>
        </div>
    )
}
