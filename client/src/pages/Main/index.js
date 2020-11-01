import React, { useState } from "react";
import Modal from "../../shared/Modal";
import PageLayout from "../../shared/PageLayout";
import SignIn from "./SignIn";
import { Auth } from "../../utils";

const Main = () => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const {  token } = Auth();
  const isAuthenticated = !!token;

  return (
    !isAuthenticated && (
      <PageLayout modalHandler={openModal} auth={false}>
        <SignIn />
      </PageLayout>
    )
  );
};

export default Main;
