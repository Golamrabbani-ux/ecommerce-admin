import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import './common.css';

const CustomModal = (props) => {
    return (
        <Modal
            show={props?.show}
            onHide={props?.handleClose}
            size={props?.size || "lg"}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{props?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props?.children
                }
            </Modal.Body>
            {
                props?.buttons?.length > 0 &&
                <Modal.Footer>
                    {
                        props?.buttons?.map((btn, index) =>
                            <div ke={index}>
                                <Button 
                                    onClick={btn.onClick}
                                    variant={btn.color} 
                                    style={{ width: '50px', height: '30px' }}
                                    className='btn btn-sm'
                                >
                                    {btn.label}
                                </Button>
                            </div>
                        )
                    }
                </Modal.Footer>
            }
        </Modal>
    );
};

export default CustomModal;