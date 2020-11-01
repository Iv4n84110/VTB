import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { fetchRequest, AuthContext } from "../../../../../utils";

const Statistics = () => {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const auth = useContext(AuthContext);
  const { token } = useContext(AuthContext);

  const responseHandler = (response) => {
    const allUsers = [];
    const allActivities = [];
    response.forEach((user) => {
      allUsers.push(user.login);
      allActivities.push(+user.count);
    });
    setUsers(allUsers);
    setActivities(allActivities);
  };

  const rejectHandler = (response) => {
    if (response === 401) {
      auth.logout();
    }
  };

  useEffect(() => {
    fetchRequest(
      "/api/statistics/get-users",
      rejectHandler,
      responseHandler,
      {
        Authorization: `Bearer ${token}`,
      },
      "GET"
    );
  }, []);

  const colors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(43, 0, 119, 0.6)",
    "rgba(96, 0, 120, 0.6)",
    "rgba(120, 0, 80, 0.6)",
    "rgba(40, 168, 45, 0.6)",
  ];

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const backgroundColors = users.map(() => getRandomColor());

  const data = {
    labels: users,
    datasets: [
      {
        label: "User's activity",
        backgroundColor: backgroundColors,
        data: activities,
      },
    ],
  };

  return (
    // openedMain ? <Redirect to="/" /> :
    <div>
      <Bar data={data} width={800} height={400} />
    </div>
  );
};

export default Statistics;
