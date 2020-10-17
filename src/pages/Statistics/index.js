import React, {useState} from "react";
import PageLayout from "../../shared/PageLayout";
import SignIn from "../Main/SignIn/index.js";
import Modal from "../../shared/Modal";
import { Redirect } from "react-router-dom";

const Statistics = () => {
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const [ openedMain, toggleMain ] = useState(false);

    const redirectToMain = () => {
        toggleMain(!openedMain);
        console.log('click');
    }

    return (
        openedMain ? <Redirect to="/" /> :
        <div>
            <PageLayout modalHandler={openModal} redirectToMain={redirectToMain}> 
            <Modal show={modal}  modalClosed={closeModal}>
                <SignIn modalClosed={closeModal}/>
            </Modal>
            <span>statistics</span>
            </PageLayout>
        </div>
    )

}

export default Statistics;