import React from "react";
import Modal from "../../shared/Modal";
import PageLayout from "../../shared/PageLayout";
import Content from "./Content";

const Admin = () => {
  return (
    <PageLayout>
      <Modal></Modal>
      <Content></Content>
    </PageLayout>
  );
};

export default Admin;
