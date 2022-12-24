import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export const MyModal=({modal,setModal,title,msg,handleClose})=>{
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} onClosed={handleClose}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{msg}</ModalBody>
      </Modal>
    </div>
  );
}
