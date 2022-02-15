import React from 'react';
import {Button, Modal} from "react-bootstrap";

function ConfirmModal({popup, confirm, reject}) {
    const {show, name} = popup;

    return (
        <>
            <Modal show={show} onHide={reject}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to remove : {name}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={confirm}>
                        Ok
                    </Button>
                    <Button variant="primary" onClick={reject}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmModal;

