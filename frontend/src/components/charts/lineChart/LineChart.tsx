import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { Line } from 'react-chartjs-2';
import "./LineChart.css";

type LineChartProps = {
  title: string,
  labels: string[],
  data: number[]
}

const LineChart = ({ title, labels, data }: LineChartProps) => {
    useIonViewWillEnter(() => {
        ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
    }, []);
    
    useIonViewWillLeave(() => {
        ChartJS.unregister(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
    }, []);

    const chartData = {
        labels: labels,
        datasets: [{
          label: 'Entrate',
          data: data,
          fill: true,
          backgroundColor: 'rgba(6, 187, 193, 0.51)',
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.3
        }]
    };

    // Opzioni per adattare la scala dei numeri reali
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return(
        <div className="exit-chart">
            <span className="chart-title">{title}</span>
            <Line data={chartData} options={options} height={320} width={320} />
        </div>
    );
}

export default LineChart;