import { useContext, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { SocketContext } from "../context/SocketContext";
Chart.register(...registerables);

export const BandChart = () => {
  const { socket } = useContext(SocketContext);

  let myChart;

  useEffect(() => {
    socket.on("current-bands", (bands) => crearGrafica(bands));
    return () => socket.off("current-bands");
  }, [socket]);

  const crearGrafica = (bands = []) => {
    if (myChart) myChart.destroy();

    const labels = bands.map((band) => band.name);
    const data = {
      labels: labels,
      datasets: [
        {
          axis: "y",
          label: "My First Dataset",
          data: bands.map((band) => band.votes),
          fill: false,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data,
      options: {
        animation: false,
        indexAxis: "y",
      },
    };

    const ctx = document.getElementById("myChart");

    myChart = new Chart(ctx, config);
  };
  return <canvas id="myChart"></canvas>;
};
