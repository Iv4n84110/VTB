import React from "react";
import Modal from "../../shared/Modal";
import PageLayout from "../../shared/PageLayout";
import Content from "./Content";
import { Redirect } from "react-router-dom";

const Admin = () => {
  return !localStorage.getItem("token") ? (
    <Redirect to="/" />
  ) : (
    <PageLayout>
      <Modal></Modal>
      <Content></Content>
    </PageLayout>
  );
};

export default Admin;
