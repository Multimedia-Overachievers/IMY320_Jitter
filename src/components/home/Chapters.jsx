import React, { useState } from 'react';
import Chapter from './Chapter';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { MdOutlineTimer } from 'react-icons/md';
import Button from 'react-bootstrap/Button';

export default function Chapters({ module }) {

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className='mt-5'>
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <h1 className='text-primary me-5'>Chapters</h1>
                        {/* Take exam */}
                        <div
                            className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                            style={{ height: '40px', width: '100px' }}
                            onClick={() => setModalShow(true)}
                        >
                            <p className='text-white fw-bold p-0 mb-1 text-decoration-none'>Take exam</p>
                        </div>
                    </div>
                </div>

                {/* Chapters */}
                {module?.chapters.map((chapter, index) => (
                    <Chapter key={index} moduleIndex={module.index} index={index} chapter={chapter.chapter} description={chapter.description} />
                ))}
            </div>

            {/* Modal */}
            <ExamChaptersModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);

                    // REDIRECT HERE!!
                    console.log('Send me to /exam/{module} or whatever');
                }}
                chapters={module?.chapters}
            />
        </>
    )
}

function ExamChaptersModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='p-5'>
                <div onClick={props.onHide}>
                    <BiLeftArrowAlt className='text-secondary mb-3' size={30} />
                </div>
                <h2 className='text-dark'>Select the chapters you want to be examined on</h2>

                <Form>
                    {/* Chapters */}
                    <Form.Group className='chapter-form'>
                        {
                            props.chapters?.map((chapter, index) => (
                                <div key={index} className='shadow p-3 bg-white text-dark fs-2 my-4 rounded'>
                                    <Form.Check type="checkbox" label={chapter.chapter} />
                                </div>
                            ))
                        }
                    </Form.Group>

                    {/* Time limit check box */}
                    <Form.Group className='d-flex align-items-center fs-3 mt-4'>
                        <MdOutlineTimer className='text-primary me-3' size={30} />
                        <Form.Check type="checkbox" label="Time limit" reverse />
                    </Form.Group>
                </Form>

                <div className="d-flex justify-content-end">
                    <Button size="lg" className='mt-5 text-white' onClick={props.onHide}>Start exam</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
