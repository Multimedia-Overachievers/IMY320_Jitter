import React from 'react';

export default function QuestionBar({ questionData, SelectEvent, CompletedEvent }) {
    return (
        <>
            <div className='d-flex justify-content-between w-100 mt-5'>
                {questionData?.map((question, index) => (
                    <div key={index} className={`position-relative pointer rounded-1 p-2 mx-1 bg-${question.completed ? 'primary' : 'secondary'} flex-grow-1`} 
                    onClick={() => SelectEvent(index)}>
                        {question.active && <div className="triangle"></div>}
                    </div>
                ))}
            </div>
        </>
    )
}
