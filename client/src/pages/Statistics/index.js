import React, {useState} from "react";
import PageLayout from "../../shared/PageLayout";
import SignIn from "../Main/SignIn/index.js";
import Modal from "../../shared/Modal";
import { Redirect } from "react-router-dom";
import {Bar} from 'react-chartjs-2';

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

    const users = ["January", "February", "March", "April", "May", "June", "July", "July"];

    const colors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(43, 0, 119, 0.6)',
        'rgba(96, 0, 120, 0.6)',
        'rgba(120, 0, 80, 0.6)',
        'rgba(40, 168, 45, 0.6)',
    ];

    const getRandomColor = () => (colors[Math.floor(Math.random() * colors.length)]);

    const backgroundColors = users.map(() => getRandomColor());

    const data = {
        labels: users,
        datasets: [{
            label: "User's activity",
            backgroundColor: backgroundColors,
            data: [40, 10, 5, 2, 20, 30, 45, 38],
        }]
    }

    return (
        openedMain ? <Redirect to="/" /> :
        <div>
            <PageLayout modalHandler={openModal} redirectToMain={redirectToMain}> 
            <Modal show={modal}  modalClosed={closeModal}>
                <SignIn modalClosed={closeModal}/>
            </Modal>
            < Bar data={data} height={150} />
            </PageLayout>
        </div>
    )

}

export default Statistics;