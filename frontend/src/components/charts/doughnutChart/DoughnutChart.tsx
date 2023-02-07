import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import { Doughnut } from 'react-chartjs-2';
import "./DoughnutChart.css"

type DoughnutChartPros = {
  title: string,
  total: number,
  label: [],
  cash: []
}

const DoughnutChart = ({ title, total, label, cash }: DoughnutChartPros) => {
  useIonViewWillEnter(() => {
    ChartJS.register(CategoryScale);
  }, []);

  useIonViewWillLeave(() => {
    ChartJS.unregister(CategoryScale);
  }, []);

  const data = {
    labels: label,
    datasets: [
      {
        label: "Importo in uscita",
        backgroundColor: ["#53d9a5", "#3e61d5", "#9e53d9", "#1e13d9", "#2e66d9"],
        borderColor: "rgba(255,255,255,0)",
        borderWidth: 2,
        hoverBackgroundColor: "#06bbc181",
        hoverBorderColor: "#06BCC1",
        data: cash,
      },
    ],
  };
  //Set Data for Bar Chart. In Realtime you may bing this using the data coming from API or service. 
  return (
    <div className="exit-chart">
      <span className="chart-title">{title}</span>
      <Doughnut data={data} />
      <span className="chart-total">{total}</span>
    </div>
  )
}

export default DoughnutChart;  