import React from 'react';
import Chapter from './Chapter';

export default function Chapters({ chapters }) {
    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <h2>Chapters</h2>
                    {/* Take exam */}
                    <div className="btn btn-primary" onClick={() => console.log('Send me to /exam/{module} or whatever')}>
                        <p>Take exam</p>
                    </div>
                </div>

                {/* Implement sort functionality here */}
                <div>
                    <small>sort</small>
                </div>
            </div>

            {/* Chapters */}
            {chapters?.map((chapter, index) => (
                <Chapter key={index} chapter={chapter.chapter} progress={chapter.progress} description={chapter.description} />
            ))}
        </div>
    )
}
