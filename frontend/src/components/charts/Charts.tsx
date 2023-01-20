import './Charts.css'
import DoughnutChart from "./doughnutChart/DoughnutChart";
import LineChart from "./lineChart/LineChart";
import { IonSlides, IonSlide } from "@ionic/react"

const Charts: React.FC = () => {
    return (
        <IonSlides pager={true} mode="ios">
            <IonSlide>
                <DoughnutChart title="Uscite" total={3500}/>
            </IonSlide>
            <IonSlide>
                <LineChart title="Entrate"/>
            </IonSlide>
        </IonSlides>
    )
}

export default Charts;