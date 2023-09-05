import React from 'react';
import Chapter from './Chapter';
import { FiFilter } from 'react-icons/fi';

export default function Chapters({ chapters }) {
    return (
        <div className='mt-5'>
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <h1 className='text-primary me-5'>Chapters</h1>
                    {/* Take exam */}
                    <div 
                        className="btn btn-primary btn-sm d-flex justify-content-center align-items-center" 
                        style={{ height: '40px' }}
                        onClick={() => console.log('Send me to /exam/{module} or whatever')}
                    >
                        <p className='text-white fw-bold p-0 mb-1'>Take exam</p>
                    </div>
                </div>

                {/* Implement sort functionality here */}
                <div className='d-flex align-items-center'>
                    <p className='text-secondary m-0 p-0 me-2'>sort</p>
                    <FiFilter className='text-secondary' />
                </div>
            </div>

            {/* Chapters */}
            {chapters?.map((chapter, index) => (
                <Chapter key={index} chapter={chapter.chapter} progress={chapter.progress} description={chapter.description} />
            ))}
        </div>
    )
}
