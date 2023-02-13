import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import {useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import { Line } from 'react-chartjs-2';
import "./LineChart.css"

type LineChartPros = {
  title: string,
}

const DoughnutChart = ({title}: LineChartPros) =>{
    useIonViewWillEnter(() => {
        ChartJS.register(CategoryScale);
      }, []);
    
    useIonViewWillLeave(() => {
        ChartJS.unregister(CategoryScale);
    }, []);

    const data = {
        labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno"],
        datasets: [{
          label: 'Bilancio',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(6, 187, 193, 0.51)',
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };
    //Set Data for Bar Chart. In Realtime you may bing this using the data coming from API or service. 
    return(
        <div className="exit-chart">
            <span className="chart-title">{title}</span>
            <Line data={data} 
            height={320}
            width={320}/>
        </div>
    )
}

export default DoughnutChart;  