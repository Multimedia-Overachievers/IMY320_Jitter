import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ConfirmationModal(props) {

    return (
        <>
            <Modal
                {...props}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body className='p-4'>
                    <h3 className='text-primary'>{props.title}</h3>
                    <p className='my-4'>{props.body}</p>
                    <div className='d-flex justify-content-end'>
                        <Button variant="outline" onClick={props.onHide}>
                            Cancel
                        </Button>
                        <Button variant="danger" className='text-white' onClick={props.confirmaction}>{props.confirmText}</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}