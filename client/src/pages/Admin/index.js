import React,{ useState } from "react";
import Modal from "../../shared/Modal";
import PageLayout from "../../shared/PageLayout";
import Content from "./Content";
import SignOut from "./SignOut"

const Admin = () => {

  const [modal, setModal] = useState(false);

  const openModal = () => {
      setModal(true)
  }

  const closeModal = () => {
      setModal(false)
  }

  return (
    <PageLayout modalHandler={openModal} auth={true}>
      <Modal show={modal} modalClosed={closeModal}>
        <SignOut modalClosed={closeModal} />
      </Modal>
      <Content/>
    </PageLayout>
  );
};

export default Admin;
