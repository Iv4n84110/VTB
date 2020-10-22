import React, {useState} from "react";
import Modal from "../../shared/Modal";
import Aux from "../../hoc/Auxiliary";
import PageLayout from "../../shared/PageLayout";
import SignIn from "./SignIn";

const Main = () => {
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    return (
        <PageLayout modalHandler={openModal}>
            <Modal show={modal}  modalClosed={closeModal}>
                <SignIn modalClosed={closeModal}/>
            </Modal>
            <div>main</div>
        </PageLayout>
    )

}

export default Main;