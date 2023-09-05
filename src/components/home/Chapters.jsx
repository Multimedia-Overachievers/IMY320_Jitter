import React from 'react'

export default function Chapters({module}) {
    return (
        <div>
            <div className="d-flex">
                <h2>Chapters</h2>
                {/* Take exam */}
                <div className="btn btn-primary" onClick={() => console.log('Send me to /exam/{module} or whatever')}>
                    <p>Take exam</p>
                </div>
            </div>
        </div>
    )
}
