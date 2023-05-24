import React from 'react';
import { Modal, Button } from "react-bootstrap";

function ModalD({ showModal,
    confirmModal,
    hideModal,
    getDeleted,
id }) {

    const submitHandler = () => {
      
        getDeleted(true)
    }
    //const handleClose = () => setShow(false);


    return (
        <>

            <Modal show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="alert alert-danger">delete</div></Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button variant="danger"  onClick={()=>{submitHandler(); hideModal()}}>
                    Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalD;